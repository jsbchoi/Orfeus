import login_styles from "./Login.module.css";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class Login extends Component {
  render() {
    return (
      <form className={login_styles.login_form}>
        <h3 className={login_styles.login_login}>LOGIN</h3>
        <div className={login_styles.mb_3_login}>
          <Form />
        </div>

        <p>
          {" "}
          Need to Create an Account?
          <Link to="/signUp">
            <button>Create an Account</button>
          </Link>
        </p>
      </form>
    );
  }
}
