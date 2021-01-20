import React, { useEffect, useState, Fragment } from 'react'
import Header from '../../components/header/header.component';
import { firestore } from '../../firebase/firebase.utils';

import Post from '../../components/post/post.component'

import './postpage.styles.scss'

const PostPage = ({ match }) => {

    const [postData, setPostData] = useState({})
    useEffect(() => {
        firestore.collection('posts').doc(match.params.postId).get().then((snapshot) => {
            setPostData(snapshot.data())
        })
    }, [postData])

    return (
        <Fragment>
            <Header />
            <div className="post-container">
                    <Post postId={match.params.postId} data={postData}/>
            </div>
        </Fragment>
    )
}

export default PostPage
