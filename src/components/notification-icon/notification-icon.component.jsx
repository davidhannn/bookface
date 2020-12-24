import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import NotificationsIcon from '@material-ui/icons/Notifications'
import { IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';

import { fetchNotificationsStart } from '../../redux/user/user.actions'

import { firestore } from '../../firebase/firebase.utils';
import { selectCurrentUser, selectNotifications } from '../../redux/user/user.selectors';

import NotificationDropdown from '../notification-dropdown/notification-dropdown.component'


const NotificationIcon = ({ currentUser, fetchNotificationsStart, notifications }) => {

    // const [notifications, setNotifications] = useState([]);
    // const [numberOfNotifications, setNumberOfNotifications] = useState(0);

    useEffect(() => {
        // firestore.collection('notifications').where('recipient', '==', currentUser.id).onSnapshot((snapshot) => {
        //     setNotifications(snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         data: doc.data()
        //     })))
        // })

        // setNumberOfNotifications(notifications.length);
        // console.log(notifications);
        // fetchNotificationsStart(currentUser.id)
       fetchNotificationsStart();
       console.log(fetchNotificationsStart());
    }, [fetchNotificationsStart])

    return (
        <div>
                 <IconButton>
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                    </Badge>
                    </IconButton >
                    {/* <NotificationDropdown number={numberOfNotifications} id={notifications.id} notifications={notifications}/> */}

                {/* </IconButton> */}

        </div>
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
