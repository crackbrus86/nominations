import React from "react";

const CheckBox = ({
  label,
  value,
  onChange
}) => {
  const handleChange = () => {
    onChange(!value);
  };
  return (
    <div className="mb-3 row ps-2">
        <div className="form-check">
            <input className="form-check-input mt-2" type="checkbox" value={value} checked={value} onChange={handleChange} />
            <label className="form-check-label">{label}</label>
        </div>
    </div>
  );
};
export default CheckBox;
