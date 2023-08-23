import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useEffect, useState,useReducer } from "react";
import { TypeConfigMap } from "../../constants";
import WrapperCard from "../Card/WrapperCard";
import Popup from "../Popup";
import {req} from "../../constants/request";

import './index.css';

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

    useEffect(()=>{
      var workflowObject = localStorage.getItem("wf");
      if(workflowObject)dispatch({type:"RENDERED",payload:workflowObject});
      console.log("Fetched the wf Request details from local storage " + wfRequest);
      dispatch({type: "SUBMITTED", payload : ""});

    },[])


    const [{ canDrop,data,type }, drop] = useDrop({
      accept: [ItemTypes.Action, ItemTypes.Role,ItemTypes.State],
      drop: () => {

        dispatch({type:type , payload : null });   // this is the reason of having null in the workflow

      },
      collect: (monitor) => ({
        data : monitor.getItem(),
        type : monitor.getItemType(),
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    });
    // TODO: Write a WorkFlow validator to log errors in wf
    const generateWorkflow = () => {
      // console.log("Final state is: "+JSON.stringify(state));

      // TODO : Shift this to constants
      let wf = {
            tenantId:           "pb",
            businessService:    "WF_PLAYGROUND",
            business:           "death-services",
            businessServiceSla: 432000000,
            states:             []
      };
      
      // shift this to utils
      let newState = state.states.map((data)=>{
        let newData = data;
        // check and iterate over actions array
        let newActions = [];
        if(data["actions"]){

          newActions = data["actions"].map((actionIdx)=>{
            console.log(actionIdx);
            // roles array
            let newRoles = state.actions[actionIdx]["roles"].map((roleIdx) => {
              let currRole =  state.roles[roleIdx]["roles"];
              return currRole;
            })
            
            // set roles array
            let newAction = state.actions[actionIdx];
            if(newAction) newAction["roles"] = newRoles;
            return newAction;
            
          })
        }

        if(newData)   newData["actions"] = newActions;
        return newData;
      })

      wf.states = newState;
      if(wf) wfRequest.BusinessServices.push(wf);
      console.log("Final workflow looks something like this: "+JSON.stringify(wfRequest));
      localStorage.setItem("wfRequest",JSON.stringify(wfRequest));
      
      const url = "/egov-workflow-v2/egov-wf/businessservice/_create";
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
      <div className="right-partition" ref={drop} >
        {/* {canDrop ? 'Release to drop' : 'Drag compatible items here'} */}
        {
        state.droppedElement!=null ? <Popup state={state} type={state.droppedElement} dispatch={dispatch} attribute={state.droppedElement} config={TypeConfigMap[state.droppedElement]}/>: <></>
        }
        <>
        <div className="cloumn state">
        <h2>STATES</h2>
        {
          state["states"].map((data)=>{
            return data ? <WrapperCard functionality={data.state} type={ItemTypes.State}/> : <></>
          })
        }
        </div>
        <div className="cloumn action">
        <h2>ACTIONS</h2>
        {
          state["actions"].map((data)=>{
            return data ? <WrapperCard functionality={data.action} type={ItemTypes.Action}/> : <></>
          })
        }
        </div>
        <div className="cloumn role">
        <h2>ROLES</h2>
        {
          state["roles"].map((data)=>{
            return (data) ? <WrapperCard functionality={data.roles} type={ItemTypes.Role}/> : <></>
          })
        }
        </div>
        {/* {console.log("My final state is"+ JSON.stringify(state) )} */}
        </>
          <div className="submit-bar">
          <button onClick={generateWorkflow}>Save and generate Workflow</button>  
          </div>
      </div>
    );
  };
export default DropTargetComponent;