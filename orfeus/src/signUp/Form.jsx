import React from "react";
import useForm from "./useForm";
import Input from './Input';

function Form() {
  const [data, setData] = useForm();
  const signup = [ "Username", "Password", "Email" ]

  return (
    <>
      {
        data.map((input, idx) => (
          <Input
             key={idx}
             type="text"
             value={input.value}
             label={signup[idx]}
             name={input.id}
             setValue={setData}
          />
        ))
      }
      
      {
        data.map((d, i) => (
          <p key={i}> { JSON.stringify(d) } </p>
        ))
      }
    </>
  );
}

export default Form;