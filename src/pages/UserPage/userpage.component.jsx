import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Header from '../../components/header/header.component'

import { IconButton, Avatar } from '@material-ui/core';
import CameraModel from '../../components/modal/modal.component';
import ImageAvatar from '../../components/avatar/avatar.component'

import './userpage.styles.scss';

const UserPage = ({ match, currentUser }) => {

    const {  profileImgUrl, firstName, lastName } = currentUser;
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
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(UserPage)
