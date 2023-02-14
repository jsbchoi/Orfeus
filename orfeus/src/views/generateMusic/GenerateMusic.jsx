import generate_styles from './GenerateMusic.module.css';

import React, { Component } from 'react';
import Upload from './upload';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GenerateMusic extends Component {
  render() {
    return (
      <div className={generate_styles.generate_music_form}>
        <h1 className={generate_styles.generatemusic_header}>
          Music Generation
        </h1>
        <div>
          <Upload />
        </div>
      </div>
    );
  }
}
