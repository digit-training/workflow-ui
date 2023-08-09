import "./index.css"

export default function Card({functionality}) {
    return (
      <div className="card-container">
        <h3>{functionality}</h3>
      </div>
    );
}