import React, { useState } from "react";
import axios from "axios";
import "./generateMusic.css";

function Upload() {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div>
      <form class="reactfile-form" onSubmit={handleSubmit}>
        <h1 className="react-file-upload">React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button className="upload-text" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
