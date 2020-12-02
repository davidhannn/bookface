import React, { Fragment } from 'react'
import Header from '../../components/header/header.component';
import CreatePost from '../../components/create-post/create-post.component';
import Post from '../../components/post/post.component';

const HomePage = () => {
    return (
        <Fragment>
            <Header />
                <div className="homepage__body">
                    <CreatePost />
                    <Post />
                </div>
        </Fragment>
    )
}

export default HomePage
