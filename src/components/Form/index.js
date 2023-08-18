import "./index.css";
import React, { useState } from "react";
import { requiredFields } from "../../constants/demoConfigs/requiredFields";
import DropdownCheckBox from "../MultiDropDown";

const Form = ({ state, type, dispatch, config, onFormChange }) => {
  const handleChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  function formatString(str) {
    return str
      .split(/(?=[A-Z])|\s|_/)
      .map((word) => {
        if (word.length === 0) return ""; // Handle multiple underscores or spaces
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  const [data, setData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const validateFields = () => {
    // const errors = {};
    Object.keys(config).forEach((key) => {
      if (requiredFields.includes(key) && !data[key]) {
        validationErrors[key] = `${formatString(key)} is required.`;
      }
    });
    setValidationErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Returns true if there are no errors
  };

  const saveData = () => {
    if (validateFields()) {
      console.log("Congratulations Data saved!!!");
      console.log(data);
      onFormChange(data);
    }
    else {
      alert(JSON.stringify(Object.values(validationErrors)));
    }
  };

  return (
    <div className="form-container">
      {Object.keys(config).map((key) => (
        <div key={key}>
          <label className="label">{formatString(key)}</label>
          <br />
          {Array.isArray(config[key]) ? 
          (
            <>
            {console.log(key)}
            {/* WHY KEY AS A PROP IS NOT GETTING INSERTED , SHOWING NULL ?? */}
            <DropdownCheckBox type={key} options={state[key]} handleDropDown={setData} data={data}/>
            </>
          ) 
          : config[key] === String ? (
            <input
              className="input-container"
              type="text"
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ) 
          : config[key] === Number ? (
            <input
              className="input-container"
              type="number"
              min="0"
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )
          : config[key] === Boolean ? (
            <div>
              <label>
                <input
                  className="input-container"
                  type="radio"
                  value="true"
                  name={key}
                  // checked={formData[key] === true}
                  onChange={() => handleChange(key, true)}
                  required
                />
                True
              </label>
              <label>
                <input
                  className="input-container"
                  type="radio"
                  value="false"
                  name={key}
                  // checked={formData[key] === false}
                  onChange={() => handleChange(key, false)}
                />
                False
              </label>
            </div>
          ) 
          : null}
        </div>
      ))}
      <button className="submit-button" onClick={saveData}>Submit</button>
    </div>
  );
};

export default Form;
