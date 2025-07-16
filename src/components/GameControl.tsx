import React from 'react';
import { GameMode } from '../types/game';
import { RotateCcw, Users, Bot } from 'lucide-react';

interface GameControlsProps {
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  onReset: () => void;
  score: { X: number; O: number; ties: number };
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameMode,
  onGameModeChange,
  onReset,
  score
}) => {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => onGameModeChange('pvp')}
          className={`
            flex-1 flex items-center justify-center gap-2 
            px-4 py-2 rounded-md transition-all duration-200
            ${gameMode === 'pvp' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <Users size={18} />
          Player vs Player
        </button>
        <button
          onClick={() => onGameModeChange('pve')}
          className={`
            flex-1 flex items-center justify-center gap-2 
            px-4 py-2 rounded-md transition-all duration-200
            ${gameMode === 'pve' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <Bot size={18} />
          Player vs AI
        </button>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="text-sm text-gray-500">Player X</div>
          <div className="text-2xl font-bold text-blue-600">{score.X}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Ties</div>
          <div className="text-2xl font-bold text-gray-600">{score.ties}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Player O</div>
          <div className="text-2xl font-bold text-red-500">{score.O}</div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="
          w-full flex items-center justify-center gap-2 
          px-4 py-3 bg-gray-600 text-white rounded-lg 
          hover:bg-gray-700 transition-colors duration-200
          font-medium
        "
      >
        <RotateCcw size={18} />
        Reset Game
      </button>
    </div>
  );
};
