import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCC0bchobTWz8uAgGvupcEgFM3oInpOv_c",
    authDomain: "bookface-cc025.firebaseapp.com",
    databaseURL: "https://bookface-cc025.firebaseio.com",
    projectId: "bookface-cc025",
    storageBucket: "bookface-cc025.appspot.com",
    messagingSenderId: "813233320248",
    appId: "1:813233320248:web:e391d01825beb0a86a91cd",
    measurementId: "G-M0FEHG064X"
  };

  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { firstName, lastName, email, password } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                firstName,
                lastName,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

// export const getCurrentUser = () => {
//     return new Promise((resolve, reject) => {
//         const unsubscribe = auth.onAuthStateChanged(userAuth => {
//             unsubscribe();
//             resolve(userAuth);     
//         }, reject)
//     }) 
// }

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }))

    //     const { title, items } = doc.data();

    //     return {
    //         // routeName: encodeURI(title.toLowerCase()),
    //         id: doc.id,
    //         title, 
    //         items
    //     }
    // })

    // return transformedCollection.reduce((accumulator, collection) => {
    //     accumulator[collection.title.toLowerCase()] = collection;
    //     return accumulator
    // }, {})

    return transformedCollection
}

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;