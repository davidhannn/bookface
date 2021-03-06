import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
}) 

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
})

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const fetchNotificationsStart = () => ({
    type: UserActionTypes.FETCH_NOTIFICATIONS_START
})

export const fetchNotificationsSuccess = (notifications) => ({
    type: UserActionTypes.FETCH_NOTIFICATIONS_SUCCESS,
    payload: notifications
})

export const fetchNotificationsFailure = (error) => ({
    type: UserActionTypes.FETCH_NOTIFICATIONS_FAILURE,
    payload: error
})

export const editUserDetailStart = (userAndDetail) => ({
    type: UserActionTypes.EDIT_USER_DETAIL_START,
    payload: userAndDetail
})

export const editUserDetailSuccess = (bool) => ({
    type: UserActionTypes.EDIT_USER_DETAIL_SUCCESS,
    payload: bool
})

export const editUserDetailFailure = (error) => ({
    type: UserActionTypes.EDIT_USER_DETAIL_FAILURE,
    payload: error
})