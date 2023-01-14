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
            <div className="split left">
                <div className = "imgContainer">
                    <img src="assets/audio.jpg" alt="Sample Audio File Image"/>
                </div>
                <h1>AudioFile</h1>
                <h2>Created By: User123</h2>


                <h3 class="overall-rating"> Overall Rating</h3>
                <Rating name="read-only" value={3.5} readOnly />
            </div>
            <div className="split right">
              <div class="right-content">
                    <h2>Reviews</h2>
<div class="reviews">
<CRow>
  <CCol sm={6}>
    <CCard>
      <CCardBody>
        <CCardTitle>Great Song!</CCardTitle>
        <CCardText>
         I really enjoyed the new sound.
        </CCardText>
        <Rating name="read-only" value={3} readOnly />
      </CCardBody>
    </CCard>
  </CCol>
  <CCol sm={6}>
    <CCard>
      <CCardBody>
        <CCardTitle>Nailed the new genre</CCardTitle>
        <CCardText>
          Sounds exactly like I hoped!
        </CCardText>
        <Rating name="read-only" value={4} readOnly />
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</div>
<h3>Submit Your Review!</h3>
<div class="newReview">
                    <form class="review"onSubmit={handleSubmit}>
                    <input class="title-text" type="text" placeholder="Title" />
                    
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    />
                    <textarea class="review-text" placeholder="Review"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Review Submitted!</span>}
                    </form>
  </div>
  </div>

            </div>

        </div>
    )
}