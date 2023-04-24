import login_styles from "./Login.module.css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class Login extends Component {
  render() {

    const ColorButton = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[400],
      '&:hover': {
        backgroundColor: purple[600],
      },
    }));

    return (
      <div className={login_styles.div_login_form}>
        <form className={login_styles.login_form}>
          <h3 className={login_styles.login_login}>LOGIN</h3>
          <div className={login_styles.mb_3_login}>
            <Form />
          </div>
          
          <div>
            <Link to="/signUp">
              <ColorButton
                variant="contained"
                color="success"
              >
                Create Account
              </ColorButton>
            </Link>
            {/* Need to Create an Account? */}
            {/* <Link to="/signUp">
              <button>Create an Account</button>
            </Link> */}
          </div>
        </form>
      </div>
    );
  }
}
