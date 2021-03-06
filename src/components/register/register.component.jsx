import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signUpStart } from '../../redux/user/user.actions.js';
import TextField from '@material-ui/core/TextField';

import './register.styles.scss';

const Register = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

    const { firstName, lastName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords don't match")
            return;
        }

        signUpStart({ firstName, lastName, email, password});
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setUserCredentials({ ...userCredentials, [name]: value })
    }

    return (
                <div className="register-page">
                    <form className="register-container" onSubmit={handleSubmit}>
                        <h3 style={{ fontWeight: "bold" }}>Sign Up</h3>
                        <TextField name="firstName" type="text" value={firstName} onChange={handleChange} required id="outline-required" label="First Name" variant="outlined" defaultValue="" />
                        <TextField name="lastName" type="text" value={lastName} onChange={handleChange} required id="outline-required" label="Last Name" variant="outlined" defaultValue="" />
                        <TextField name="email" type="email" value={email} onChange={handleChange} required id="outline-required" label="Email" variant="outlined" defaultValue="" />
                        <TextField name="password" type="password" value={password} onChange={handleChange} required id="outline-required" label="Password" variant="outlined" defaultValue="" />
                        <TextField name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} required id="outline-required" label="Confirm Password" variant="outlined" defaultValue="" />
                        <button type="submit" className="register-button">Create Account</button>
                        <p>Already a member? <a href="/login"><span style={{ color: '#2e81f4' }}>Sign In</span></a></p>
                    </form>
                </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(Register);
