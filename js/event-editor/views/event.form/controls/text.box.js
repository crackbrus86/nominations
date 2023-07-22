import React from "react";
import classnames from "classnames";

const TextBox = ({
  label,
  value,
  onChange,
  readOnly = false,
  required = false,
  error = null,
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="col-sm-10">
        <input
          type="text"
          value={value}
          readOnly={readOnly}
          className={classnames("form-control", {
            "is-invalid": !!error,
            "is-valid": required && value && !error,
          })}
          onChange={(e) => handleChange(e)}
        />
        {!!error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
};
export default TextBox;
