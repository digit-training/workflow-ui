import React, { useState } from 'react';
import "./index.css"

const DropdownCheckBox = ({options}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(prevVisible => !prevVisible);
  };

  // const options = [
  //     { label: "Apple", value: "apple" },
  //     { label: "Orange", value: "orange" },
  //     { label: "Grapes", value: "grapes" },
  //     { label: "Berry", value: "berry" },
  //     { label: "Mango", value: "mango" },
  //     { label: "Banana", value: "banana" },
  //     { label: "Tomato", value: "tomato" }
  //   ]

  return (
    <div className={`dropdown-check-list ${isVisible ? 'visible' : ''}`} tabIndex="100">
      <span className="anchor" onClick={toggleVisible}>Select Fruits</span>
      <ul className="items">
        {
          options.map((data) => (
            <li><input type="checkbox" />{data.action}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default DropdownCheckBox;
