import { takeLatest, put, all, call } from 'redux-saga/effects';

import { firestore, storage, auth, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import firebase from 'firebase'

import { fetchPostSuccess, fetchPostFailure, createPostSuccess, createPostFailure } from './post.actions';

import { snapShotToArray } from '../../utils/helperFunctions';

import PostActionTypes from './post.types';

export function* fetchPost() { 

    try {
        const postRef = yield firestore.collection('posts').orderBy("timestamp", "desc");
        const snapshot = yield postRef.get();
        console.log(snapshot);
        const posts = yield call(convertCollectionsSnapshotToMap, snapshot);
        console.log(posts);
        yield put(fetchPostSuccess(posts))
    } catch(error) {
        yield put(fetchPostFailure(error))
    }
    // firestore.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    //     setPosts(snapshot.docs.map((doc) => 
    //         ({
    //             id: doc.id,
    //             data: doc.data()
    //         })
    //     ))
    // })
}

export function* createPost({ payload: { currentUser, fullPost } }) {
    try {
        const createPostRef = yield firestore.collection('posts').add({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            userId: currentUser.id,
            message: fullPost.post,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            image: fullPost.imageUrl,
            likes: 0,
        })

        yield put(createPostSuccess(true));
    } catch(error) {
        yield put(createPostFailure(error))
    }
}

export function* onFetchPostCollectionStart() {
    yield takeLatest(PostActionTypes.FETCH_POST_START, fetchPost)
}

export function* onCreatePostStart() {
    yield takeLatest(PostActionTypes.CREATE_POST_START, createPost)
}

export function* postSagas() {
    yield all([call(onFetchPostCollectionStart), call(onCreatePostStart)])
}