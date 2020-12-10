import PostActionTypes from './post.types'

const INITIAL_STATE = {
    posts: [],
    isFetching: false,
    errorMessage: undefined
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PostActionTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload
            }
        case PostActionTypes.FETCH_POST_FAILURE:
                return {
                    ...state,
                    errorMessage: action.payload
                }
        default:
            return state 
    }
}

export default postReducer;