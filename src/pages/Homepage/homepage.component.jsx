import React, {  useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';
import Header from '../../components/header/header.component';
// import Navbar from '../../components/navbar/navbar.component'
import CreatePost from '../../components/create-post/create-post.component';
import Feed from '../../components/feed/feed.component'

import { auth, firestore } from '../../firebase/firebase.utils';

import './homepage.styles.scss';


const HomePage = () => {

    return (
        <Fragment>
            <Header />
            {/* <Navbar /> */}
                <div className="homepage__body">
                    <CreatePost />
                    <Feed />
                </div>
        </Fragment>
    )
}

export default HomePage;
