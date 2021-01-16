import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Header from '../../components/header/header.component'
import Feed from '../../components/feed/feed.component'

import { IconButton, Avatar } from '@material-ui/core';
import CameraModel from '../../components/modal/modal.component';
import ImageAvatar from '../../components/avatar/avatar.component'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Post from '../../components/post/post.component';
import AddFriendButton from '../../components/add-friend-button/add-friend-button';

import About from '../../components/about/about.component'
import CreatePost from '../../components/create-post/create-post.component'
import Friends from '../../components/friends/friends.component'

import './userpage.styles.scss';
import { firestore } from '../../firebase/firebase.utils';

const UserPage = ({ match, currentUser }) => {
    const [user, setUser] = useState({})
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
                    </div>
                </div>
            </div>

                
                <div className="userpage__body">
                    <div className="userpage__body--left">
                        <About />
                        <Friends userId={currentUser.id} />
                    </div>
                    <div className="userpage__body--right">
                        <CreatePost />
                        <div className="userpage__feed">
                 {/* {
                        userPosts.map((post, id) => (
                            <Post id={post.id} data={post.data}/>
                        ))
                    } */}
                    <Feed userId={currentUser.id}/>
                </div>
                    </div>
                </div>
 
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})



export default connect(mapStateToProps)(UserPage)
