const INITIAL_STATE = {
    posts: []
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state 
    }
}

export default postReducer;