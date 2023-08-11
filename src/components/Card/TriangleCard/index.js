import React from 'react';



export default function TriangleCard({ functionality }) {
  return (
    <div className="triangle-card-container">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <polygon points="75,0 150,150 0,150" fill="rgb(7,91,130)" stroke='black' />
        <text x="50%" y="50%" textAnchor="middle" fill="white">
          {functionality}
        </text>
      </svg>
    </div>
  );
}
