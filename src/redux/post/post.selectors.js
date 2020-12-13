import { createSelector } from 'reselect'

const selectPost = state => state.post;

export const selectAllPosts = createSelector(
    [selectPost],
    post => post.posts
)

export const selectAllPostsFetching = createSelector(
    [selectPost],
    post => post.isFetching
)