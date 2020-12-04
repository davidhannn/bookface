import React, { useState } from 'react'

import { firestore, storage } from '../../firebase/firebase.utils';

import firebase from 'firebase';

const ImageUpload = ({ id: { userId } }) => {

    console.log(userId);
    const allInputs = { imgUrl: ''};

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
      }
    
      function handleUpload(e) {
        e.preventDefault();
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
                firestore
                .collection('users')
                .doc(`${userId}`)
                .update({
                    profileImgUrl: url
                })
                .then(() => console.log("Document updated!"))

            //   setFile(null);
            //   setURL(url);
            });
        });
      }

    return (
        <div>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button disabled={!file}>upload to firebase</button>
        </form>
        <img src={url} alt="" />
      </div>
    )
}

export default ImageUpload
