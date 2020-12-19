import React, { useEffect, useState, Fragment } from 'react'
import { firestore } from '../../firebase/firebase.utils';

import Header from '../../components/header/header.component';

import UserCard from '../../components/user-card/user-card.component'

import './searchpage.styles.scss';

const SearchPage = ({ match }) => {

    const [searchedUsers, setSearchedUsers] = useState([])

    useEffect(() => {
        console.log(match.params.text);
        firestore.collection('users').where('firstName', '==', match.params.text).onSnapshot((snapshot) => {
            setSearchedUsers(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }) )
            )}
        )

    }, [])


    return (
        <Fragment>
            <Header />
            <div className="search">
                <h5>People</h5>
                    <div className="search-people">
                        {searchedUsers.map((user) => (
                            <UserCard id={user.id} data={user.data} />
                        ))}
                    </div>
            </div>
        </Fragment>
    )
}

export default SearchPage
