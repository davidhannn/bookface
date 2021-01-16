import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Header from '../../components/header/header.component'
import Spinner from '../../components/spinner/spinner.component';

import Feed from '../../components/feed/feed.component'
import { IconButton, Avatar } from '@material-ui/core';
import CameraModel from '../../components/modal/modal.component';
import ImageAvatar from '../../components/avatar/avatar.component'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Post from '../../components/post/post.component';
import CustomFacebookButton from '../../components/custom-facebook-button/custom-facebook-button'
import AddFriendButton from '../../components/add-friend-button/add-friend-button';
import { ReactComponent as MessengerIcon } from '../../icons/messenger.svg'
import { ReactComponent as FriendIcon } from '../../icons/friends.svg'

import './friendpage.styles.scss';
import { firestore } from '../../firebase/firebase.utils';

const FriendPage = ({ match, currentUser }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [friendshipStatus, setFriendshipStatus] = useState("");
    const [activeButton, setActiveButton] = useState({
        activeObject: null,
        objects: [{ id : "Posts" }, { id: "About" }, { id: "Friends" }, { id: "Photos" }]
    })

    const {  profileImgUrl, firstName, lastName } = user;
    const toggleActive = (idx) => {
        setActiveButton({ ...activeButton, activeObject: activeButton.objects[idx]})
    }

    const toggleActiveStyles = (idx) => {
        if(activeButton.objects[idx] === activeButton.activeObject) {
            return "box active"
          }  else {
            return "box inactive"
        }
        }
    


    useEffect(() => {
        firestore.collection('users').doc(match.params.userId).get().then(doc => {
            setUser(doc.data());
        })

        firestore.collection('friendships').doc(currentUser.id).get().then(doc => {
            const friendshipStatus = doc.data();

            // Creating a document with the Current User ID set to null if currentUser has no friends in firestore and therefore no document
            if (friendshipStatus === undefined) {
                firestore.collection('friendships').doc(currentUser.id).set({
                    nullField: null
                })
            }
           

            if (friendshipStatus[match.params.userId] === undefined) {
                setFriendshipStatus("sendFriendRequest")
            } else if (friendshipStatus[match.params.userId] === true) {
                setFriendshipStatus("friends")
            } else {
                setFriendshipStatus("friendRequestSent")
            }
        })

    }, [])

    return (
        <Fragment>
            <Header />
            <div className="userpage__header">
                <div className="userpage__headerProfile">
                        <ImageAvatar imgUrl={profileImgUrl} />
                    <div className="userpage__headerProfileCameraIcon">
                        <CameraModel />
                    </div>  
                </div>
                <div className="userpage__headerName">
                    <h2>{firstName} {lastName}</h2>
                </div>

                <div className="userpage__headerBottom">
                    <div className="userpage__headerBottomButtons">
                        <div className="userpage__headerBottomButtonsLeft">
                            {activeButton.objects.map((el, idx) => (
                                <button key={idx} className={toggleActiveStyles(idx)} onClick={() => toggleActive(idx) } >{el.id}</button>
                        ))}
                        </div>

                        <div className="userpage__headerBottomButtonsRight">
                            { friendshipStatus === "sendFriendRequest" ? <AddFriendButton receiverId={match.params.userId} /> :
                              friendshipStatus === "friends" ? <FriendIcon /> : 
                              friendshipStatus === "friendRequestSent" ? <span className="request">Request Sent</span> : 
                              null}
                            {/* <AddFriendButton receiverId={match.params.userId} /> */}
                            <MessengerIcon />
                        </div>
                    </div>
                </div>
            </div>


            <div className="userpage__feed">
                    <Feed userId={match.params.userId}/>
            </div>
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})



export default connect(mapStateToProps)(FriendPage)
