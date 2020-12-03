import React, { useState } from 'react'
import './create-post.styles.scss';

import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { Avatar } from '@material-ui/core';

const CreatePost = () => {

    const [fullPost, setFullPost] = useState({ post: "", imageUrl: ""});

    const { post, imageUrl } = fullPost;

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFullPost({...fullPost, [name]: value })
    }

    return (
        <div className="createPost">
            <div className="createPost__top">
                <Avatar />
                <form>
                    <input name="post" value={post} type="text" placeholder={`What's on your mind`} onChange={handleChange}/>
                    <input name="imageUrl"value={imageUrl} placeholder="Image URL"  />
                    <button type="button" onClick={handleSubmit}>Hidden Button</button>
                </form>
            </div>
            <div className="createPost__bottom">
                <div className="createPost__button">
                    <VideocamIcon style={{ color: "red" }}/>
                    <h3>Live Video</h3> 
                </div>
                <div className="createPost__button">
                    <PhotoLibraryIcon style={{ color: "green"}} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="createPost__button">
                    <InsertEmoticonIcon style={{ color: "yellow"}} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
