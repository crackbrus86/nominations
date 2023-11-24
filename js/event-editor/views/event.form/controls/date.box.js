import React from "react";
import "../../../../../styles/react-datetime.css";
import DateTime from "react-datetime";
import moment from "moment";
import classnames from "classnames";

const DateBox = ({
  label,
  value,
  onChange,
  required = false,
  error = null,
}) => {
  const handleChange = (val) => {
    const nextValue =
      !!val && moment.isMoment(val) && moment(val).isValid()
        ? new Date(val)
        : null;
    onChange(nextValue);
  };
  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="col-sm-10">
        <DateTime
          value={value}
          dateFormat="DD/MM/YYYY"
          inputProps={{
            placeholder: "дд/мм/рррр",
            className: classnames("form-control", {
              "is-invalid": !!error,
              "is-valid": required && value && !error,
            })
          }}
          timeFormat={false}
          onChange={(v) => handleChange(v)}
          closeOnSelect={true}
        />
        {!!error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
};
export default DateBox;
