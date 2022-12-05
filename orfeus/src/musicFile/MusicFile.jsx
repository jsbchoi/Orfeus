import "./musicFile.css"
import React from "react"
import { useState } from "react";
import Rating from '@mui/material/Rating';
import { CRow,CCol,CCard,CCardBody,CCardTitle, CCardText, CButton } from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css'


export default function MusicFile(){
    const [value, setValue] = React.useState(4);

    const [message, setMessage] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setMessage(true);
    };

    return(
        <div className="musicFile">
            <div className="left">
                <div className = "imgContainer">
                    <img src="assets/audio.jpg" alt="Sample Audio File Image"/>
                </div>

                <h1>AudioFile</h1>
                <h2>Created By: User123</h2>
                <h3>Overall Rating</h3>
                <Rating name="read-only" value={value} readOnly />
            </div>
            <div className="right">
                    <h2>Reviews</h2>
<CRow>
  <CCol sm={6}>
    <CCard>
      <CCardBody>
        <CCardTitle>Great Song!</CCardTitle>
        <CCardText>
          With supporting text below as a natural lead-in to additional content.
        </CCardText>
        <Rating name="read-only" value={value} readOnly />
      </CCardBody>
    </CCard>
  </CCol>
  <CCol sm={6}>
    <CCard>
      <CCardBody>
        <CCardTitle>Nailed the new genre</CCardTitle>
        <CCardText>
          With supporting text below as a natural lead-in to additional content.
        </CCardText>
        <Rating name="read-only" value={value} readOnly />
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

<h3>Submit Your Review!</h3>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    />
                    <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" />
                    <textarea placeholder="Review"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Review Submitted!</span>}
                    </form>

            </div>

        </div>
    )
}