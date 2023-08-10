import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useEffect, useState,useReducer } from "react";
import { ItemData } from "../../constants";
import Card from "../Card";
import WrapperCard from "../Card/WrapperCard";
import CircleCard from "../Card/CircleCard";
import DiamondCard from "../Card/RhombusCard";
import SquareCard from "../Card/SquareCard";
import TriangleCard from "../Card/TriangleCard";

const initialState = {
  states : [],
  actions: [],
  roles  : [],
};

const reducer = (state,action) => {
  console.log(action.type,action.payload);
  if(action.type === "State")
  {
    // console.log(action.payload);
    return {
      ...state,
      states : [...state.states , JSON.parse(action.payload)]
    };
  }
  else if(action.type === "Action")
  {
    return {
      ...state,
      actions : [...state.actions , JSON.parse(action.payload)]
    };
  }
  else if(action.type === "Role")
  {
    return {
      ...state,
      roles : [...state.roles , JSON.parse(action.payload)]
    };
  }
  else
  {
    console.log("No handler for this type is found in our code");
    return state;
     // for start and end type
  }
}

const DropTargetComponent = () => {

    const [state,dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{

      var workflowObject = localStorage.getItem("wf");
      dispatch({type:"TYPE",payload:workflowObject});
      
    },[])


    const [{ canDrop,data,type }, drop] = useDrop({
      accept: [ItemTypes.Action, ItemTypes.Role,ItemTypes.State],
      drop: () => {

        dispatch({type:type , payload : JSON.stringify(data) });
        localStorage.setItem("wf",JSON.stringify(state));

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
            // Object.keys(state).forEach((key)=>{
            //   console.log(state[key]);
            // })
            // Object.keys(state).forEach((key)=>{
            //   state[key].map((data) => {
            //     console.log(key === "states")
            //     if(key === "states") return <DiamondCard functionality={data["state"]}/>
            //     else if(key === "actions") return <TriangleCard functionality={data["action"]}/>
            //     else return <CircleCard functionality={data["role"]}/>
            //   });
            // })
         }
        {/* {
            states.map( (data,index) => {
                return <CircleCard key={index} functionality={data} />
                // return <Card key = {index} functionality={data}/>
                //  return <DiamondCard key={index} functionality={data}/>
            })
        } */}
      </div>
    );
  };
export default DropTargetComponent;