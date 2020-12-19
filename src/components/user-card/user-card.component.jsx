import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';

import './user-card.styles.scss';

const UserCard = ({ id, data: { firstName, lastName, profileImgUrl } }) => {
    return (
        <div className="user-card">
            <Link to={`/user/${id}`}>
                <div className="user-card-avatar">
                    <Avatar src={profileImgUrl} />
                </div>
             </Link>
             <Link to={`/user/${id}`} style={{ textDecoration: "none" }}>
                <h6>{firstName} {lastName}</h6>
            </Link>
        </div>
    )
}

export default UserCard