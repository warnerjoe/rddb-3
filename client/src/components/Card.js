import React from 'react';

const Card = ({ card }) => {
  const getBackgroundColor = () => {
    const types = card.cardType;
  
    // Define colors for each type
    const colorMap = {
      Maneuver: 'yellow-200',
      Reversal: 'red-200',
      Action: 'blue-200',
      Superstar: 'green-200',
    };
  
    // Handle gradient for cards with two types
    if (types.length > 1) {
      const firstColor = `from-${colorMap[types[0]]}`;
      const secondColor = `to-${colorMap[types[1]]}`;
      return `bg-gradient-to-r ${firstColor} ${secondColor}`;
    }
  
    // Return single color for cards with one type
    return `bg-${colorMap[types[0]]}` || 'bg-gray-200'; // Default to gray if type not found
  };
  
  

  // Determines card type
  const formatCardType = () => {
    const cardTypeText = card.cardType.map((type) => {
      // If card type is maneuver, instead display the Maneuver Type
      if (type === 'Maneuver') {
        return card.maneuverType;
      // If the card type is Reversal, display : Reversal Type after the word reversal
      } else if (type === 'Reversal') {
        return 'Reversal: ' + card.reversalType;
      } else {
        return type;
      }
    }).join(' / '); // If it's a hybrid

    if (card.subType && card.subType.length > 0) {
      return `${cardTypeText} : ${card.subType.join(': ')}`;
    } else {
      return cardTypeText;
    }
  };

  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg p-4 ${getBackgroundColor()}`}>
    {/* Card Name */}
    <div className="font-bold text-xl mb-2">
      {card.name}
    </div>

      {/* Card Type */}
      <p className="text-gray-700 text-base">
        {formatCardType()}
      </p>

      {/* Fortitude */}
      <p className="text-gray-700 text-base mt-2">
        Fortitude: {card.fortitude}
      </p>

      {/* Card Image */}
      <img className="w-full" src="https://media.bleacherreport.com/image/upload/w_800,h_533,c_fill/v1696219301/udsc6iawctp8ygwfvebn.jpg" alt={`the ${card.name} card.`} />

      {/* Card Text */}
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base mt-2">
          {card.cardText}
        </p>

        {/* Flavor Text */}
        <p className="text-gray-700 text-base mt-2">
          {card.flavorText}
        </p>
      </div>

      {/* Damage */}
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Damage: {card.damage}</span>
      </div>
    </div>
  );
};

export default Card;
