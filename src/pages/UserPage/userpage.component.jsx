import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { IconButton, Avatar } from '@material-ui/core';
import CameraModel from '../../components/modal/modal.component';
import ImageAvatar from '../../components/avatar/avatar.component'

import './userpage.styles.scss';

const UserPage = ({ match, currentUser }) => {

    const {  profileImgUrl } = currentUser;
    return (
        <div>
            <div className="userpage__header">

                        <ImageAvatar imgUrl={profileImgUrl} />

            </div>
            {/* <ImageUpload id={match.params} /> */}
            <CameraModel />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(UserPage)
