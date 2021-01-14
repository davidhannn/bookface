import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import Comment from '../comment/comment.component';

import firebase from 'firebase';
import { firestore } from '../../firebase/firebase.utils'

import './post.styles.scss';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors'

const Post = ({ postId, currentUser, data: { userId, image, message, profilePic, timestamp, firstName, lastName, likes } }) => {

    const [comment, setComment] = useState("");
    const [postCommentList, setPostCommentList ] = useState([]);
    const [likeStatus, setLikeStatus] = useState("notLiked");

    const handleLike =  (e) => {

        e.preventDefault();

        const postSnapshot = firestore.collection('postLikes').doc(postId).get();

        if (likeStatus === "notLiked") { 
            firestore.collection('postLikes').doc(postId).set({ [currentUser.id]: true}, {merge: true})
            firestore.collection('posts').doc(postId).update({
                    likes: likes + 1
                })
            setLikeStatus("liked")
        } else {
            firestore.collection('postLikes').doc(postId).set({ [currentUser.id]: false })
            firestore.collection('posts').doc(postId).update({
                likes: likes - 1
            })
            setLikeStatus("notLiked")
        }


        // if (likeStatus === "notLiked") { 
        //     if(postSnapshot == undefined) {
        //         firestore.collection('postLikes').doc(postId).set({ [currentUser.id]: true})
        //         firestore.collection('posts').doc(postId).update({
        //             likes: likes + 1
        //         })
        //     } else {
        //         postSnapshot.then(doc => {
        //             const userLikeStatus = doc.data()[currentUser.id]
        //             if (userLikeStatus == undefined || userLikeStatus === false) {
        //                 firestore.collection('postLikes').doc(postId).update({ [currentUser.id]: true})
        //                 firestore.collection('posts').doc(postId).update({
        //                     likes: likes + 1
        //                 })
        //             } 
        //         })
        //     }
        //     setLikeStatus("liked")
        // } else {
        //     firestore.collection('postLikes').doc(postId).set({ [currentUser.id]: false })
        //     firestore.collection('posts').doc(postId).update({
        //         likes: likes - 1
        //     })

        //     setLikeStatus("notLiked")
        // }

        // const postSnapshot = firestore.collection('postLikes').doc(postId).get();

        //     if(postSnapshot == undefined || !postSnapshot.exists) {
        //         firestore.collection('postLikes').doc(postId).set({ [currentUser.id]: true })
        //         firestore.collection('posts').doc(postId).update({
        //             likes: likes + 1
        //         })
        //         firestore.collection('notifications').add({
        //             read: false,
        //             postId: postId,
        //             sender: currentUser.id,
        //             recipient: userId,
        //             type: "like",
        //             createdAt: firebase.firestore.FieldValue.serverTimestamp()
        //         })
        //     } else {
        //         firestore.collection('postLikes').doc(postId).get().then(doc => {
        //             const userLikeStatus = doc.data()[currentUser.id];
        //             if (userLikeStatus === undefined) {
        //                 firestore.collection('postLikes').doc(postId).update({ [currentUser.id]: true })
        //                 firestore.collection('posts').doc(postId).update({
        //                     likes: likes + 1
        //                 })

        //                 firestore.collection('notifications').add({
        //                     read: false,
        //                     postId: postId,
        //                     sender: currentUser.id,
        //                     recipient: userId,
        //                     type: "like",
        //                     createdAt: firebase.firestore.FieldValue.serverTimestamp()
        //                 })
        //             } else if (userLikeStatus === true) {
        //                 firestore.collection('postLikes').doc(postId).update({ [currentUser.id]: false})
        //                 firestore.collection('posts').doc(postId).update({
        //                     likes: likes - 1
        //                 })
        //             } else if (userLikeStatus === false) {
        //                 firestore.collection('postLikes').doc(postId).update({ [currentUser.id]: true })
        //                 firestore.collection('posts').doc(postId).update({
        //                     likes: likes + 1
        //                 })
        //             }
        //         });
                
        //     }


    }


    const handleChange = (e) => {
        setComment(e.target.value)
    }
    
  
    const handleSubmit = (e) => {
        e.preventDefault();

        firestore.collection('posts').doc(postId).collection('comments').add({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            userId: currentUser.id,
            comment: comment,
            postId: postId
        })

        firestore.collection('notifications').add({
            read: false,
            postId: postId,
            sender: currentUser.id,
            recipient: userId,
            type: "comment",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment("")

    }

    useEffect(() => {
        firestore.collection('posts').doc(postId).collection('comments').onSnapshot((snapshot) => {
            setPostCommentList(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, [postCommentList, likeStatus])
  
    return (
        <div className="post" id={postId}>
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar"/>
                <div className="post__topDetails">
                    <Link to={`/user/${userId}`} >
                    <h3>{`${firstName} ${lastName}`}</h3>
                    </Link>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>
            
            <div className="post__body">
                <p>{message}</p>
            </div>

            <div className="post__image">
                <img src={image} />
            </div>

            <div className="post__like">
                <span>{likes} Likes</span>
            </div>

            <div className="post__buttons">
                <div className="post__button">
                    <IconButton onClick={handleLike}>
                        { likeStatus === "liked" ? <ThumbUpIcon style={{ fill: "blue" }} /> : <ThumbUpIcon/> }
                    </IconButton>
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
                <Avatar src={currentUser.profileImgUrl} className="post__commentAvatar"/>
                <form>
                    <input type="text" placeholder="Write a comment..." onChange={handleChange}/>
                    <button type="submit" onClick={handleSubmit}>Hidden Button</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(Post)
