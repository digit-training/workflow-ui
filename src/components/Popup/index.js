import "./index.css";
import { state } from "../../constants/demoConfigs/state";
// import { useState } from "react";
import React, { useState } from 'react';
import Form from "../Form";

export default function Popup({type,attribute ,config , dispatch}){

  const [formData, setFormData] = useState({});

  const handleFormChange = (updatedData) => {

    // set to reducer as well
    setFormData(updatedData);
    console.log("Form is submitted !!!");
    console.log(attribute,formData , JSON.stringify(updatedData))
    dispatch({type: attribute, payload : JSON.stringify(updatedData)});
    dispatch({type: "SUBMITTED", payload : ""});
    // change the 
  };

  return (
    <div className="custom-popup">
      <div className="popup-content">
      <h1>Add {attribute}</h1>
      <Form type={type} dispatch = {dispatch} config = {config} formData={state} onFormChange={handleFormChange} />
      </div>
    </div>
  );
};