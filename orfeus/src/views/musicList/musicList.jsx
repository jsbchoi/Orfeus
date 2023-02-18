import music_styles from "./musicList.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Component } from "react";

const MusicAccount = () => {
  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <body className={music_styles.profile_body}>
      <section className={music_styles.music_class}>
        <h1 className={music_styles.music_h1}>List of your music</h1>
        <ul>
          <li>List of Music</li>
        </ul>
      </section>
    </body>
  );
};

export default MusicAccount;
