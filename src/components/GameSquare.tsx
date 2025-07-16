import React from 'react';
import { Player } from '../types/game';

interface GameSquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning?: boolean;
  isDisabled: boolean;
}

export const GameSquare: React.FC<GameSquareProps> = ({ 
  value, 
  onClick, 
  isWinning = false,
  isDisabled 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-20 h-20 md:w-24 md:h-24 
        border-2 border-gray-200 
        rounded-lg 
        text-2xl md:text-3xl 
        font-bold 
        transition-all 
        duration-200 
        ${!isDisabled && !value ? 'hover:bg-gray-50 hover:border-blue-300 hover:scale-105' : ''}
        ${isWinning ? 'bg-green-100 border-green-400' : 'bg-white'}
        ${value === 'X' ? 'text-blue-600' : ''}
        ${value === 'O' ? 'text-red-500' : ''}
        ${!isDisabled && !value ? 'cursor-pointer' : 'cursor-default'}
        active:scale-95
      `}
    >
      {value}
    </button>
  );
};
