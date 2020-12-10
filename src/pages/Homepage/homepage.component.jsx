import React, {  useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import Header from '../../components/header/header.component';
import CreatePost from '../../components/create-post/create-post.component';
import Post from '../../components/post/post.component';

import { auth, firestore } from '../../firebase/firebase.utils';

import './homepage.styles.scss';
import { createStructuredSelector } from 'reselect';

import { selectAllPosts } from '../../redux/post/post.selectors';

import { fetchPostStart } from '../../redux/post/post.actions';


const HomePage = ({ post, fetchPostStart }) => {


    useEffect(() => {
        // firestore.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        //     setPosts(snapshot.docs.map((doc) => 
        //         ({
        //             id: doc.id,
        //             data: doc.data()
        //         })
        //     ))
        // })
        fetchPostStart()
    }, [])


    return (
        <Fragment>
            <Header />
                <div className="homepage__body">
                    <CreatePost />
                    {
                        post.map((post, id) => (
                            <Post id={post.id} data={post.data} />
                        ))
                    }
                </div>
        </Fragment>
    )
}

const mapStateToProps = createStructuredSelector({
    post: selectAllPosts
})

const mapDispatchToProps = dispatch => ({
    fetchPostStart: () => dispatch(fetchPostStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
