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
import {req} from "../../constants/request";

const initialState = {
  states : [],
  actions: [],
  roles  : [],
  droppedElement : null
};

let wfRequest = req;

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
    // console.log("Role action is dispatched\n" + (action.payload));
    const updatedRolesList = action.payload ? [...state.roles , JSON.parse(action.payload)] : state.roles;
    const updatedState = {
      ...state,
      roles : updatedRolesList,
      droppedElement : action.type

    };
    // console.log("Updated states is\n"+JSON.stringify(updatedState));
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
    console.log("SUBMITTED ACTION IS PERFORMED\n");
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
      var wfReq  = localStorage.getItem("wfRequest");
      if(workflowObject)dispatch({type:"RENDERED",payload:workflowObject});
      if(wfReq) wfRequest = wfReq;
      console.log("Fetched the wf Request details from local storage " + wfRequest);
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
  
    const generateWorkflow = () => {
      // console.log("Final state is: "+JSON.stringify(state));
      let wf = {
            tenantId:           "pb",
            businessService:    "DTR",
            business:           "death-services",
            businessServiceSla: 432000000,
            states:             []
      };
      const newState = state.states.map((data)=>{
        let newData = data;
        let actionIdx = parseInt(data["actions"]);
        let currAction = state.actions[actionIdx];
        const roleIdx = currAction ? parseInt(currAction.roles) : null;
        const role = roleIdx!=null ? state.roles[roleIdx] : null;
        let newAction = currAction;
        if(newAction) newAction["roles"] = [role];
        if(newData)   newData["actions"] = [newAction];
        return newData;
      })
      wf.states = newState;
      // if(wf) wfRequest.BusinessServices.push(wf);
      console.log("Final workflow looks something like this: "+JSON.stringify(wfRequest));
      localStorage.setItem("wfRequest",JSON.stringify(wfRequest));
      
      const url = "http://localhost:8282/egov-workflow-v2/egov-wf/businessservice/_create";
      const requestBody = wfRequest;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type
          // Add any other headers as needed
        },
        body: JSON.stringify(requestBody), // Convert the object to JSON
      })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          // Handle the response data
          console.log("Response to the businessservice create api is :", data);
        })
        .catch(error => {
          // Handle errors
          console.error("Error:", error);
        });
      

    }

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
        <button onClick={generateWorkflow}>Save and generate Workflow</button>  
      </div>
    );
  };
export default DropTargetComponent;