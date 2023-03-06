import React from "react";
import login_styles from "./Login.module.css";

function Input({ label, type, name, value, setValue, idx }) {
  const isPassword = type === "password";
  const autoComplete =
    name === 2 && isPassword ? "current-password" : "username";
  return (
    <div className={login_styles.form_row}>
      <label>{label}</label>
      <input
        className={login_styles.login_input}
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
