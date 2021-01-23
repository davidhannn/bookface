import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import EditProfile from '../edit-profile/edit-profile.component'

import { ReactComponent as BookIcon } from '../../icons/book.svg';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as EducationIcon } from '../../icons/education.svg';

import { firestore } from '../../firebase/firebase.utils'
import './about.styles.scss'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const About = ({ userId, currentUser }) => {

    const [userInfo, setUserInfo] = useState({})

    const { bio, education, location } = userInfo

    useEffect(() => {
        firestore.collection('userDetails').doc(userId).onSnapshot((snapshot) => {
            if(!snapshot.exists) {
                setUserInfo({ bio: "", education: "", location: ""})
            } else {
            setUserInfo(snapshot.data())
            }
        })
        console.log(userInfo)
    }, [])

    

    return (
        <div className="about-container">
            <h6>Intro</h6>
            {/* { bio ? 
                <div className="about-container-row">
                    <span> <BookIcon /> {bio}</span> 
                </div>
                : null } */}
            { education ? 
                <div className="about-container-row">
                    <HomeIcon />
                    <div className="about-container-row-description">
                        Went to <span style={{fontWeight: 'bold'}}>{education} </span>
                    </div>
                </div>
                : null }
            { location ? 
                <div className="about-container-row">
                    <EducationIcon /> 
                    <div className="about-container-row-description">
                        Lives in {location}
                    </div>
                </div> 
                : null }
            { currentUser.id === userId ? <EditProfile userId={userId}/> : null}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(About);
