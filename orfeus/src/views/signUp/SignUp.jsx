import signUp_styles from "./SignUp.module.css";
import Form from "./Form";

import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  render() {
    return (
      <div className={signUp_styles.div_topForm_signup}>
        <form className={signUp_styles.topForm_signup}>
          <div className={signUp_styles.overlay}></div>
          <h3 className={signUp_styles.signup_signup}>SIGN UP</h3>
          <div className={signUp_styles.wholeForm_signup}>
            <Form />
          </div>
          <p className={signUp_styles.tail_signup}>
            <Link to="/Login" className={signUp_styles.already_registered}>
              Already Registered?
            </Link>
            {/* <Link to="/Login">
              <button type="login">Login</button>
            </Link> */}
          </p>
        </form>
      </div>
    );
  }
}
