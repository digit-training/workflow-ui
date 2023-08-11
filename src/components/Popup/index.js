import "./index.css";
import { state } from "../../constants/demoConfigs/state";
// import { useState } from "react";
import React, { useState } from 'react';
import Form from "../Form";

export default function Popup({attribute ,config , handleSubmit}){
  const [formData, setFormData] = useState();

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
    // set to reducer as well
    handleSubmit({type: attribute, payload : JSON.stringify(formData)});
    // change the 
  };

  return (
    <div className="custom-popup">
      <div className="popup-content">
      <h1>{attribute}</h1>
      <Form config = {config} formData={state} onFormChange={handleFormChange} />
      </div>
    </div>
  );
};