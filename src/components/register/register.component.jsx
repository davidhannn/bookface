import React, { useState } from 'react'
import { connect } from 'react-redux'
// import { signUp } from '../../redux/user/user.actions.js';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './register.styles.scss';

const Register = () => {
    const [userCredentials, setUserCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

    const { firstName, lastName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (password !== confirmPassword ) {
        //     alert('Passwords do not match. Try again')
        //     return;
        // }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { firstName, lastName, email});

            setUserCredentials({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
        
        } catch (error) {
            console.error(error);
        }

        // signUp({ firstName, lastName, email, password});
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setUserCredentials({ ...userCredentials, [name]: value })
    }

    return (
                // <h2>Sign Up </h2>
                <form onSubmit={handleSubmit}>

                    <FormInput name="firstName" type="text" value={firstName} onChange={handleChange} label="First Name" required/>
                    <FormInput name="lastName" type="text" value={lastName} onChange={handleChange} label="Last Name" required/>
                    <FormInput name="email" type="email" value={email} type="email" onChange={handleChange} label="Email" required />
                    <FormInput name="password" type="password" value={password} type="password" onChange={handleChange} label="Password" required />
                    <FormInput name="confirmPassword" type="password" value={confirmPassword} type="password" onChange={handleChange} label="Confirm Password" required/>
                    <CustomButton type="submit">Register</CustomButton>
                </form>
    )
}

// const mapDispatchToProps = dispatch => {
//     signUp: userCredentials => dispatch(signUp(userCredentials))
// }

export default Register;
