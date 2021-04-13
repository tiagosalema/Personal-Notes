import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  let [invalidInputs, setInvalid] = useState({ title: false, body: false, image: false })

  // image metadata
  const cloudinary = {
    url: 'https://api.cloudinary.com/v1_1/',
    username: "oh-my",
    path: "/image/upload",
    presets: "instagram-clone"
  }

  const uploadFile = async () => {

    // prepare file
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', cloudinary.presets);

    // upload file to cloudinary
    const res = await fetch(cloudinary.url + cloudinary.username + cloudinary.path, {
      method: 'POST',
      body: data,
    });
    return await res.json();
  };

  const handleSubmit = async () => {
    setInvalid({ title: !title, body: !body, image: !image })

    if (title && body && image) {

      const { secure_url } = await uploadFile();
      console.log(secure_url)
      axios.post("/create-post",
        { title, body, image: secure_url },
        { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } }
      )
        .then(({ data }) => {
          console.log("Post created!", data);
        })
        .catch(err => console.error(err))
    }

  }

  return (
    <>
      <h1>Create a new post</h1>
      <div className='form'>
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          className={invalidInputs.title ? 'invalid' : undefined}
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write something interesting"
          type="text"
          className={invalidInputs.body ? 'invalid' : undefined}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleSubmit}>Create post</button>
      </div>
    </>
  )
}

export default Create;