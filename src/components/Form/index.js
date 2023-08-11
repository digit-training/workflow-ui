import "./index.css"
import React from 'react';

const Form = ({ config, formData, onFormChange }) => {
    const handleChange = (key, value) => {
        const updatedData = { ...formData, [key]: value };
        onFormChange(updatedData);
      };
    
      return (
        <div className="form-container">
          {Object.keys(config).map((key) => (
            <div key={key}>
              <label>{key}</label><br></br>
              {config[key] === String ? (
                <input
                  type="text"
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : config[key] === Boolean ? (
                <div>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      checked={formData[key] === true}
                      onChange={() => handleChange(key, true)}
                    />
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="false"
                      checked={formData[key] === false}
                      onChange={() => handleChange(key, false)}
                    />
                    False
                  </label>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      );
    };

    export default Form;