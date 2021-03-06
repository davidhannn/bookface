import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils'
import notificationIconComponent from '../notification-icon/notification-icon.component';
import { Avatar } from '@material-ui/core';

import './notification-dropdown-item.styles.scss'

const NotificationDropdownItem = ({ NotificationInfo }) => {

    const [senderData, setSenderData] = useState({});
    const [friendRequestStatus, setFriendRequestStatus] = useState("");
    const history = useHistory();

    const { createdAt, postId, read, recipient, sender, type, status } = NotificationInfo;

    useEffect(() => {
            firestore.collection('users').doc(sender).get().then(doc => 
                setSenderData(doc.data())
            )

            firestore.collection('friendships').doc(sender).get().then(doc => {
                const friendshipStatus = doc.data()[recipient];
                if (friendshipStatus == "pending") {
                    setFriendRequestStatus("pending")
                } else if (friendshipStatus == true) {
                    setFriendRequestStatus("approve")
                } else {
                    setFriendRequestStatus("deny")
                }
            })

    }, [])


    const { firstName, lastName, profileImgUrl } = senderData
    

    const handleClick = (e) => {
        
        const notificationRef = firestore.collection('notifications').where('sender', '==', sender).where('recipient', '==', recipient).where('type', '==', type);

        if (e.target.value === "confirm") {
            firestore.collection('friendships').doc(recipient).update({
                [sender]: true
            })

            firestore.collection('friendships').doc(sender).update({
                [recipient]: true
            })

            
            notificationRef.get().then((snapshot) => snapshot.forEach((doc) => {
                doc.ref.delete();
            }))

            setFriendRequestStatus("approve")
        } else if (e.target.value === "delete") {
            firestore.collection('friendships').doc(recipient).update({
                [sender]: false
            })

            firestore.collection('friendships').doc(sender).update({
                [recipient]: false
            })

            notificationRef.get().then((snapshot) => snapshot.forEach((doc) => {
                doc.ref.delete();
            }))

            setFriendRequestStatus("deny")
        }

    }

    return (
        <li className="notification-dropdown-item">
            {type == "like" ? 
            <a href="#" onClick={() => history.push(`/post/${postId}`)}>

                <Avatar src={profileImgUrl} alt="" />      
                        <div className="notification-dropdown-text">
                                <span><span style={{fontWeight: "bold"}}>{firstName} {lastName}</span> liked your post</span>
                        </div>
                </a> : 
            type == "comment" ?  
            <a href="#" onClick={() => history.push(`/post/${postId}`)}>

                <Avatar src={profileImgUrl} alt="" />      
                        <div className="notification-dropdown-text">
                                <span style={{fontWeight: "bold"}}>{firstName} {lastName} commented on your post</span>
                        </div>
            </a> : 

            (type == "friendship" && status == "pending") ? 
            <div className="friend-request">
            <Avatar src={profileImgUrl} alt="" />   
            
            {  friendRequestStatus == "pending" ? 
                    <div className="friend-request-item">
                        <span><span style={{fontWeight: "bold"}}>{firstName} {lastName}</span> sent you a friend request</span>
                        <div className="button-row">
                            <button className="confirm-button" onClick={handleClick} value="confirm">Confirm</button>
                            <button className="delete-button" value="delete" onClick={handleClick}>Delete</button>
                        </div>
                    </div>
                            :
                    friendRequestStatus == "approve" ? <span>Friend Request with<span style={{fontWeight: "bold"}}>{firstName} {lastName}</span> has been confirmed</span> :
                    friendRequestStatus == "deny" ? <span>Friend Request with<span style={{fontWeight: "bold"}}>{firstName} {lastName}</span> has been deleted</span> : 
                    null
            }
                </div>
            :
            null }
        </li>
        
    )
}

export default NotificationDropdownItem
