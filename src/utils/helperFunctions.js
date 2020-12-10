// export const snapShotToArray = (snapshot) => {
//     var returnArr = [];

//     snapshot.forEach(function(childSnapshot) {
//         var item = childSnapshot.val();
//         item.key = childSnapshot.key;

//         returnArr.push(item);
//     });

//     return returnArr;
// }

// export const convertCollectionsSnapshotToMap = (collections) => {
//     const transformedCollection = collections.docs.map(doc => {
//         const { title, items } = doc.data();

//         return {
//             routeName: encodeURI(title.toLowerCase()),
//             id: doc.id,
//             title, 
//             items
//         }
//     })

//     return transformedCollection.reduce((accumulator, collection) => {
//         accumulator[collection.title.toLowerCase()] = collection;
//         return accumulator
//     }, {})
// }