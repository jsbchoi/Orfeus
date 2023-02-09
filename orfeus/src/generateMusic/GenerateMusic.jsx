import styles from "./generateMusic.module.css";

import React, { Component } from "react";
import Upload from "./upload";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const GenerateMusic = () => {
    return (
      <div className={styles.generate_music_form}> 
      
        <h1 className={styles.generatemusic_header}>Music Generation</h1>
        <div>
          <Upload />
        </div>
         
      </div>
    );
};

export default GenerateMusic;
