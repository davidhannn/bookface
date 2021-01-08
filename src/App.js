import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'

import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import HomePage from './pages/HomePage/homepage.component';
import UserPage from './pages/UserPage/userpage.component';
import FriendPage from './pages/FriendPage/friendpage.component';
import SearchPage from './pages/SearchPage/searchpage.component';
import PostPage from './pages/PostPage/postpage.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser, checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { CheckCircleOutline } from '@material-ui/icons';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [])
 
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => currentUser ? (<HomePage />) : (<Redirect to="/login" />) }  />
        <Route path='/login' render={() => currentUser ? (<Redirect to="/" />) : (<LoginPage />)} />
        <Route path='/register' component={RegisterPage} />
        {/* <Route exact path='/user/:userId' render={({match}) => currentUser.id === match ? (<UserPage match={match}/>) : (<FriendPage match={match}/>)}/> */}
        <Route path='/user/:userId' component={FriendPage} />
        <Route path='/search/:text' component={SearchPage} />
        <Route path='/post/:postId' component={PostPage} />
      </Switch>
    </div>
  );
 

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
