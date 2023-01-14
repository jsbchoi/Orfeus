import "./generateMusic.css";

import React, { Component } from "react";
import Select from "react-select";
import Upload from "./upload";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Genres = [
  { label: "Country", value: "01" },
  { label: "Jazz", value: "02" },
  { label: "Classic", value: "03" },
  { label: "Hip-Hop", value: "04" },
  { label: "Blues", value: "05" },
];

export default class GenerateMusic extends Component {
  render() {
    return (
      <form class="generate-music-form">
        <h2 id="generatemusic-header" style={{ color: "white"}}>Music Generation</h2>
        <div className="wholeForm-form">
          <div>
            <label class="instruct-part">Audio Sample (.wav)</label>
            <Upload />
          </div>
          <div className="mb-3-form-audio-output">
            <label class=
            "output-audio-name">Output Audio Name</label>
            <input class="input-box" type="text" placeholder="filename" />
          </div>
          <div className="col-md-6-form-genre">
            <label class="genre-output-name" style={{color: "white"}}>Genre</label>
            <Select options={Genres} />
          </div>
          <div className="mb-3-form-upload">
            <button type="submit">Upload</button>
          </div>
        </div>
      </form>
    );
  }
}
