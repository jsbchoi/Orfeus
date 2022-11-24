import "./signUp.css";
import Form from "./Form"

import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  render() {
    return (
      <form>
        <h3>Sign Up</h3>
        <div className="wholeForm">
          <Form/>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
        <p className="tail">
          Already Registered?
          <Link to="/Login">
            <button type="login">Login</button>
          </Link>
        </p>
      </form>
    );
  }
}
