import React from 'react'

import { Avatar } from '@material-ui/core';

import './comment.styles.scss';

const Comment = ({ id, comment : { firstName, lastName, image, comment }}) => {
    return (
        <div className="comment">
            <Avatar src={image}/>
            <div className="comment__info">
                <h6>{firstName} {lastName}</h6>
                <p>{comment}</p>
            </div>
        </div>
    )
}

export default Comment
