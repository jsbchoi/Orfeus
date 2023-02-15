import user_styles from "./userAccount.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Component } from "react";

const UserAccount = () => {
  // urlParams = new URLSearchParams(window.location.search);
  // render() {
  return (
    <body className={user_styles.profile_body}>
      <section className={user_styles.user_class}>
        <h1 className={user_styles.user_h1}>Account</h1>
        <h2 className={user_styles.user_h2}>Username</h2>
        <h3 className={user_styles.user_h3}>Email</h3>
      </section>
    </body>
  );
};

export default UserAccount;
