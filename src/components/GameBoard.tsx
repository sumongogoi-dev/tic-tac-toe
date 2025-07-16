import React from 'react';
import { GameSquare } from './GameSquare';
import { Player } from '../types/game';

interface GameBoardProps {
  board: (Player | null)[];
  onSquareClick: (index: number) => void;
  winningLine?: number[] | null;
  isGameOver: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  onSquareClick, 
  winningLine, 
  isGameOver 
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-xl shadow-lg">
      {board.map((value, index) => (
        <GameSquare
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index)}
          isDisabled={isGameOver || value !== null}
        />
      ))}
    </div>
  );
};
