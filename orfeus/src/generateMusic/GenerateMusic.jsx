import "./generateMusic.css";

import React, { Component } from "react";
import Upload from "./upload";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class GenerateMusic extends Component {
  render() {
    return (
      <form class="generate-music-form">
        <h2 id="generatemusic-header" style={{ color: "white"}}>Music Generation</h2>
        <div className="wholeForm-form">
          <div>
            <Upload />
          </div>
          {/*
          <div className="mb-3-form-audio-output">
            <label class=
            "output-audio-name">Output Audio Name</label>
            <input class="input-box" type="text" placeholder="filename" />
          </div>
    */}
         
        </div>
      </form>
    );
  }
}
