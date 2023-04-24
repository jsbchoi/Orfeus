import React from "react";
import useForm from "./useForm";
import Input from "./Input";
import axios from "axios";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import signUp_styles from "./SignUp.module.css";
const baseURL = "http://127.0.0.1:4000/";

function Form() {
  const [data, setData] = useForm();
  const signup = ["USERNAME", "PASSWORD", "EMAIL"];
  const type = ["text", "password", "email"];
  const navigate = useNavigate();

  function handleResponse(resp) {
    switch (resp.status) {
      case 200:
        localStorage.setItem("access_token", resp.data.access_token);
        navigate("/account");
        break;
      case 403:
        console.log("Bad credentials");
        break;
      default:
        break;
    }
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[400],
    '&:hover': {
      backgroundColor: purple[600],
    },
  }));

  function handleClick() {
    // const post = bent(baseURL, "POST", "json", 200);
    // const response = post("register", data);
    // console.log(response);
    axios.post(baseURL + "register", data).then((response) => {
      handleResponse(response);
    });
  }
  return (
    <>
      {data.map((input, idx) => (
        <div className={signUp_styles.bubbleForm}>
          <Input
            className={signUp_styles.signup_input}
            key={idx}
            type={type[idx]}
            value={input.value}
            label={signup[idx]}
            name={input.id}
            setValue={setData}
          />
        </div>
      ))}
      {
        <div className={signUp_styles.d_grid}>
          <ColorButton
              variant="contained"
              color="success"
              onClick={handleClick}
            >
              Sign Up
            </ColorButton>
        </div>
      }
      {/* ***DO NOT UNCOMMENT THIS***this is the code for the username and password to show up */}
      {/* {data.map((d, i) => (
        <p key={i}> {JSON.stringify(d)} </p>
      ))} */}
    </>
  );
}

export default Form;
