import React, {  useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import Post from '../../components/post/post.component';

import { auth, firestore } from '../../firebase/firebase.utils';

import './feed.styles.scss';
import { createStructuredSelector } from 'reselect';

import { selectAllPosts, selectAllPostsFetching } from '../../redux/post/post.selectors';

import { fetchPostStart } from '../../redux/post/post.actions';


const Feed = ({ post, fetchPostStart }) => {

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
        // fetchPostStart()
    }, [])


    return (
                <div className="feed">
                    {
                        posts.map((post, id) => (
                            <Post id={post.id} data={post.data} />
                        ))
                    }
                </div>
    )
}

const mapStateToProps = createStructuredSelector({
    post: selectAllPosts, selectAllPostsFetching
})

const mapDispatchToProps = dispatch => ({
    fetchPostStart: () => dispatch(fetchPostStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
