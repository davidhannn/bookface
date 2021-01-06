import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';

import './add-friend-button.styles.scss';

import { firestore } from '../../firebase/firebase.utils'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';

const AddFriendButton = ({ currentUser, receiverId }) => {


    const handleClick = () => {
        firestore.collection('friendships').doc(currentUser.id).set({
            [receiverId]: false
         })

         firestore.collection('notifications').add({
             sender: currentUser.id,
             recipient: receiverId,
             status: "pending",
             type: "friendship"
         })
    }

    return (
        <button onClick={handleClick} className="add-friend-button">
            <PersonAddIcon />
            <span>Add Friend</span>
        </button>
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(AddFriendButton)

