import React from "react";

import { useEventForm } from "./event.form.context";
import TextBox from "./controls/text.box";
import CheckBox from "./controls/check.box";

const GenderConfig = () => {
  const { genderConfig, setMale, setFemale, errors } = useEventForm();

  return (
    <React.Fragment>
      <h5>Налаштування змагання для чоловіків та жінок</h5>
      <div className="row">
        <div className="col-md-8">
          <TextBox
            value={genderConfig.male.title}
            readOnly={genderConfig.male.auto}
            label="Назва (Чоловіки)"
            onChange={(v) => setMale({ ...genderConfig.male, title: v })}
            required
            error={errors.maleTitle}
          />
        </div>
        <div className="col-md-4">
          <CheckBox
            value={genderConfig.male.auto}
            label="Авто"
            onChange={(v) => setMale({ ...genderConfig.male, auto: v })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <TextBox
            value={genderConfig.female.title}
            label="Назва (Жінки)"
            readOnly={genderConfig.female.auto}
            onChange={(v) => setFemale({ ...genderConfig.female, title: v })}
            required
            error={errors.femaleTitle}
          />
        </div>
        <div className="col-md-4">
          <CheckBox
            value={genderConfig.female.auto}
            label="Авто"
            onChange={(v) => setFemale({ ...genderConfig.female, auto: v })}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default GenderConfig;
