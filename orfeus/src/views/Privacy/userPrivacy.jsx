import privacy_styles from "./userPrivacy.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Component } from "react";

const UserAccount = () => {
  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <body className={privacy_styles.profile_body}>
      <section className={privacy_styles.privacy_class}>
        {/* dislay setting here */}
        <h1 className={privacy_styles.privacy_h1}>
          Your current privacy setting
        </h1>
        <button className={privacy_styles.privacy_h2}>
          Change your privacy setting
        </button>
      </section>
    </body>
  );
};

export default UserAccount;
