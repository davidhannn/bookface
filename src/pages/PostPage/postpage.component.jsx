import React, { useEffect, useState, Fragment } from 'react'
import Header from '../../components/header/header.component';
import { firestore } from '../../firebase/firebase.utils';

const PostPage = ({ match }) => {

    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        firestore.collection('posts').doc(match.params.id).get().then(doc => {
            const postData = doc.data();
            console.log(postData)
            setPostInfo(postData);



        })
    }, [])

    console.log(postInfo)
    return (
        <Fragment>
            <Header />
            {/* <div className="post" id={postId}>
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
                <p>{likes} Likes</p>
            </div>

            <div className="post__buttons">
                <div className="post__button">
                    <IconButton onClick={handleLike}>
                        <ThumbUpIcon />
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
                <Avatar src={profilePic} className="post__commentAvatar"/>
                <form>
                    <input type="text" placeholder="Write a comment..." onChange={handleChange}/>
                    <button type="submit" onClick={handleSubmit}>Hidden Button</button>
                </form>
            </div>
        </div> */}
        </Fragment>
    )
}

export default PostPage
