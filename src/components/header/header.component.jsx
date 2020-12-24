import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.component.styles.scss';
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AddIcon from '@material-ui/icons/Add';
import { Avatar, IconButton } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications'

import Search from '../search/search.component';
import NotificationIcon from '../notification-icon/notification-icon.component';

import DropdownButton from '../dropdown-button/dropdown-button.component';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser }) => (


        <div className="header">

            <div className="header__left">
                <Link to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1920px-Facebook_f_logo_%282019%29.svg.png" />
                </Link>
                {/* <div className="header__input"> */}
                    <Search />
                {/* </div> */}
            </div>

            <div className="header__middle">
                <div className="header__icon header__icon--active">
                    <HomeIcon fontSize="large"/>
                </div>
                <div className="header__icon">
                    <VideoLabelIcon fontSize="large"/>
                </div>
                <div className="header__icon">
                    <StorefrontIcon fontSize="large"/>
                </div>
                <div className="header__icon">
                    <SupervisedUserCircleIcon fontSize="large"/>
                </div>
                <div className="header__icon">
                    <SportsEsportsIcon fontSize="large"/>
                </div>
            </div>

            <div className="header__right">
                <Link to={`/user/${currentUser.id}`} >
                <div className="header__user_info">
                    <Avatar src={currentUser.profileImgUrl} />
                    <h4>{currentUser.firstName} {currentUser.lastName}</h4>
                </div>
                </Link>

                <IconButton>
                    <AddIcon />
                </IconButton>

                <IconButton>
                    <MessageIcon />
                </IconButton>
                
                <NotificationIcon userId={currentUser.id} />

                {/* {
                    currentUser ? ( <IconButton>
                        <ExpandMoreIcon onClick={() => auth.signOut()} />
                    </IconButton>) : ( <Redirect to="/login" />)
                } */}

                {/* <IconButton> */}
                    <DropdownButton currentUser={currentUser} />
                {/* </IconButton> */}
            </div>
        </div>
 
)


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(Header);
