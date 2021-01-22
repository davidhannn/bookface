import React, { Fragment } from 'react'
import Header from '../../components/header/header.component';

import CreatePost from '../../components/create-post/create-post.component';
import Feed from '../../components/feed/feed.component'

import './homepage.styles.scss';


const HomePage = () => {

    return (
        <Fragment>
            <Header />
                <div className="homepage__body">
                    <CreatePost />
                    <Feed />
                </div>
        </Fragment>
    )
}

export default HomePage;
