import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'

import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import HomePage from './pages/Homepage/homepage.component';
import UserPage from './pages/UserPage/userpage.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser, checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { checkUserSession } = this.props;

    const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //         setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         })
    //       });
        
    //   }
    //   setCurrentUser(userAuth)
    // })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


 render () {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => !this.props.currentUser ? (<Redirect to="/login" />) : (<HomePage />)}  />
        <Route path='/login' render={() => this.props.currentUser ? (<Redirect to="/" />) : (<LoginPage />)} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/user/:userId' component={UserPage} />
      </Switch>
    </div>
  );
 }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
