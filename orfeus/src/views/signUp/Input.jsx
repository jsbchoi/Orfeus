import React from "react";
import signUp_styles from "./SignUp.module.css";

function Input({ label, type, name, value, setValue }) {
  const isPassword = type === "password";
  const autoComplete =
    name === 2 && isPassword ? "current-password" : "username";
  return (
    <div className={signUp_styles.form_row}>
      <label>{label}</label>
      <input
        className={signUp_styles.signup_input}
        type={type}
        name={name}
        value={value}
        onChange={setValue}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default React.memo(Input);
