import React, { useState, useEffect } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';

import './add-friend-button.styles.scss';

import { firestore } from '../../firebase/firebase.utils'
import firebase from 'firebase';

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';

const AddFriendButton = ({ currentUser, receiverId }) => {


    const [requestStatus, setRequestStatus] = useState(false);

    useEffect(() => {
    }, [requestStatus])

    const handleClick = () => {
        firestore.collection('friendships').doc(currentUser.id).set({
            [receiverId]: "pending"
         }, { merge: true})

         firestore.collection('notifications').add({
             sender: currentUser.id,
             recipient: receiverId,
             status: "pending",
             type: "friendship",
             createdAt: firebase.firestore.FieldValue.serverTimestamp()
         })

         setRequestStatus(true);
    }

    return (
        <button onClick={handleClick} className="add-friend-button">
            <PersonAddIcon />
            { requestStatus === false ? <span>Add Friend</span> : <span>Request Sent</span>}
        </button>
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(AddFriendButton)

