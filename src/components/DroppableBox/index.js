import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useState } from "react";
import { ItemData } from "../../constants";
import Card from "../Card";


const DropTargetComponent = () => {

    const [states , setState] = useState([]);
    // const [actions , setAction] = useState([]);
    // const [roles , setRole] = useState([]);

    const [{ canDrop, isOver,data }, drop] = useDrop({
      accept: [ItemTypes.Action, ItemTypes.Role,ItemTypes.State],
      drop: (data) => {
        var x = prompt("Please enter the state info");
        var newStates = states;
        newStates.push(x);
        setState(newStates);
      },
      collect: (monitor) => ({
        data : monitor.getItem(),
        canDrop: !!monitor.canDrop(),
        isOver: !!monitor.isOver(),
      }),
    });
  
    return (
      <div className="right-partition" ref={drop} style={{ border: '1px dashed black' }}>
        {canDrop ? 'Release to drop' : 'Drag compatible items here'}
        {
            states.map( (data) => {
                return <Card functionality={data}/>
            })
        }
      </div>
    );
  };
export default DropTargetComponent;