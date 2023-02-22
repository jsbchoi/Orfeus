import React from "react";

function Input({ label, type, name, value, setValue, idx }) {
  const isPassword = type === "password";
  const autoComplete = name === 2 && isPassword ? "current-password" : "username";
  return (
    <div className="form-row">
      <label>{label}</label>
      <input
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