import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../../firebase/firebase.utils'
import notificationIconComponent from '../notification-icon/notification-icon.component';
import { Avatar } from '@material-ui/core';

import './notification-dropdown-item.styles.scss'

const NotificationDropdownItem = ({ NotificationInfo }) => {

    const [senderData, setSenderData] = useState({});

    const { createdAt, postId, read, recipient, sender, type, status } = NotificationInfo;

    useEffect(() => {
            firestore.collection('users').doc(sender).get().then(doc => 
                setSenderData(doc.data()))
    }, [])


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
            } else if (e.target.value === "delete") {
                firestore.collection('friendships').doc(recipient).update({
                    [sender]: false
                })

                firestore.collection('friendships').doc(sender).update({
                    [recipient]: false
                })
            }

        }

        return (
            <div className="friend-request">
                <span>sent you a friend request</span>
                <div className="button-row">
                    <button className="confirm-button" onClick={handleClick} value="confirm">Confirm</button>
                    <button className="delete-button" value="delete">Delete</button>
                </div>
            </div>
        )
    }

    return (
        <Link to={`post/${postId}`} style={{ textDecoration: 'none'}}>
        <li>
            <Avatar src={profileImgUrl} alt="" />      
                <div className="notification-dropdown-item">
                        <span style={{fontWeight: "bold"}}>{firstName} {lastName} </span>
                            {type == "like" ? " liked your post" : 
                            type == "comment" ? " comment on your post" : 
                            (type == "friendship" && status == "pending") ? confirmOrDelete()
                            : null}
                </div> 
        </li>
        </Link>
    )
}

export default NotificationDropdownItem
