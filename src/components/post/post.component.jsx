import React, { useState, useEffect } from 'react'

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { Avatar } from '@material-ui/core';

import Comment from '../comment/comment.component';

import { firestore } from '../../firebase/firebase.utils'

import './post.styles.scss';

const Post = ({ id, data: { image, message, profilePic, timestamp, firstName, lastName } }) => {

    const [comment, setComment] = useState("");
    const [postCommentList, setPostCommentList ] = useState([]);

    const handleChange = (e) => {
        setComment(e.target.value)
    }
    
  
    const handleSubmit = (e) => {
        e.preventDefault();

        firestore.collection('posts').doc(id).collection('comments').add({
            firstName: firstName,
            lastName: lastName,
            comment: comment,
            image: image,
            id: id
        })

    }

    useEffect(() => {
        firestore.collection('posts').doc(id).collection('comments').onSnapshot((snapshot) => {
            setPostCommentList(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, [postCommentList])
  
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

            {
                postCommentList.map((comment, id) => (
                    <Comment id={id} comment={comment.data}/>
                ))
            }
            <div className="post__comment">
                <Avatar src={profilePic} className="post__commentAvatar"/>
                <form>
                    <input type="text" placeholder="Write a comment..." onChange={handleChange}/>
                    <button type="submit" onClick={handleSubmit}>Hidden Button</button>
                </form>
            </div>
        </div>
    )
}

export default Post
