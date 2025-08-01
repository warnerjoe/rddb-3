'use client'

import React from 'react';
import Image from 'next/image';

const Card = ({ card }) => {
  const colorMap = {
    Maneuver: '#fde047', // yellow-300
    Reversal: '#f87171', // red-400
    Action: '#60a5fa', // blue-400
    Superstar: '#4ade80', // green-400
  };

  const getBackgroundStyle = () => {
    const types = card.cardType;
  
    if (types.length > 1) {
      const color1 = colorMap[types[0]] || '#d1d5db';
      const color2 = colorMap[types[1]] || '#d1d5db';
      return {
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
      };
    }
  
    const singleColor = colorMap[types[0]] || '#d1d5db';
    return {
      backgroundColor: singleColor
    };
  };

  const getManeuverTypeColor = (maneuverType) => {
    if (maneuverType === 'Trademark Finisher') return '#ffffff'; // white
    if (maneuverType === 'Strike') return '#fde047'; // yellow
    if (maneuverType === 'Grapple') return '#4ade80'; // green
    if (maneuverType === 'Submission') return '#a855f7'; // purple
    if (maneuverType === 'High Risk') return '#fb923c'; // orange
    return '#fde047'; // default yellow
  };

  const renderTypeText = () => {
    const types = card.cardType;
    const parts = [];
    
    // Handle each card type
    types.forEach((type, index) => {
      if (index > 0) {
        parts.push(<span key={`separator-${index}`} style={{color: '#ffffff'}}> / </span>);
      }
      
      if (type === 'Maneuver' && card.maneuverType) {
        const maneuverColor = getManeuverTypeColor(card.maneuverType);
        parts.push(
          <span key={`maneuver-${index}`} style={{color: maneuverColor}}>{card.maneuverType}</span>
        );
      } else if (type === 'Reversal') {
        parts.push(
          <span key={`reversal-${index}`} style={{color: colorMap[type] || '#d1d5db'}}>Reversal</span>
        );
        parts.push(
          <span key={`reversal-type-${index}`} style={{color: '#ffffff'}}>: {card.reversalType || 'Special'}</span>
        );
      } else {
        parts.push(
          <span key={`type-${index}`} style={{color: colorMap[type] || '#d1d5db'}}>{type}</span>
        );
      }
    });
    
    // Add subtypes in white
    if (card.subType && card.subType.length > 0) {
      parts.push(
        <span key="subtypes" style={{color: '#ffffff'}}>: {card.subType.join(': ')}</span>
      );
    }
    
    return parts;
  };

  return (
    <div className="relative rounded-lg" style={{...getBackgroundStyle(), width: '300px', height: '420px'}}>
      <div className="border-8 border-black h-full flex flex-col rounded-lg overflow-hidden">
        {/* Header with name, type line, and fortitude */}
        <div className="flex px-3 pt-2 pb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-black pb-1">{card.name}</h3>
            <div className="bg-black px-2 py-1 mr-2">
              <p className="text-sm font-bold">{renderTypeText()}</p>
            </div>
          </div>
          <div className="text-center py-1 flex flex-col justify-center">
            <div className="text-xs text-black font-bold">Fortitude</div>
            <div className="text-2xl font-bold text-black">{card.fortitude}</div>
          </div>
        </div>

        {/* Image Section - metallic border effect */}
        <div className="px-3">
          <div className="relative h-32 bg-gray-800 p-1 rounded-sm" style={{
            background: 'linear-gradient(145deg, #e0e0e0, #888888)',
            boxShadow: 'inset 2px 2px 3px rgba(255,255,255,0.6), inset -2px -2px 3px rgba(0,0,0,0.6)'
          }}>
            <div className="relative h-full bg-black">
              <Image 
                fill
                sizes="300px"
                src="https://media.bleacherreport.com/image/upload/w_800,h_533,c_fill/v1696219301/udsc6iawctp8ygwfvebn.jpg" 
                alt={`${card.name} card`}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card Text - fills remaining space with damage box positioned absolutely */}
        <div className="px-3 py-2 flex-1 relative">
          <div className="pr-20">
            <p className="text-xs leading-tight text-black">{card.cardText}</p>
            {card.flavorText && (
              <p className="text-xs italic text-black mt-2">"{card.flavorText}"</p>
            )}
          </div>
          
          {/* Damage box - absolutely positioned in bottom right */}
          <div className="absolute bottom-2 right-3 bg-black text-white px-3 py-1 text-center">
            <div className="text-xs font-bold">Damage</div>
            <div className="text-2xl font-bold">{card.damage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;