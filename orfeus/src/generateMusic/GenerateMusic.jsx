import "./generateMusic.css";

import React, { Component, useState } from "react";
import React from 'react';
import Select from 'react-select';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Genres = [
    {label: 'Country', value: 01},
    {label: 'Jazz', value: 02},
    {label: 'Classic', value: 03},
    {label: 'Hip-Hop', value: 04},
    {label: 'Blues', value: 01}
]

const [file, setFile] = useState()

function handleChange(event){
    setFile(event.target.files[0])
}

export default class GenerateMusic extends Component{

    render(){
        return(
            <form>
                <h2>Music Generation</h2>
                <div className="wholeForm">
                    <div className="mb-3">
                        <label>Audio Sample (.wav)</label>
                        <input
                        type="file" onChange={handleChange}
                        />
                        <button type="submit">Upload</button>
                    </div>
                    <div className="mb-3">
                        <label>Output Audio Name</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="filename"
                        />
                    </div>
                    <div className="col-md-6">
                        <label> Genre</label>
                        <Select options={Genres} />
                    </div>
                    









                </div>





            </form>
        )
    }
}
