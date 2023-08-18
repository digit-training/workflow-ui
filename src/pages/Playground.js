import "./Playground.css";
import DraggableBox from "../components/DraggableBox";
import DropTargetComponent from "../components/DroppableBox";

export default function Playground() {
  return (
    <div className="playground-container">
      <div className="left-partition">
        <DraggableBox id={1} text={"State"}/>
        <DraggableBox id={2} text={"Action"}/>
        <DraggableBox id={2} text={"Role"}/>
        {/* <DraggableBox id={2} text={"Status"}/> */}
      </div>
      <DropTargetComponent/>
    </div>
  );
}
