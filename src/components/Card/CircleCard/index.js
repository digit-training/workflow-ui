import React from 'react';


export default function CircleCard({ functionality }) {
  return (
    <div className="circle-card-container">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="70" fill="purple" />
        <text x="50%" y="50%" textAnchor="middle" fill="white">
          {functionality}
        </text>
      </svg>
    </div>
  );
}
