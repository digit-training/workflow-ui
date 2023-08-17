import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DropdownCheckbox from "./components/MultiDropDown";
import YourFormComponent from "./components/MultiDropDown/Test";
import DropdownCheckBox from "./components/MultiDropDown";
// import Popup from "./components/Popup"
// import { state } from "./constants/demoConfigs/state";
// import { role } from "./constants/demoConfigs/roles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <DropdownCheckbox/> */}
    {/* <YourFormComponent/> */}
    {/* <MultiSelectDropdown/> */}
    {/* <Popup config={role}/> */}
  </React.StrictMode>
);


