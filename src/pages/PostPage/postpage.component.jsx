import React, { useEffect, useState, Fragment } from 'react'
import Header from '../../components/header/header.component';
import { firestore } from '../../firebase/firebase.utils';

import Post from '../../components/post/post.component'

const PostPage = ({ match }) => {

    useEffect(() => {
        // firestore.collection('posts').doc(match.params.id).get().then(doc => {
        //     const postData = doc.data();
        //     console.log(postData)
        //     setPostInfo(postData);
        // })
    }, [])

    return (
        <Fragment>
            <Header />
        </Fragment>
    )
}

export default PostPage
