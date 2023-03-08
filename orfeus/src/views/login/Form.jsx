import React from "react";
import useForm from "./useForm";
import Input from "./Input";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import login_styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://127.0.0.1:5000/";

function Form() {
  const [data, setData] = useForm();
  const login = ["USERNAME", "PASSWORD"];
  const type = ["text", "password"];
  const navigate = useNavigate();
  const gotIn = false;

  function handleResponse(resp) {
    switch (resp.status) {
      case 200:
        console.log(resp.data);
        localStorage.setItem("access_token", resp.data.access_token);
        navigate("/account");
        break;
      case 403:
        console.log("Bad credentials");
        toast.error("Passwords do not match!");
        break;
      default:
        break;
    }
  }
  function handleClick() {
    console.log("got here");
    axios.post(baseURL + "login", data).then((response) => {
      handleResponse(response);
      gotIn = true;
      console.log(gotIn);
      return;
    });
    console.log(gotIn);
    if (gotIn == false) {
      console.log("Bad credentials");
      toast.error("Passwords do not match!");
    }
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
          <ToastContainer />
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
