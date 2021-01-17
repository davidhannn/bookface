import { takeLatest, put, all, call, select  } from 'redux-saga/effects';

import * as selectors from './user.selectors';

import UserActionTypes from './user.types';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, fetchNotificationsSuccess, fetchNotificationsFailure, editUserDetailSuccess, editUserDetailFailure } from './user.actions'

import { auth, firestore, googleProvider, createUserProfileDocument, getCurrentUser, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch(error) {
        yield put(signInFailure(error));
    }
}


export function* signInWithEmail({ payload: { email, password }}) {
    try {
            const { user } = yield auth.signInWithEmailAndPassword(email, password);
            const userRef = yield call(createUserProfileDocument, user);
            const userSnapshot = yield userRef.get();
            yield put(
                signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
            )
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) {
            localStorage.removeItem('user')
            return
        };
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutFailure(error))
    }
}

export function* fetchNotifications() {
    try {
        const user = yield select(selectors.selectCurrentUser);
        console.log(user);
        const notificationsRef = yield firestore.collection('notifications').where('recipient', '==', user.id).limit(6)
        const snapshot = yield notificationsRef.get();
        const notifications = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchNotificationsSuccess(notifications))
    } catch(error) {
        yield put(fetchNotificationsFailure(error))
    }
}

export function* editUserDetail({ payload: { currentUser, userDetail } }) {
    try {
        console.log(userDetail)
        const user = yield select(selectors.selectCurrentUser)
        const data = yield firestore.collection('userDetails').doc(user.id).set({
            bio: userDetail.bio,
            education: userDetail.education,
            location: userDetail.location
        }, {merge: true} )
        console.log(data)
        yield put(editUserDetailSuccess(true))
    } catch(error) {
        yield put(editUserDetailFailure(error))
    }
}

export function* onGoogleSignInStart() {  
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onFetchNotificationsStart() {
    yield takeLatest(UserActionTypes.FETCH_NOTIFICATIONS_START, fetchNotifications)
}

export function* onEditUserDetailStart() {
    yield takeLatest(UserActionTypes.EDIT_USER_DETAIL_START, editUserDetail)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onFetchNotificationsStart), call(onEditUserDetailStart)])
}