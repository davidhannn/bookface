import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as BellIcon } from '../../icons/bell.svg';

import NotificationsIcon from '@material-ui/icons/Notifications'
import { IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';

import { fetchNotificationsStart } from '../../redux/user/user.actions'

import { firestore } from '../../firebase/firebase.utils';
import { selectCurrentUser, selectNotifications } from '../../redux/user/user.selectors';

import './notification-icon.styles.scss'

import NotificationDropdownItem from '../notification-dropdown-item/notification-dropdown-item.component'


const NotificationIcon = ({ currentUser, fetchNotificationsStart, notifications }) => {

    useEffect(() => {
        fetchNotificationsStart();
     }, [fetchNotificationsStart])
 

     console.log(notifications)

    const Notification = (props) => {

        const [open, setOpen] = useState(false);
        return (
                <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                    <BellIcon />
        
                    {open && props.children}
        
                </a>
   
        )
    }

    const NotificationDropdown = () => {
        const [read, setRead] = useState(false);

        return (
            <div className='notification-dropdown'>
                <div className="notification-title">Notifications</div>
                <ul>
                    {notifications && notifications.map((singleNotification, id) => {
                        // const { recipient, postId } = singleNotification.data
                        return (
                            <NotificationDropdownItem id={singleNotification.id} NotificationInfo={singleNotification.data} />
                        )
                         })}
                </ul>
            </div>
        )
    }
    
    return (
        <Notification>
            <NotificationDropdown/>
        </Notification>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    notifications: selectNotifications
})

const mapDispatchToProps = dispatch => ({
    fetchNotificationsStart: () => dispatch(fetchNotificationsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon)
