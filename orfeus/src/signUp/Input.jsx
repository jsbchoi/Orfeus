import React from "react";

function Input({ label, name, value, setValue }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export default React.memo(Input);