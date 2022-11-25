import React from "react";

function Input({ label, type, name, value, setValue }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export default React.memo(Input);