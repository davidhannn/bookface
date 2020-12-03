import React, {  useEffect, useState, Fragment } from 'react'
import Header from '../../components/header/header.component';
import CreatePost from '../../components/create-post/create-post.component';
import Post from '../../components/post/post.component';

import { auth, firestore } from '../../firebase/firebase.utils';

import './homepage.styles.scss';

const HomePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firestore.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => 
                ({
                    id: doc.id,
                    data: doc.data()
                })
            ))
        })
    }, [posts])


    return (
        <Fragment>
            <Header />
                <div className="homepage__body">
                    <CreatePost />
                    {
                        posts.map((post, id) => (
                            <Post id={post.id} data={post.data} />
                        ))
                    }
                </div>
        </Fragment>
    )
}

export default HomePage
