import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';

import './add-friend-button.styles.scss';

import { firestore } from '../../firebase/firebase.utils'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';

const AddFriendButton = ({ currentUser, receiverId }) => {


    const handleClick = () => {
        firestore.collection('friendships').add({
            id: currentUser.id
         })

         firestore.collection('notifications').add({
             senderId: currentUser.id,
             recipientId: receiverId,
             status: "pending"
         })
    }

    return (
        <button onClick={handleClick} className="add-friend-button">
            <PersonAddIcon />
            <p>Add Friend</p>
        </button>
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(AddFriendButton)

