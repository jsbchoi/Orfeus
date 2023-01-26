import "./generateMusic.css";

import React, { Component } from "react";
import Upload from "./upload";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class GenerateMusic extends Component {
  render() {
    return (
      <div className="generate_music_form"> 
      
        <h1 className="generatemusic_header">Music Generation</h1>
        <div>
          <Upload />
        </div>
         
      </div>
    );
  }
}
