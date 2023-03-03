import signUp_styles from "./SignUp.module.css";
import Form from "./Form";

import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  render() {
    return (
      <form className={signUp_styles.topForm_signup}>
        <div className={signUp_styles.overlay}></div>
        <h3 className={signUp_styles.signup_signup}>Sign Up</h3>
        <div className={signUp_styles.wholeForm_signup}>
          <Form />
        </div>
        <p className={signUp_styles.tail_signup}>
          Already Registered?
          <Link to="/Login">
            <button type="login">Login</button>
          </Link>
        </p>
      </form>
    );
  }
}
