import PostActionTypes from './post.types';

export const fetchPostStart = () => ({
    type: PostActionTypes.FETCH_POST_START
})

export const fetchPostSuccess = (posts) => ({
    type: PostActionTypes.FETCH_POST_SUCCESS,
    payload: posts
})

export const fetchPostFailure = (error) => ({
    type: PostActionTypes.FETCH_POST_FAILURE,
    payload: error
})

export const createPostStart = (userAndPost) => ({
    type: PostActionTypes.CREATE_POST_START,
    payload: userAndPost
})

export const createPostSuccess = (bool) => ({
    type: PostActionTypes.CREATE_POST_SUCCESS,
    payload: bool
})

export const createPostFailure = (error) => ({
    type: PostActionTypes.CREATE_POST_FAILURE,
    payload: error
})