import React, { useState } from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import {  emailSignInStart } from '../../redux/user/user.actions';

import './loginpage.styles.scss';

const LoginPage = ({ emailSignInStart }) => {
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })

    const { email, password } = loginCredentials;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginCredentials({ ...loginCredentials, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        emailSignInStart(email, password)
    }

    return (
        <div className="login-page">
        <form onSubmit={handleSubmit} className="login-container">
            <h3>Sign In To BookFace</h3>
            <TextField name="email" type="email" value={email} label="Email" onChange={handleChange} required id="outline-required" variant="outlined" defaultValue="" />
            <TextField name="password" type="password" value={password} label="Password" onChange={handleChange} required id="outline-required" variant="outlined" defaultValue="" />
                <button type="submit" className="sign-in-button">Sign In</button>
                <p>Not a member? <a href="/register"><span style={{ color: '#2e81f4' }}>Sign Up Now</span></a></p>
        </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(LoginPage);
