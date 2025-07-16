import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { GameStatus } from './components/GameStatus';
import { useGameLogic } from './hooks/useGameLogic';
import { Gamepad2 } from 'lucide-react';

function App() {
  const {
    gameState,
    winningLine,
    makeMove,
    resetGame,
    resetScore,
    setGameMode
  } = useGameLogic();

  const isGameOver = gameState.winner !== null || gameState.isDraw;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Tic-Tac-Toe</h1>
          </div>
          <p className="text-gray-600">
            {gameState.gameMode === 'pvp' 
              ? 'Challenge your friend to a classic game!' 
              : 'Test your skills against our smart AI!'
            }
          </p>
        </div>

        <div className="space-y-6">
          <GameControls
            gameMode={gameState.gameMode}
            onGameModeChange={setGameMode}
            onReset={resetGame}
            score={gameState.score}
          />

          <GameStatus
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            isDraw={gameState.isDraw}
            isGameOver={isGameOver}
          />

          <div className="flex justify-center">
            <GameBoard
              board={gameState.board}
              onSquareClick={makeMove}
              winningLine={winningLine}
              isGameOver={isGameOver}
            />
          </div>

          <div className="text-center">
            <button
              onClick={resetScore}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Reset Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
