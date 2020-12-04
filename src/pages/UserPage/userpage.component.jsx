import React from 'react'
import ImageUpload from '../../components/image-upload/image-upload.component';

const UserPage = ({ match }) => {
    console.log(match.params);
    return (
        <div>
            <ImageUpload id={match.params} />
        </div>
    )
}

export default UserPage
