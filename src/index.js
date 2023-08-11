import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Popup from "./components/Popup"
import { state } from "./constants/demoConfigs/state";
// import { role } from "./constants/demoConfigs/roles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Popup attribute= {"State"} config={state}/>
  </React.StrictMode>
);


