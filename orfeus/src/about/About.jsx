import React from "react";
import "./about.css";

import { Component } from "react";
import { CCardGroup,ReactImg,CCard,CCardBody,CCardTitle, CCardText,CCardImage } from '@coreui/react';

// Card group component taken from following link https://coreui.io/react/docs/components/card/#:~:text=A%20react%20card%20component%20is,colors%2C%20and%20excellent%20display%20options.
import person from "./person.jpeg"
export default class About extends Component {
  render() {
    return (
      <body>
        <div class="aboutHeading">
        <h1 class="name">Orfeus</h1>
        <h2> CS 426 Senior Project in Computer Science, Spring 2023, at UNR, CSE Department</h2><br></br>
        <h3>Meet team 8: </h3>
        </div>
        <CCardGroup>
  <CCard>
    <CCardImage orientation="top" src={person} />
    <CCardBody>
      <CCardTitle>Justin Choi</CCardTitle>
      <CCardText>
        Backend Developer
      </CCardText>
    </CCardBody>
  </CCard>
  <CCard>
    <CCardImage orientation="top" src={person} />
    <CCardBody>
      <CCardTitle>Chris Nam</CCardTitle>
      <CCardText>
        Frontend Developer
      </CCardText>
    </CCardBody>
  </CCard>
  <CCard>
    <CCardImage orientation="top" src={person} />
    <CCardBody>
      <CCardTitle>Melanie Sanchez</CCardTitle>
      <CCardText>
        Frontend Developer
      </CCardText>
    </CCardBody>
  </CCard>
  <CCard>
    <CCardImage orientation="top" src={person} />
    <CCardBody>
      <CCardTitle>Yongyi Zhou</CCardTitle>
      <CCardText>
        Frontend Developer
      </CCardText>
    </CCardBody>
  </CCard>
</CCardGroup>

      </body>
    );
  }
}
