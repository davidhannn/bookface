import React, { useEffect } from 'react'


import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { Avatar } from '@material-ui/core';

const Post = ({ id, image, message, profilePic, timestamp, username }) => {

  
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar"/>

                <div className="post__topDetails">
                </div>
            </div>
            
            <div className="post__body">
                <h2>{message}</h2>
            </div>

            <div className="post__image">
                <img src={image} />
            </div>

            <div className="post__buttons">
                <div clasSName="post__button">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div clasSName="post__button">
                    <ChatBubbleIcon />
                    <p>Comment</p>
                </div>
                <div clasSName="post__button">
                    <ShareIcon />
                    <p>Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
