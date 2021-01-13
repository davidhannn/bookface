import React from 'react'

import EditProfile from '../edit-profile/edit-profile.component'

import './about.styles.scss'

const About = () => {
    return (
        <div className="about-container">
            <h6>Intro</h6>
            <EditProfile />
        </div>
    )
}

export default About;
