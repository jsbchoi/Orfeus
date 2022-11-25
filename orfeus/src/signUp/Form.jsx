import React from "react";
import useForm from "./useForm";
import Input from './Input';
import { json } from "react-router-dom";
const bent = require('bent')
const baseURL = "http://127.0.0.1:5000/"

function Form() {
  const [data, setData] = useForm();
  const signup = ["Username", "Password", "Email"]
  const type = ["text", "password", "email"]

  function handleClick() {
    const link = baseURL + "register"
    const post = bent(baseURL, 'POST', 'string', 200)
    const response = post('register', data)
    console.log(response)
  }
  return (
    <>
      {
        data.map((input, idx) => (
          <Input
            key={idx}
            type={type[idx]}
            value={input.value}
            label={signup[idx]}
            name={input.id}
            setValue={setData}
          />
        ))
      }
      {
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Sign Up
          </button>
        </div>
      }
      {
        data.map((d, i) => (
          <p key={i}> {JSON.stringify(d)} </p>
        ))
      }
    </>
  );
}

export default Form;