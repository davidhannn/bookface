import React, { useEffect } from 'react'

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { Avatar } from '@material-ui/core';

import './post.styles.scss';

const Post = ({ data: { id, image, message, profilePic, timestamp, firstName, lastName } }) => {

  
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar"/>
                <div className="post__topDetails">
                    <h3>{`${firstName} ${lastName}`}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>
            
            <div className="post__body">
                <p>{message}</p>
            </div>

            <div className="post__image">
                <img src={image} />
            </div>

            <div className="post__buttons">
                <div className="post__button">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div className="post__button">
                    <ChatBubbleIcon />
                    <p>Comment</p>
                </div>
                <div className="post__button">
                    <ShareIcon />
                    <p>Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
