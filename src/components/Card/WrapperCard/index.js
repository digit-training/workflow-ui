import React from 'react';
import CircleCard from '../CircleCard'; 
import SquareCard from '../SquareCard'; 
import RhombusCard from '../RhombusCard'; 
import TriangleCard from '../TriangleCard'; 
import './index.css'

const WrapperCard = ({functionality }) => {
  let cardComponent;

  switch (functionality.toLowerCase()) {
    case 'role':
      cardComponent = <CircleCard functionality={functionality} />;
      break;
    case 'state':
      cardComponent = <SquareCard functionality={functionality} />;
      break;
    case 'action':
      cardComponent = <TriangleCard functionality={functionality} />;
      break;
    default:
      cardComponent = <RhombusCard functionality={functionality} />;
  }

  return (
    <div className="wrapper-card">
      {cardComponent}
    </div>
  );
};

export default WrapperCard;
