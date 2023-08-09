import { useDrag } from "react-dnd";
import { ItemTypes,ItemData} from "../../constants";
import Card from "../Card";

const DraggableBox = ({ id, text }) => {

    const [{ isDragging }, drag, preview] = useDrag({
      type: ItemTypes[`${text}`], // Specify the item type
      item: ItemData[`${text}`],  // Data to be transferred during drag-and-drop
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    return (
      <div ref={(node) => preview(drag(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {/* {console.log(ItemTypes[`${text}`])} */}
        <Card functionality={text}/>
      </div>
    );
  };
  
  export default DraggableBox;