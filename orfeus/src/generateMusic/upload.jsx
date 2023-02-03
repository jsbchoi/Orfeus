//Code invovling file input: https://www.filestack.com/fileschool/react/react-file-upload/

import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import ReactSlider from "react-slider";
import "./generateMusic.css";

//Drop-down genre options
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
  const [name, setName] = useState("filename");
  const [sampleLength, setSample] = useState(30);
  const [outputLength, setOutput] = useState(30);


  function updateSample(event) {
    setSample(event.target.value)
  }

  function updateOutput(event) {
    setOutput(event.target.value)
  }







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
    formData.append("fileName", name);                //new filename from the user
    formData.append("genre", genre);                  //User input genre
    formData.append("sampleLength", sampleLength);
    formData.append("outputLength", outputLength);
    const config = {                                    //allows "All Files"
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {    // stores formData data(file, filename, genre) somewhere
      console.log(response.data);
    });
  }

  return (
    <div>
      <form className="upload_form" onSubmit={handleSubmit}>
        <div className="sample_div">
          <h1 className="sample_title">Sample File Upload</h1>
          <label>Audio Sample (.wav)</label>
          <input type="file" onChange={handleChange} />
        </div>
        <div className="filename_div">
          <label className="filename_label">Output Audio Name: </label>
          <input type="text" placeholder="filename" onChange={updateInput}/>
        </div>
        
        <div>
          <label className="filename_label">Sample Length (secs): </label>
          <input size={6} type="text" placeholder="30" onChange={updateSample}/>
        </div>
        <div>
          <label className="filename_label">Output Length (secs):</label>
          <input size={6} type="text" placeholder="30" onChange={updateOutput}/>
        </div>
        {/*<div>
          <ReactSlider
            className="timeSlider"
            trackClassName="timeTrack"
            thumbClassName="timeThumb"  
          />
  </div> */}
        <div className="genre_div">
            <label className="genre_label" >Genre</label>
            <Select options={Genres} onChange={handleClick} />
    
          </div>
        <button type="submit" >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
