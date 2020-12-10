import { takeLatest, put, all, call } from 'redux-saga/effects';

import { firestore, storage, auth, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchPostSuccess, fetchPostFailure } from './post.actions';

import { snapShotToArray } from '../../utils/helperFunctions';

import PostActionTypes from './post.types';

export function* onFetchPost() { 

    try {
        const postRef = yield firestore.collection('posts');
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

export function* onFetchPostCollectionStart() {
    yield takeLatest(PostActionTypes.FETCH_POST_START, onFetchPost)
}


export function* postSagas() {
    yield all([call(onFetchPostCollectionStart)])
}