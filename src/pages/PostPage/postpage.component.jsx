import React, { useEffect, useState, Fragment } from 'react'
import Header from '../../components/header/header.component';
import { firestore } from '../../firebase/firebase.utils';

import Feed from '../../components/feed/feed.component'
import Post from '../../components/post/post.component'

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
                <Post postId={match.params.postId} data={postData}/>
        </Fragment>
    )
}

export default PostPage
