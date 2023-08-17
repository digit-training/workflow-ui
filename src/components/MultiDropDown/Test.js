import React, { useState } from "react";
// import DropdownCheckbox from "./DropdownCheckbox";
import DropdownCheckbox from ".";

const YourFormComponent = () => {
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Orange", value: "orange" },
    { label: "Grapes", value: "grapes" },
    { label: "Berry", value: "berry" },
    { label: "Mango", value: "mango" },
    { label: "Banana", value: "banana" },
    { label: "Tomato", value: "tomato" },
  ];

  return (
    <div className="App">
      <h1>Dropdown with Checkboxes</h1>
      <DropdownCheckbox options={options} />
    </div>
  );
};

export default YourFormComponent;
