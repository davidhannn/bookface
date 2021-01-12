import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../avatar/avatar.component'
import { firestore, getUsers } from '../../firebase/firebase.utils'

import './friends.styles.scss'

const Friends = ({ userId }) => {

    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {

        firestore.collection('friendships').doc(userId).get().then(doc =>{
            const friends = doc.data();
            const friendIds = Object.keys(friends).filter(key => friends[key] === true);

            const refs = friendIds.map(id => firestore.collection('users').doc(id).get()) 
 
            Promise.all(refs).then(docs => {
                setFriendsList(docs.map(doc => ({
                    friendId: doc.id,
                    friendData: doc.data()
                })
                    ))
            })
            // firestore.getAll(...refs).then(snapshot => {
            //     snapshot.forEach(snapshot => {
            //         console.log(snapshot.data())
            //     })
            // })
            // const friendSnapshot = friendRefs.get().then((friend) => console.log(friend.data()))

            // getUsers(friendIds)
            // friendIds.forEach(id => firestore.doc(`users/${id}`).get().then(friendData => {
            //     setFriendsList(friendData.data(), friendData.id)
            // }))
            // const refs = friendIds.map(id => firestore.doc(`users/${id}`)).get().then(data => console.log(doc.data()))
            // firestore.getAll(...refs).then(user => console.log(user.map(doc => doc.data())))
            // console.log(refs)
            // await firestore.getAll(...refs).then(user => console.log(user.map(doc => doc.data())))
            // const friendData = friendIds.map((friend) => {
            //     firestore.collection('users').doc(friend).get().then(doc => {
            //         const friendData = doc.data();
            //     })
            // })
            // const test = friendIds.map((friend) => firestore.collection('users').doc(friend).get().then((doc) => setFriendsList(doc.data())))
        })
    }, [])

    return (
        <Fragment>
            
            <div className="friends-container">
                {friendsList.map((friend) => {
                    const { friendData : { firstName, lastName, profileImgUrl }, friendId } = friend
                    return (
                        <Link to={`${friendId}`} >
                    <div className="friend-container-single">

                            <img src={profileImgUrl} className="friend-container-image"/>
                            <span>{firstName} {lastName}</span>
                    </div>
                    </Link>
                    )
                })}
        </div>
        </Fragment>
    )
}

export default Friends
