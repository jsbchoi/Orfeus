import React from "react";
import useForm from "./useForm";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const baseURL = "http://127.0.0.1:4000/";

function Form() {
  const [data, setData] = useForm();
  const signup = ["Username", "Password", "Email"];
  const type = ["text", "password", "email"];
  const navigate = useNavigate()

  function handleResponse(resp) {
    switch (resp.status) {
      case 200:
        localStorage.setItem('access_token', resp.data.access_token)
        navigate("/account")
        break;
      case 403:
        console.log("Bad credentials")
        break;
      default:
        break;
    }
  }

  function handleClick() {
    // const post = bent(baseURL, "POST", "json", 200);
    // const response = post("register", data);
    // console.log(response);
    axios.post(baseURL + "register", data).then((response) => {
      handleResponse(response)
    })
  }
  return (
    <>
      {data.map((input, idx) => (
        <div className="bubbleForm">
          <Input
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
        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Sign Up
          </button>
        </div>
      }
      {data.map((d, i) => (
        <p key={i}> {JSON.stringify(d)} </p>
      ))}
    </>
  );
}

export default Form;
