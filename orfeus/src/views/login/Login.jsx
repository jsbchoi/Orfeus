import "./login.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <h3 className="login-login">Login</h3>
        <div className="mb-3-login">
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
