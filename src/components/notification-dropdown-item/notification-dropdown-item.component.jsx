import React, { useState, useEffect } from 'react'

import { firestore } from '../../firebase/firebase.utils'
import notificationIconComponent from '../notification-icon/notification-icon.component';
import { Avatar } from '@material-ui/core';

import './notification-dropdown-item.styles.scss'

const NotificationDropdownItem = ({ NotificationInfo }) => {

    const [senderData, setSenderData] = useState({});

    const { createdAt, postId, read, recipient, sender, type } = NotificationInfo;

    useEffect(() => {
            firestore.collection('users').doc(sender).get().then(doc => 
                setSenderData(doc.data()))
    }, [])


    const { firstName, lastName, profileImgUrl } = senderData

    console.log(type)

    return (
        <li>
            <Avatar src={profileImgUrl} alt=""/>      
                <div className="notification-dropdown-item">
                    <span style={{fontWeight: "bold"}}>{firstName} {lastName}</span> 
                    {type == "like" ? <p>liked your post</p> : null}
                </div> 
        </li>

    )
}

export default NotificationDropdownItem
