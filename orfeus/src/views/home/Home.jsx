import React from 'react';
import home_styles from './Home.module.css';

import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <body>
          <h1 className={home_styles.header1}>ORFEUS</h1>

          <div className={home_styles.home_page_a}>
            <div className={home_styles.container}>
              <h2 className={home_styles.title}>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_1}`}
                >
                  Web{' '}
                </span>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_2}`}
                >
                  based{' '}
                </span>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_3}`}
                >
                  music{' '}
                </span>
                <span
                  className={`${home_styles.title_word} ${home_styles.title_word_4}`}
                >
                  generation
                </span>
              </h2>
            </div>
          </div>
          <br></br>
          <div className={home_styles.home_page_2}>
            <text>
              Generate new music with machine learning.
              <div className={home_styles.step1}>Create an Account</div>
              <div className={home_styles.step2}>Upload your own music</div>
              <div className={home_styles.step3}>
                Pick new genres to influence your music
              </div>
              <div className={home_styles.step4}>
                Download and save music files
              </div>
            </text>
            <Link to="./login">
              <button type="home-login-btn">Login</button>
            </Link>
            <Link to="./signUp">
              <button type="home-account-btn">Create an Account</button>
            </Link>
          </div>
        </body>
        );
  }
}
