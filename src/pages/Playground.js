import "./Playground.css";
import Card from "../component/card";

export default function Playground() {
  return (
    <div className="playground-container">
      <div className="left-partition">
        <Card/>
      </div>
      <div className="right-partition">
      </div>
    </div>
  );
}
