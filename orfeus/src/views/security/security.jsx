import security_styles from "./security.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { Component } from "react";

export default class securityProfile extends Component {
  urlParams = new URLSearchParams(window.location.search);
  render() {
    return (
      <body className={security_styles.profile_body}>
        <section className={security_styles.security_class}>
          <h1 className={security_styles.security_h1}>Security</h1>
          <h3 className={security_styles.security_h3}>Change Password</h3>
        </section>
      </body>
    );
  }
}
