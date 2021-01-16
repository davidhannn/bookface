import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
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
                setSenderData(doc.data()))
    }, [friendRequestStatus])


    const { firstName, lastName, profileImgUrl } = senderData
    

    const confirmOrDelete = () => {

        const handleClick = (e) => {
            if (e.target.value === "confirm") {
                firestore.collection('friendships').doc(recipient).update({
                    [sender]: true
                })

                firestore.collection('friendships').doc(sender).update({
                    [recipient]: true
                })

                setFriendRequestStatus("approve")
            } else if (e.target.value === "delete") {
                firestore.collection('friendships').doc(recipient).update({
                    [sender]: false
                })

                firestore.collection('friendships').doc(sender).update({
                    [recipient]: false
                })

                setFriendRequestStatus("deny")
            }

        }

        return (
      
            
         <div className="friend-request">
             <Avatar src={profileImgUrl} alt="" />   
            <span><span style={{fontWeight: "bold"}}>{firstName} {lastName}</span> sent you a friend request</span>
            <div className="button-row">
                <button className="confirm-button" onClick={handleClick} value="confirm">Confirm</button>
                <button className="delete-button" value="delete" onClick={handleClick}>Delete</button>
            </div>
        </div>
    

        )
    }

    return (
        <li>
            {type == "like" ? 
            <a href="#" onClick={() => history.push(`/post/${postId}`)}>

                <Avatar src={profileImgUrl} alt="" />      
                        <div className="notification-dropdown-item">
                                <span style={{fontWeight: "bold"}}>{firstName} {lastName} &nbsp;liked your post</span>
                        </div>
                </a> : 
            type == "comment" ?  
            <Link to={`post/${postId}`} style={{ textDecoration: 'none'}}>

                <Avatar src={profileImgUrl} alt="" />      
                        <div className="notification-dropdown-item">
                                <span style={{fontWeight: "bold"}}>{firstName} {lastName} &nbsp;commented your post</span>
                        </div>
            </Link> : 

            (type == "friendship" && status == "pending") ? confirmOrDelete() :
            null }
        </li>
        
        // <Link to={`post/${postId}`} style={{ textDecoration: 'none'}}>
        //     <li>
        //         <Avatar src={profileImgUrl} alt="" />      
        //             <div className="notification-dropdown-item">
        //                     <span style={{fontWeight: "bold"}}>{firstName} {lastName} </span>
        //                         {type == "like" ? <span>&nbsp;liked your post</span> : 
        //                         type == "comment" ? <span>&nbsp;commented on your post</span> : 
        //                         (type == "friendship" && status == "pending") ? confirmOrDelete()
        //                         : null}
        //             </div> 
        //             {/* <div className="notification-dropdown-item-time">{new Date(createdAt?.toDate()).toUTCString()}</div> */}
        //     </li>
        // </Link>
    )
}

export default NotificationDropdownItem
