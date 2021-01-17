import React, { useState } from 'react'
import { connect } from 'react-redux'
import { auth } from '../../firebase/firebase.utils';

import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const LoginPage = ({ googleSignInStart, emailSignInStart }) => {
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
        <div className="login-container">
            <h3>Sign In To BookFace</h3>
            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" value={email} label="email" onChange={handleChange} required/>
                <FormInput name="password" type="password" value={password} label="password" onChange={handleChange} required/>
                <CustomButton type="submit">Sign In</CustomButton>
                <p>Not a member? <a href="/register">Sign Up Now</a></p>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(LoginPage);
