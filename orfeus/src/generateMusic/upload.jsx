//Code invovling file input: https://www.filestack.com/fileschool/react/react-file-upload/

import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./generateMusic.css";

const Genres = [
  { label: "Country", value: "01" },
  { label: "Jazz", value: "02" },
  { label: "Classic", value: "03" },
  { label: "Hip-Hop", value: "04" },
  { label: "Blues", value: "05" },
];

function Upload() {
  const [file, setFile] = useState();
  const [genre, setGenre] = useState();
  const [name, setName] = useState();

  //function to look for file to input
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  //Function for filename event
  function updateInput(event) {
    setName(event.target.value)
  }

  //Function for genre event
  function handleClick(event) {
    setGenre(event.target.value)
  }

  //Event at submit button
  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/uploadFile";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {                                    //allows "All Files"
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {    //stores/puts file somewhere
      console.log(response.data);
    });
  }

  return (
    <div>
      <form class="reactfile-form" onSubmit={handleSubmit}>
        <div>
          <h1 className="react-file-upload">React File Upload</h1>
          <label>Audio Sample (.wav)</label>
          <input type="file" onChange={handleChange} />
        </div>
        <div>
          <label>Output Audio Name: </label>
          <input type="text" placeholder="filename" onChange={updateInput}/>
        </div>
        <div className="col-md-6-form-genre">
            <label class="genre-output-name" style={{color: "white"}}>Genre</label>
            <Select options={Genres} onChange={handleClick}/>
          </div>
        <button className="upload-text" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
