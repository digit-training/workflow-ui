import "./index.css";
import { state } from "../../constants/demoConfigs/state";
// import { useState } from "react";
import React, { useState } from 'react';
import Form from "../Form";


// export default function Popup() {
//   const [formValues, setFormValues] = useState({});

//   const handleInputChange = (event) => {
//     const { name, value, type } = event.target;
//     const newValue = type === "checkbox" ? event.target.checked : value;

//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: newValue,
//     }));
//   };

//   const getData = () => {
//     console.log(state);
//   }

//   return (
//     <div className="popup-container">
//       <form>
//         {Object.keys(state).map((key) => (
//           <div key={key}>
//             <label>{key}</label>
//             {state[key] === String ? (
//               <input
//                 type="text"
//                 name={key}
//                 value={formValues[key] || ""}
//                 onChange={handleInputChange}
//               />
//             ) : state[key] === Boolean ? (
//               <>
//                 <label>
//                   <input
//                     type="radio"
//                     name={key}
//                     value={true}
//                     checked={formValues[key] === true}
//                     onChange={handleInputChange}
//                   />
//                   True
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name={key}
//                     value={false}
//                     checked={formValues[key] === false}
//                     onChange={handleInputChange}
//                   />
//                   False
//                 </label>
//               </>
//             ) : null}
//           </div>
//         ))}
//         <button
//         onClick={getData}>Click me</button>
//       </form>
//     </div>
//   );
// }


export default function Popup({attribute ,config}){
  const [formData, setFormData] = useState();

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
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