import React, { useState, useEffect } from 'react'

import EditProfile from '../edit-profile/edit-profile.component'

import { ReactComponent as BookIcon } from '../../icons/book.svg';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as EducationIcon } from '../../icons/education.svg';

import { firestore } from '../../firebase/firebase.utils'
import './about.styles.scss'

const About = ({ userId }) => {

    const [userInfo, setUserInfo] = useState({})

    const { bio, education, location } = userInfo
    
    useEffect(() => {
        firestore.collection('userDetails').doc(userId).onSnapshot((snapshot) => {
            setUserInfo(snapshot.data())
        })
    }, [])

    console.log(userInfo)

    return (
        <div className="about-container">
            <h5>Intro</h5>
            { bio ? <span> <BookIcon /> {bio}</span> : null }
            { education ? <span> <EducationIcon /> Went to {education} </span> : null }
            { location ? <span> <HomeIcon /> Lives in {location} </span> : null }
            <EditProfile userId={userId}/>
        </div>
    )
}

export default About;
