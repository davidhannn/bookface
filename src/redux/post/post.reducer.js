import PostActionTypes from './post.types'

const INITIAL_STATE = {
    posts: [],
    isFetching: false,
    errorMessage: undefined
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PostActionTypes.FETCH_POST_START:
            return {
                ...state,
                isFetching: true
            }
        case PostActionTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isFetching: false,
            }
        case PostActionTypes.FETCH_POST_FAILURE:
        case PostActionTypes.CREATE_POST_FAILURE:
                return {
                    ...state,
                    errorMessage: action.payload,
                    isFetching: false
                }
        case PostActionTypes.CREATE_POST_SUCCESS:
                return {
                    ...state,
                    isFetching: true
                    // posts: [...state.posts, action.payload]
                }
        default:
            return state 
    }
}

export default postReducer;