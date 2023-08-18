import React, { useState } from 'react';
import "./index.css"

const DropdownCheckBox = ({options ,key , handleDropDown}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [arr, setArr] = useState([]);
  const toggleVisible = () => {
    setIsVisible(prevVisible => !prevVisible);
  };
  const handleMultiSelect = (e) => {
    
    let val = parseInt(e.target.value);
    let isChecked = e.target.checked;
    let newArr = [];
    
    if(isChecked){
      newArr = [...arr,val];
    }
    else{
      for(let i=0;i<arr.length;i++){
        if(arr[i] !== val){
          newArr.push(arr[i]);
        }
      }
    }
    setArr(newArr);

  }

  return (
    <div className={`dropdown-check-list ${isVisible ? 'visible' : ''}`} tabIndex="100">
      <span className="anchor" onClick={toggleVisible}>Select Fruits</span>
      <ul className="items">
        {
          options.map((data,index) => (
            <li>
              <input type="checkbox" value={index} onChange={(e)=>{handleMultiSelect(e)}} />
              {console.log(key)}
              { key === "actions" ? data.action : data.roles}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default DropdownCheckBox;
