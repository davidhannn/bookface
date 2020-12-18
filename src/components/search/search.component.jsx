import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search'

import './search.styles.scss';

const Search = () => {
    let history = useHistory();

    const [text, setText] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        if(text === "") {
            alert('Please enter a name')
        } else {
            setText("");
            history.push(`/search/${text}`)
        }

    }

    const handleChange = (e) => setText(e.target.value);


    return (
            <form className="search__input" action="/search" onSubmit={handleSubmit}>
                    <SearchIcon />
                    <input type="text" onChange={handleChange} value={text} placeholder="Search Facebook"/>
            </form>
         )
}

export default Search;
