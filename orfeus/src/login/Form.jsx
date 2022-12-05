import React from "react";
import useForm from "./useForm";
import Input from './Input';
const bent = require('bent')
const baseURL = "http://127.0.0.1:5000/"

function Form() {
  const [data, setData] = useForm();
  const signup = ["Username", "Password"]
  const type = ["text", "password"]

  function handleClick() {
    const post = bent(baseURL, 'POST', 'json', 200)
    const response = post('login', data)
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
            Login
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