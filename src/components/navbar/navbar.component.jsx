import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';


import './navbar.styles.scss';
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import { ReactComponent as Logout } from '../../icons/logout.svg';
import { ReactComponent as User } from '../../icons/user.svg';

import { signOutStart } from '../../redux/user/user.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { CSSTransition } from 'react-transition-group';


const NavItem = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </div>
    )
}


const DropDownMenu = ({ currentUser, signOutStart }) => {
    const history = useHistory();

    const [activeMenu, setActiveMenu] = useState('main')

    const [open, setOpen] = useState(false);

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        await signOutStart();
        history.push("/login")
    }

    function DropdownItem(props) {
        return (
            <ClickAwayListener onClickAway={handleClickAway}>
            <a href="#" className="menu-item" onClick={props.action}>
                    <span className="icon-button">{props.leftIcon}</span>
 
                    {props.children} 

                    <span className="icon-right">{props.rightIcon}</span>
            </a>
            </ClickAwayListener>
        )
    }

    return (
        <div className="dropdown">
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} className="menu-primary">

                <div className="menu">
                    <DropdownItem leftIcon={<User />} action={() => history.push(`/user/${currentUser.id}`)}> 
                            My Profile
                    </DropdownItem>
                    <DropdownItem leftIcon={<Logout />} action={handleLogout}>Sign Out</DropdownItem>
                </div>

            </CSSTransition>
        </div>
    )
}

const Navbar = ({ currentUser, signOutStart }) => {

    return (
        
            <NavItem icon={<CaretIcon />}>
                <DropDownMenu currentUser={currentUser} signOutStart={signOutStart} />
            </NavItem >
        
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  })
  


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
