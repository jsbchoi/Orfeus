import styles from "./generateMusic.module.css";

import React, { Component } from "react";
import Upload from "./upload";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GenerateMusic = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/Login");
    } else {
      const decodedToken = jwt_decode(token);
      setUsername(decodedToken["sub"]);
      setRole(decodedToken["role"]);
    }
  }, [navigate, role]);
  return (
    <body>
      <div className={styles.generate_container}>
        <div className={styles.generate_explanation}> 
          <h2>HOW TO GENERATE MUSIC </h2>
          <div className={styles.steps_explanation}>
            <p> Select a .wav file from your computer for music sampling.</p>
            <p> Name your music file. </p>
            <p> Input the length of the selected .wav file or less.
            </p>
            <p> Input how long you want the length of the generated music to be.</p>
            <p> Select the genre you want the generated music to be in.</p>
          </div>
        </div>
        <div className={styles.generate_music_form}>
          <Upload />
        </div>
      </div>
    </body>
  );
};

export default GenerateMusic;
