import React from 'react';
import { Player } from '../types/game';
import { Trophy, Users } from 'lucide-react';

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  isGameOver: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
  isDraw,
  isGameOver
}) => {
  const getStatusMessage = () => {
    if (winner) {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <Trophy size={20} />
          Player {winner} Wins!
        </div>
      );
    }
    
    if (isDraw) {
      return (
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={20} />
          It's a Draw!
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 text-gray-700">
        <Users size={20} />
        Player {currentPlayer}'s Turn
      </div>
    );
  };

  return (
    <div className="text-center py-4">
      <div className="text-xl font-semibold">
        {getStatusMessage()}
      </div>
      {isGameOver && (
        <div className="mt-2 text-sm text-gray-500">
          Click "Reset Game" to play again
        </div>
      )}
    </div>
  );
};
