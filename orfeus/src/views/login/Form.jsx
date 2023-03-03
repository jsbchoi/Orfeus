import React from "react";
import useForm from "./useForm";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import login_styles from "./Login.module.css";

const baseURL = "http://127.0.0.1:5000/";

function Form() {
  const [data, setData] = useForm();
  const login = ["USERNAME", "PASSWORD"];
  const type = ["text", "password"];
  const navigate = useNavigate();

  function handleResponse(resp) {
    switch (resp.status) {
      case 200:
        console.log(resp.data);
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
  function handleClick() {
    axios.post(baseURL + "login", data).then((response) => {
      handleResponse(response);
    });
  }
  return (
    <>
      {data.map((input, idx) => (
        <div className={login_styles.bubbleForm}>
          <Input
            className={login_styles.login_input}
            key={idx}
            type={type[idx]}
            autoComplete={type[idx] === "password" ? "current-password" : ""}
            value={input.value}
            label={login[idx]}
            name={input.id}
            setValue={setData}
          />
        </div>
      ))}
      {
        <div className={login_styles.d_grid}>
          <button
            type="button"
            className={login_styles.btn_btn_primary}
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      }
      {/* {data.map((d, i) => (
        <p key={i}> {JSON.stringify(d)} </p>
      ))} */}
    </>
  );
}

export default Form;
