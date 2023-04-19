import signUp_styles from "./SignUp.module.css";
import Form from "./Form";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  render() {

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[400],
      '&:hover': {
        backgroundColor: purple[600],
      },
    }));

    return (
      <div className={signUp_styles.div_topForm_signup}>
        <form className={signUp_styles.topForm_signup}>
          <div className={signUp_styles.overlay}></div>
          <h3 className={signUp_styles.signup_signup}>SIGN UP</h3>
          <div className={signUp_styles.wholeForm_signup}>
            <Form />
          </div>
          <div>
            <Link to="/Login">
              <ColorButton
                variant="contained"
                color="success"
              >
                Already Registered?
              </ColorButton>
            </Link>
          </div>
            {/* <Link to="/Login">
              <button type="login">Login</button>
            </Link> */}
          
        </form>
      </div>
    );
  }
}
