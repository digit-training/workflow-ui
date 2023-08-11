import "./index.css"
import React, { useState } from 'react';

const Form = ({ config, onFormChange }) => {
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

      const [data, setData] =  useState({});

      const saveData = () =>{
        console.log(data);
      }
      
    
      // return (
      //   <div className="form-container">
      //     {Object.keys(config).map((key) => (
      //       <div key={key}>
      //         <label className="label">{formatString(key)}</label><br></br>
      //         {config[key] === String ? (
      //           <input
      //           className="input-container"
      //             type="text"
      //             value={formData[key] || ''}
      //             onChange={(e) => handleChange(key, e.target.value)}
      //           />
      //         ) : config[key] === Boolean ? (
      //           <div>
      //             <label>
      //               <input
      //               className="input-container"
      //                 type="radio"
      //                 value="true"
      //                 checked={formData[key] === true}
      //                 onChange={() => handleChange(key, true)}
      //               />
      //               True
      //             </label>
      //             <label>
      //               <input
      //               className="input-container"
      //                 type="radio"
      //                 value="false"
      //                 checked={formData[key] === false}
      //                 onChange={() => handleChange(key, false)}
      //               />
      //               False
      //             </label>
      //           </div>
      //         ) : null}
      //       </div>
      //     ))}
      //   </div>
      // );
      return (
        <div className="form-container">
          {Object.keys(config).map((key) => (
            <div key={key}>
              <label className="label">{formatString(key)}</label><br />
              {Array.isArray(config[key]) ? (
                <select
                  className="input-container"
                  // value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {config[key].map((option) => (
                    <option key={option.action} value={option.nextState}>
                      {option.action}
                    </option>
                  ))}
                </select>
              ) : config[key] === String ? (
                <input
                  className="input-container"
                  type="text"
                  // value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : config[key] === Boolean ? (
                <div>
                  <label>
                    <input
                      className="input-radio"
                      type="radio"
                      value="true"
                      // checked={formData[key] === true}
                      onChange={() => handleChange(key, true)}
                    />
                    True
                  </label>
                  <label>
                    <input
                      className="input-radio"
                      type="radio"
                      value="false"
                      // checked={formData[key] === false}
                      onChange={() => handleChange(key, false)}
                    />
                    False
                  </label>
                </div>
              ) : null}
            </div>
          ))}
          <button className = "submit-button" onClick={saveData}>Submit</button>
        </div>
      );
      
    
    };

    export default Form;