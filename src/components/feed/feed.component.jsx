import React, {  useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Post from '../../components/post/post.component';

import { firestore } from '../../firebase/firebase.utils';

import './feed.styles.scss';
import { createStructuredSelector } from 'reselect';

import { selectAllPosts, selectAllPostsFetching } from '../../redux/post/post.selectors';

import { fetchPostStart } from '../../redux/post/post.actions';


const Feed = ({ post, userId, fetchPostStart }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Conditional to determine whether to post Home Page Feed or the User/Friends Post Feed
        if(!userId) {
            firestore.collection('posts').orderBy("timestamp", "desc").limit(15).onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map((doc) => 
                    ({
                        id: doc.id,
                        data: doc.data()
                    })
                ))
            })
        } else {
            firestore.collection('posts').where("userId", "==", userId).onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map((doc) => 
                    ({
                        id: doc.id,
                        data: doc.data()
                    })
                ))
            })
        }
    }, [])


    return (
                <div className="feed">
                    {
                        posts.map((post, id) => (
                            <Post key={post.id} data={post.data} postId={post.id}/>
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
