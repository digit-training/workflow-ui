import React from 'react';


export default function DiamondCard({ functionality }) {
  return (
    <div className="diamond-card-container">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <polygon points="75,0 150,75 75,150 0,75" fill="orange" />
        <text x="50%" y="50%" textAnchor="middle" fill="white">
          {functionality}
        </text>
      </svg>
    </div>
  );
}
