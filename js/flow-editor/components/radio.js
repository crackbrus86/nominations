import React from "react";
import './radio.scss';

const Radio = ({ options, value, name, onChange }) => {
  return (
    <div className="custom-radio">
      {options.map((option, index) => (
        <div className="form-check mb-1 custom-radio__item" key={index}>
          <input
            className="form-check-input"
            value={option.value}
            checked={option.value === value}
            type="radio"
            name={name}
            id={`${name}1`}
            onChange={() => onChange(option.value)}
          />
          <label className="form-check-label" htmlFor={`${name}1`}>
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
