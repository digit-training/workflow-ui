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
  // console.log(action.type,action.payload) ;
  if(action.type === "State")
  {
    const updatedStateList = action.payload ? [...state.states , JSON.parse(action.payload)] : state.states;     // to handle the null payload
    const updatedState= {
      ...state,
      states : updatedStateList,
      droppedElement : action.type
    };
    localStorage.setItem("wf",JSON.stringify(updatedState));
    return updatedState;
  }
  else if(action.type === "Action")
  {
    const updatedActionsList = action.payload ? [...state.actions , JSON.parse(action.payload)] : state.actions;  // to handle the null payload
    const updatedState = {
      ...state,
      actions : updatedActionsList,
      droppedElement : action.type

    };
    localStorage.setItem("wf",JSON.stringify(updatedState));
    return updatedState;
  }
  else if(action.type === "Role")
  {
    console.log("Role action is dispatched\n" + (action.payload));
    const updatedRolesList = action.payload ? [...state.roles , JSON.parse(action.payload)] : state.roles;
    const updatedState = {
      ...state,
      roles : updatedRolesList,
      droppedElement : action.type

    };
    console.log("Updated states is\n"+JSON.stringify(updatedState));
    localStorage.setItem("wf",JSON.stringify(updatedState));
    return updatedState;

  }
  else if(action.type === "RENDERED")
  {
    console.log("local storage state synced up\n");
    var obj = JSON.parse(action.payload);
    return obj;
  }
  else if(action.type === "SUBMITTED")
  {
    console.log("SUBMITTED ACTION IS PERFORMED\n"+JSON.stringify(state));
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
      dispatch({type: "SUBMITTED", payload : ""});

      // set the droppedElement to null here
    },[])


    const [{ canDrop,data,type }, drop] = useDrop({
      accept: [ItemTypes.Action, ItemTypes.Role,ItemTypes.State],
      drop: () => {

        dispatch({type:type , payload : null });   // this is the reason of having null in the workflow
        // localStorage.setItem("wf",JSON.stringify(state));
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
        state.droppedElement!=null ? <Popup state={state} type={state.droppedElement} dispatch={dispatch} attribute={state.droppedElement} config={TypeConfigMap[state.droppedElement]}/>: 
        <>
        {
          state["states"].map((data)=>{
            return data ? <SquareCard functionality={data.state}/> : <></>
              // return <WrapperCard functionality={data.state}/>
          })
        }
        {
          state["actions"].map((data)=>{
            return data ? <TriangleCard functionality={data.action}/> : <></>
            // return <WrapperCard functionality={data.action}/>
          })
        }
        {
          state["roles"].map((data)=>{
            return (data) ? <CircleCard functionality={data.roles}/> : <></>
            // return <WrapperCard functionality={data.role}/>
          })
        }
        {/* {console.log("My final state is"+ JSON.stringify(state) )} */}
        </>
        }      
      </div>
    );
  };
export default DropTargetComponent;