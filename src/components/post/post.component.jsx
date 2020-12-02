import React from 'react'

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { Avatar } from '@material-ui/core';

const Post = () => {
    return (
        <div className="post">
            <div className="post__top">
                <Avatar className="post__avatar"/>

                <div className="post__topDetails">
                </div>
            </div>
            
            <div className="post__body">
    
            </div>

            <div className="post__image">
                <img src="" />
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
