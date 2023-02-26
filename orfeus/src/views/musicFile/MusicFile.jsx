import review_styles from './MusicFile.module.css';
import React from 'react';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import ReactPlayer from 'react-player';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
} from '@coreui/react';

import '@coreui/coreui/dist/css/coreui.min.css';

export default function MusicFile() {
  const [value, setValue] = React.useState(4);

  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };

  return (
    <div className={review_styles.musicFile}>
      <div className={`${review_styles.split} ${review_styles.left}`}>
        <div className={review_styles.imgContainer}>
          <img
            className={review_styles.music_img}
            src="assets/audio.jpg"
            alt="Sample Audio File"
          />
        </div>
        <h1>AudioFile</h1>
        <h2>Created By: User123</h2>
        <h3 className={review_styles.overall_rating}> Overall Rating</h3>
        <Rating name="read-only" value={3.5} readOnly />

        <div className={review_styles.musicPlayer}>
          <ReactPlayer url="https://soundcloud.com/openai_audio/rock-in-the-style-of-elvis-4" />
        </div>
      </div>
      <div className={`${review_styles.split} ${review_styles.right}`}>
        <div className={review_styles.right_content}>
          <h2>Reviews</h2>
          <div className={review_styles.reviews}>
            <CRow>
              <CCol sm={6}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Great Song!</CCardTitle>
                    <CCardText>I really enjoyed the new sound.</CCardText>
                    <Rating name="read-only" value={3} readOnly />
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm={6}>
                <CCard>
                  <CCardBody>
                    <CCardTitle>Nailed the new genre</CCardTitle>
                    <CCardText>Sounds exactly like I hoped!</CCardText>
                    <Rating name="read-only" value={4} readOnly />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
          <h3>Submit Your Review!</h3>
          <div className={review_styles.newReview}>
            <form className={review_styles.review} onSubmit={handleSubmit}>
              <input
                className={review_styles.title_text}
                type="text"
                placeholder="Title"
              />

              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <textarea
                className={review_styles.review_text}
                placeholder="Review"
              ></textarea>
              <button type="submit">Send</button>
              {message && <span>Review Submitted!</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
