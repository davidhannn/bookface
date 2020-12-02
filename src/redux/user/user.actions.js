import UserActionTypes from './user.types';

// import { createUserProfileDocument } from '../../firebase/firebase.utils';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})



// export const signUp = ({ userCredentials }) => {
//     const { firstName, lastName, email, password } = userCredentials;
//     const user = auth.createUserWithEmailAndPassword(email, password);
    

    
// }

// export const signInSuccess = () => {

// }