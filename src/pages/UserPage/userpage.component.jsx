import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Header from '../../components/header/header.component'
import Spinner from '../../components/spinner/spinner.component';

import { IconButton, Avatar } from '@material-ui/core';
import CameraModel from '../../components/modal/modal.component';
import ImageAvatar from '../../components/avatar/avatar.component'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Post from '../../components/post/post.component';
import CustomFacebookButton from '../../components/custom-facebook-button/custom-facebook-button'
import AddFriendButton from '../../components/add-friend-button/add-friend-button';

import './userpage.styles.scss';
import { firestore } from '../../firebase/firebase.utils';

const UserPage = ({ match, currentUser }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [userPosts, setUserPosts] = useState([]);
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

        firestore.collection('posts').where("userId", "==", match.params.userId).onSnapshot((snapshot) => {
            setUserPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }) 
            )
        )
    }) }, [])

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
                            {/* <CustomFacebookButton onClick={(e) => handleClick(e)} buttonStyle={activeButton ? "active" : null}>Timeline</CustomFacebookButton>
                            <CustomFacebookButton onClick={(e) => handleClick(e)} buttonStyle={activeButton ? "active" : null}>About</CustomFacebookButton>
                            <CustomFacebookButton onClick={(e) => handleClick(e)} buttonStyle={activeButton ? "active" : null}>Friends</CustomFacebookButton>
                            <CustomFacebookButton onClick={(e) => handleClick(e)} buttonStyle={activeButton ? "active" : null}>Photos</CustomFacebookButton> */}
                            {activeButton.objects.map((el, idx) => (
                                <button key={idx} className={toggleActiveStyles(idx)} onClick={() => toggleActive(idx) } >{el.id}</button>
                        ))}
                        </div>

                        <div className="userpage__headerBottomButtonsRight">
                            <AddFriendButton receiverId={match.params.userId} />
                            <button>Message</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="userpage__feed">
                 {
                        userPosts.map((post, id) => (
                            <Post id={post.id} data={post.data} />
                        ))
                    }
            </div>
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})



export default connect(mapStateToProps)(UserPage)
