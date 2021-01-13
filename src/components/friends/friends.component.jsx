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
        })

    }, [])

    return (
        <Fragment>
            <div className="friends__container">
                <h6>Friends</h6>
                <div className="friends__container-grid">
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
            </div>
        </Fragment>
    )
}

export default Friends
