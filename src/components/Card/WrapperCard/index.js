import React from 'react';
import CircleCard from '../CircleCard';
import SquareCard from '../SquareCard';
import RhombusCard from '../RhombusCard';
import TriangleCard from '../TriangleCard';
import RectangleCard from '../RectangleCard';
import { ItemTypes } from '../../../constants';
  const WrapperCard = ({functionality, type }) => {
    let cardComponent;
    switch (type) {
      case ItemTypes.Role:
        cardComponent = <RectangleCard functionality={functionality} />;
        break;
      case ItemTypes.State:
        cardComponent = <RhombusCard functionality={functionality} />;
        break;
      case ItemTypes.Action:
        cardComponent = <SquareCard functionality={functionality} />;
        break;
      default:
        cardComponent = <CircleCard functionality={functionality} />;
    }
  return (
    <div className="wrapper-card">
      {cardComponent}
    </div>
  );
};
export default WrapperCard;