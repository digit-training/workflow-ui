import React, { useState } from 'react';
import "./index.css"

const DropdownCheckBox = ({options}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [arr, setArr] = useState([]);
  const toggleVisible = () => {
    setIsVisible(prevVisible => !prevVisible);
  };
  const handleMultiSelect = (e) => {
    // arr.push(e.target.value);
    let val = parseInt(e.target.value);
    let isChecked = e.target.checked;
    // console.log(val);
    let newArr = [];
    if(isChecked){
      newArr = [...arr,val];
    }
    else{
      // let newArr = [];
      for(let i=0;i<arr.length;i++){
        if(arr[i] !== val){
          newArr.push(arr[i]);
        }
      }
    }
    setArr(val + "==>"+newArr);
    // check if selected or unselected then accordingly manipulate the array.
    console.log(arr);
  }
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
          options.map((data,index) => (
            <li><input type="checkbox" value={index} onChange={(e)=>{handleMultiSelect(e)}} />{data.label}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default DropdownCheckBox;
