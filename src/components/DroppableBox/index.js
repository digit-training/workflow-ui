import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useEffect, useState, useReducer } from "react";
import { ItemData } from "../../constants";
import Card from "../Card";
import WrapperCard from "../Card/WrapperCard";
import "./index.css"

const initialState = {
  states: [],
  actions: [],
  roles: [],
};

const reducer = (state, action) => {
  console.log(action.type);
  if (action.type === "State") {
    // console.log(action.payload);
    return {
      ...state,
      states: [...state.states, JSON.parse(action.payload)]
    };
  }
  else if (action.type === "Action") {
    return {
      ...state,
      actions: [...state.actions, JSON.parse(action.payload)]
    };
  }
  else if (action.type === "Role") {
    return {
      ...state,
      roles: [...state.roles, JSON.parse(action.payload)]
    };
  }
  else if (action.type === "RENDERED") {
    console.log("Setting the state ot value stored in local storage");
    var obj = JSON.parse(action.payload);
    // action.payload is String Parse it then store it
    // console.log("The value stored in Local Storage is"+typeof action.payload);
    // console.log("My current state is"+JSON.stringify(state) );
    return obj;
  }
  else {
    return state;
  }
}

const DropTargetComponent = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // this will fire then component will render or vice versa ?
  useEffect(() => {

    var workflowObject = localStorage.getItem("wf");
    // console.log(workflowObject)
    if (workflowObject) dispatch({ type: "RENDERED", payload: workflowObject });

  }, [])


  const [{ canDrop, data, type }, drop] = useDrop({
    accept: [ItemTypes.Action, ItemTypes.Role, ItemTypes.State],
    drop: () => {

      dispatch({ type: type, payload: JSON.stringify(data) });
      // console.log(JSON.stringify(state));
      localStorage.setItem("wf", JSON.stringify(state));

    },
    collect: (monitor) => ({
      data: monitor.getItem(),
      type: monitor.getItemType(),
      canDrop: !!monitor.canDrop(),
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="right-partition" ref={drop} >
      {/* <h3>{canDrop ? 'Release to drop' : 'Drag compatible items here'}</h3> */}
      <div className="column state">
        <h2>States</h2>
      {
        state["states"].map((data) => {
          return <WrapperCard functionality={data.state} />
        })
      }
      </div>
      <div className="column action">
        <h2>Actions</h2>
      {
        state["actions"].map((data) => {
          return <WrapperCard functionality={data.action} />
        })
      }
      </div>
      <div className="column role">
        <h2>Roles</h2>
      {
        state["roles"].map((data) => {
          return <WrapperCard functionality={data.role} />
        })
      }
      </div>
    </div>
  );




};
export default DropTargetComponent;