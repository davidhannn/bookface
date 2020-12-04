import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../../components/image-upload/image-upload.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { Avatar } from '@material-ui/core';

const UserPage = ({ match, currentUser }) => {

    const { firstName, lastName, profileImgUrl } = currentUser;
    return (
        <div>
            <div className="userpage__header">
                <Avatar src={profileImgUrl} />
            </div>
            <ImageUpload id={match.params} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(UserPage)
