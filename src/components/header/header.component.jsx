import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.component.styles.scss';
import { createStructuredSelector } from 'reselect'

import HomeIcon from '@material-ui/icons/Home';
import { Avatar } from '@material-ui/core';

import { ReactComponent as FacebookIcon } from '../../icons/facebook.svg';

import Search from '../search/search.component';
import NotificationIcon from '../notification-icon/notification-icon.component';
import Navbar from '../navbar/navbar.component.jsx'

import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser }) => (


        <div className="header">

            <div className="header__left">
                <Link to="/">
                    {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1920px-Facebook_f_logo_%282019%29.svg.png" /> */}
                    <FacebookIcon />
                </Link>
                    <Search />
            </div>

            <div className="header__middle">
                <div className="header__icon header__icon--active">
                    <HomeIcon fontSize="large"/>
                </div>
            </div>

            <div className="header__right">
                <Link to={`/user/${currentUser.id}`} style={{textDecoration: 'none'}} >
                <div className="header__user_info">
                    <Avatar src={currentUser.profileImgUrl} />
                    <span className="header__userName">{currentUser.firstName}</span>
                </div>
                </Link>

                <NotificationIcon userId={currentUser.id} />
                <Navbar />
            </div>
        </div>
 
)


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(Header);
