import React from 'react';


export default function SquareCard({ functionality }) {
  return (
    <div className="square-card-container">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <rect x="0" y="0" width="150" height="150" fill="green" />
        <text x="50%" y="50%" textAnchor="middle" fill="white">
          {functionality}
        </text>
      </svg>
    </div>
  );
}
