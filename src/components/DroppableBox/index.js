import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import { useState } from "react";

const DropTargetComponent = () => {

    const [] = useState();

    const [{ canDrop, isOver }, drop] = useDrop({
      accept: [ItemTypes.Action, ItemTypes.Role,ItemTypes.State],
      drop: (data) => {
        console.log(data);
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
      </div>
    );
  };
export default DropTargetComponent;