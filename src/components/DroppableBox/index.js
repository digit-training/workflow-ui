import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useEffect, useState,useReducer } from "react";
import { TypeConfigMap } from "../../constants";
import { ItemData } from "../../constants";
import Card from "../Card";
import WrapperCard from "../Card/WrapperCard";
import Popup from "../Popup";
import CircleCard from "../Card/CircleCard";
import DiamondCard from "../Card/RhombusCard";
import SquareCard from "../Card/SquareCard";
import TriangleCard from "../Card/TriangleCard";

const initialState = {
  states : [],
  actions: [],
  roles  : [],
  droppedElement : null
};

const reducer = (state,action) => {
  console.log(action.type);
  if(action.type === "State")
  {
    return {
      ...state,
      states : [...state.states , JSON.parse(action.payload)],
      droppedElement : action.type
    };
  }
  else if(action.type === "Action")
  {
    return {
      ...state,
      actions : [...state.actions , JSON.parse(action.payload)],
      droppedElement : action.type

    };
  }
  else if(action.type === "Role")
  {
    return {
      ...state,
      roles : [...state.roles , JSON.parse(action.payload)],
      droppedElement : action.type

    };
  }
  else if(action.type === "RENDERED")
  {
    console.log("Setting the state ot value stored in local storage");
    var obj = JSON.parse(action.payload);
    return obj;
  }
  else
  {
    return {
      ...state,
      droppedElement : null
    };
  }
}

const DropTargetComponent = () => {

    const [state,dispatch] = useReducer(reducer,initialState);

    // this will fire then component will render or vice versa ?
    useEffect(()=>{

      var workflowObject = localStorage.getItem("wf");
      if(workflowObject)dispatch({type:"RENDERED",payload:workflowObject});
      
    },[])


    const [{ canDrop,data,type }, drop] = useDrop({
      accept: [ItemTypes.Action, ItemTypes.Role,ItemTypes.State],
      drop: () => {

        dispatch({type:type , payload : JSON.stringify(data) });
        localStorage.setItem("wf",JSON.stringify(state));
        // another state for popUP
        // reset the state to null again 
      },
      collect: (monitor) => ({
        data : monitor.getItem(),
        type : monitor.getItemType(),
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    });
  
    return (
      <div className="right-partition" ref={drop} style={{ border: '1px dashed black' }}>
        {canDrop ? 'Release to drop' : 'Drag compatible items here'}
        {
        state.droppedElement!=null ? <Popup handleSubmit={dispatch} attribute={state.droppedElement} config={TypeConfigMap[state.droppedElement]}/>: 
        <>
        {
          state["states"].map((data)=>{
              return <WrapperCard functionality={data.state}/>
          })
        }
        {
          state["actions"].map((data)=>{
            return <WrapperCard functionality={data.action}/>
          })
        }
        {
          state["roles"].map((data)=>{
            return <WrapperCard functionality={data.role}/>
          })
        }
        </>
        }      
      </div>
    );
  };
export default DropTargetComponent;