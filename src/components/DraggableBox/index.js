import { useDrag } from "react-dnd";
import { ItemTypes,ItemData} from "../../constants";
import Card from "../Card";
// import WrapperCard from "../Card/WrapperCard";
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
        <Card functionality={text}/>
      </div>
    );
  };
  
  export default DraggableBox;