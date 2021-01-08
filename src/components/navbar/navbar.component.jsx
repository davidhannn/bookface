import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Link } from 'react-router-dom'
import Avatar from '../avatar/avatar.component'
import './navbar.styles.scss';
import { ReactComponent as BellIcon } from '../../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ReactComponent as CogIcon } from '../../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../icons/bolt.svg';

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

// const NavbarWrapper = (props) => {
//     return (
//         <nav className="navbar">
//             <ul className="navbar-nav">
//                 { props.children }
//             </ul> 
//         </nav>
//     )
// }

const DropDownMenu = () => {

    const [activeMenu, setActiveMenu] = useState('main')

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children} 

                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className="dropdown">
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} className="menu-primary">

                <div className="menu">
                    <DropdownItem> 
                            My Profile
                    </DropdownItem>
                    {/* <DropdownItem
                            leftIcon={<CogIcon />}
                            rightIcon={<ChevronIcon />}
                        >
                    </DropdownItem> */}
                    <DropdownItem>Sign Out</DropdownItem>
                </div>

            </CSSTransition>
        </div>
    )
}

const Navbar = (props) => {
    return (
        // <NavbarWrapper>
        //     <NavItem icon={<PlusIcon />} />
        //     <NavItem icon={<BellIcon />} />
        //     <NavItem icon={<MessengerIcon />} />

            <NavItem icon={<CaretIcon />}>
                <DropDownMenu />
            </NavItem >

        // </NavbarWrapper> 
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(Navbar)
