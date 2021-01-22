import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    notifications: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.EDIT_USER_DETAIL_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.FETCH_NOTIFICATIONS_FAILURE:
        case UserActionTypes.EDIT_USER_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case UserActionTypes.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.payload
            }
        default: 
            return state
    }
}

export default userReducer;