import React, { useEffect } from 'react'

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { Avatar } from '@material-ui/core';

import './post.styles.scss';

const Post = ({ id, image, message, profilePic, timestamp, username }) => {

  
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar"/>
                <div className="post__topDetails">
                    {/* <h3>{username}</h3>
                    <p>{timestamp}</p> */}
                </div>
            </div>
            
            <div className="post__body">
                <h2>{message}</h2>
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
