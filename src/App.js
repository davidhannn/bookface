import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'

import LoginPage from './pages/AuthPages/loginpage.component.jsx';
import RegisterPage from './pages/AuthPages/registerpage.component.jsx';
import HomePage from './pages/HomePage/homepage.component';
import UserPage from './pages/UserPage/userpage.component';
import FriendPage from './pages/FriendPage/friendpage.component';
import SearchPage from './pages/SearchPage/searchpage.component';
import PostPage from './pages/PostPage/postpage.component';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
 
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => currentUser ? (<HomePage />) : (<Redirect to="/login" />) }  />
        <Route path='/login' render={() => currentUser ? (<Redirect to="/" />) : (<LoginPage />)} />
        <Route path='/register' render={() => currentUser ? (<Redirect to="/" />): (<RegisterPage />)} />
          { 
                  currentUser ? <Route exact path='/user/:userId' render={({match}) => {
                        const userId = match.params.userId;
                        return (  currentUser.id === userId ? (<UserPage match={match}/>) : (<FriendPage match={match}/>) )
                          }
                        }/> : <Route path="/login" component={LoginPage} />
          }
        <Route path='/search/:text' component={SearchPage} />
        <Route path='/post/:postId' component={PostPage} />
      </Switch>
    </div>
    )

}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
