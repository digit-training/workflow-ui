import React from 'react';


export default function RhombusCard({ functionality }) {
  return (
    <div className="rhombus-card-container">
      <svg width="150" height="150" viewBox="0 0 150 150" style={{borderRadius : "8px"}}>
        <polygon points="75,0 150,75 75,150 0,75" fill="green" stroke='black'/>
        <text x="50%" y="50%" textAnchor="middle" fill="white">
          {functionality}
        </text>
      </svg>
    </div>
  );
}
