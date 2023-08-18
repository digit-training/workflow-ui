import React, { useState } from 'react';
import "./index.css"

const DropdownCheckBox = ({options ,type , handleDropDown , data}) => {
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
    console.log("Current Key is: " + type);
    handleDropDown({...data,[type]:newArr}); // set the state of parent here for drop down
  }

  return (
    <div className={`dropdown-check-list ${isVisible ? 'visible' : ''}`} tabIndex="100">
      <span className="anchor" onClick={toggleVisible}>Select Items</span>
      <ul className="items">
        {
          options.map((data,index) => (
            <li>
              <input type="checkbox" value={index} onChange={(e)=>{handleMultiSelect(e)}} />
              {/* {console.log(type)} */}
              { type === "actions" ? data.action : data.roles}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default DropdownCheckBox;
