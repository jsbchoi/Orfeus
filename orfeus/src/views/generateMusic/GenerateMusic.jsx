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
          <h2>How to Generate Music: </h2>
          <p>1. Select a .wav file from your computer for music sampling. It must be a .wav file.</p>
          <p>2. Name your music file. </p>
          <p>3. Input the length of the selected .wav file or less. The model takes from the begining of the given sample to
            the given sample length.
          </p>
          <p>4. Input how long you want the length of the generated msuic to be.</p>
          <p>5. Select the genre you want the generated music to be in.</p>
        </div>
        <div className={styles.generate_music_form}>
          <Upload />
        </div>
      </div>
    </body>
  );
};

export default GenerateMusic;
