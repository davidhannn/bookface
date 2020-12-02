import React from 'react'
import './create-post.styles.scss';

import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { Avatar } from '@material-ui/core';

const CreatePost = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="createPost">
            <div className="createPost__top">
                <Avatar />
                <form>
                    <input type="text" placeholder={`What's on your mind`} />
                    <button type="button" onClick={handleSubmit}>Hidden Button</button>
                </form>
            </div>
            <div className="createPost__bottom">
                <VideocamIcon />
                <PhotoLibraryIcon />
                <InsertEmoticonIcon />
            </div>
        </div>
    )
}

export default CreatePost
