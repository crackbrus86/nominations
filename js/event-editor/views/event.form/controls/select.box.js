import React from "react";
import classnames from "classnames";

const SelectBox = ({
  label,
  value,
  items,
  onChange,
  required = false,
  error = null,
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  const options = [{ value: "", text: "" }].concat(items);
  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="col-sm-10">
        <select
          className={classnames("form-select", "form-select-lg", "mb-3", {
            "is-invalid": !!error,
            "is-valid": required && value && !error,
          })}
          value={value}
          onChange={(e) => handleChange(e)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {!!error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
};
export default SelectBox;
