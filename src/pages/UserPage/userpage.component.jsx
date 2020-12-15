import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { checkUserSession } from '../../redux/user/user.actions';
import Header from '../../components/header/header.component'
import Spinner from '../../components/spinner/spinner.component';

import { IconButton, Avatar } from '@material-ui/core';
import CameraModel from '../../components/modal/modal.component';
import ImageAvatar from '../../components/avatar/avatar.component'

import Post from '../../components/post/post.component';

import './userpage.styles.scss';
import { firestore } from '../../firebase/firebase.utils';

const UserPage = ({ match, currentUser, checkUserSession }) => {
    const [loading, setLoading] = useState(true)
    const [userPosts, setUserPosts] = useState([]);

    const {  profileImgUrl, firstName, lastName, id } = currentUser;

    useEffect(() => {
        firestore.collection('posts').where("userId", "==", id).get().then((snapshot) => {
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
                    <h3>{firstName} {lastName}</h3>
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

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession())
  })

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
