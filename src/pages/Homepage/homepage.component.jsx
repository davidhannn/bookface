import React, {  useEffect, useState, Fragment } from 'react'
import Header from '../../components/header/header.component';
import CreatePost from '../../components/create-post/create-post.component';
import Post from '../../components/post/post.component';

import { auth, firestore } from '../../firebase/firebase.utils';

const HomePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firestore.collection('posts').get().then(snapshot => {
            const posts = [];
            snapshot.forEach(doc => {
            const post = {
                id: doc.id,
                ...doc.data()
            }
            posts.push(post)
            });
            setPosts(posts); 
            console.log(posts);
        })
    }, [])

    console.log(posts);

    return (
        <Fragment>
            <Header />
                <div className="homepage__body">
                    <CreatePost />
                    {
                        posts.map((post, id) => (
                            <Post id={post.id} image={post.image} message={post.message} profilePic={post.profilePic} timestamp={post.timestamp} username={post.username} />
                        ))
                    }
                </div>
        </Fragment>
    )
}

export default HomePage
