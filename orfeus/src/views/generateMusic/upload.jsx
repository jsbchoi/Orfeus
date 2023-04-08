//Code invovling file input: https://www.filestack.com/fileschool/react/react-file-upload/

import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./generateMusic.module.css";
import { useNavigate } from "react-router-dom";
const baseURL = "http://127.0.0.1:4000/";

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
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  function updateSample(event) {
    setSample(event.target.value);
  }

  function updateOutput(event) {
    setOutput(event.target.value);
  }

  //function to look for file to input
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  //Function for filename event
  function updateInput(event) {
    setName(event.target.value);
  }

  //Function for genre event
  function handleClick(event) {
    setGenre(event.target.value); //onChange={handleClick}  previously can't test rn
  }

  //Event at submit button
  function HandleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", name); //new filename from the user
    formData.append("genre", genre); //User input genre
    formData.append("sampleLength", sampleLength);
    formData.append("outputLength", outputLength);
    console.log(formData);
    const config = {
      //allows "All Files"
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    };
    axios.post(baseURL +"file", formData, config).then((response) => {    // stores formData data(file, filename, genre) somewhere
      console.log(response.data);
    });
    window.alert("You will get an email notifying you when your music generation is complete.");
    navigate("/Account/musicList")
  }

  return (
    <div className={styles.entire_form}>
      <form className={styles.upload_form} onSubmit={HandleSubmit}>
        <div className={styles.sample_div}>
          <h1 className={styles.sample_title}>MUSIC GENERATION</h1>
          <label className={styles.audio_sample_title}>Audio Sample (.wav)</label>
          <input
            type="file"
            name="file"
            accept="audio/wav"
            onChange={handleChange}
            className={styles.audio_input}
          />
        </div>
        <div className={styles.filename_div}>
          <label className={styles.filename_label}>Output Audio Name: </label>
          <input type="text" placeholder="filename" onChange={updateInput} className={styles.audioName_input} />
        </div>

        <div>
          <label className={styles.filename_label}>
            Sample Length (secs):{" "}
          </label>
          <input
            size={6}
            type="text"
            placeholder="30"
            onChange={updateSample}
            className={styles.length_input}
          />
        </div>
        <div>
          <label className={styles.filename_label}>Output Length (secs):</label>
          <input
            size={6}
            type="text"
            placeholder="30"
            onChange={updateOutput}
            className={styles.output_input}
          />
        </div>
        {/*<div>
          <ReactSlider
            className="timeSlider"
            trackClassName="timeTrack"
            thumbClassName="timeThumb"  
          />
  </div> */}
        <div className={styles.genre_div}>
          <label className={styles.genre_label}>Genre</label>
          <Select options={Genres} getValue={handleClick} />
        </div>
        <button type="submit" style={{backgroundColor: '#AB47BC'}}>Upload</button>
      </form>
    </div>
  );
}

export default Upload;
