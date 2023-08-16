import React from 'react';


export default function RectangleCard({ functionality }) {
  return (
    <div className="rectangle-card-container">
      <svg width="200" height="50" viewBox="0 0 200 50" style={{borderRadius : "8px"}}>
        <rect x="0" y="0" width="200" height="50" fill="purple" stroke='black'/>
        <text x="50%" y="50%" textAnchor="middle" fill="white">
          {functionality}
        </text>
      </svg>
    </div>
  );
}
