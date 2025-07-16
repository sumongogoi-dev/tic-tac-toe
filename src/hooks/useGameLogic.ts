import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, GameMode, Board, WinResult } from '../types/game';
import { checkWinner, minimax } from '../utils/gameUtils';

const initialBoard: Board = Array(9).fill(null);

const initialState: GameState = {
  board: initialBoard,
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  gameMode: 'pvp',
  score: { X: 0, O: 0, ties: 0 }
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkGameResult = useCallback((board: Board): WinResult => {
    const result = checkWinner(board);
    if (result.winner) {
      return result;
    }
    
    const isDraw = board.every(cell => cell !== null);
    return { winner: null, winningLine: null, isDraw };
  }, []);

  const makeMove = useCallback((index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const result = checkGameResult(newBoard);
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      winner: result.winner,
      isDraw: result.isDraw,
      score: result.winner ? {
        ...prev.score,
        [result.winner]: prev.score[result.winner] + 1
      } : result.isDraw ? {
        ...prev.score,
        ties: prev.score.ties + 1
      } : prev.score
    }));

    setWinningLine(result.winningLine);
  }, [gameState, checkGameResult]);

  const makeAIMove = useCallback(() => {
    if (gameState.currentPlayer !== 'O' || gameState.winner || gameState.isDraw) {
      return;
    }

    const bestMove = minimax(gameState.board, 'O', true).index;
    if (bestMove !== -1) {
      setTimeout(() => makeMove(bestMove), 500);
    }
  }, [gameState, makeMove]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: initialBoard,
      currentPlayer: 'X',
      winner: null,
      isDraw: false
    }));
    setWinningLine(null);
  }, []);

  const resetScore = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: { X: 0, O: 0, ties: 0 }
    }));
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({ ...prev, gameMode: mode }));
    resetGame();
  }, [resetGame]);

  // Handle AI moves
  useEffect(() => {
    if (gameState.gameMode === 'pve' && gameState.currentPlayer === 'O' && !gameState.winner && !gameState.isDraw) {
      makeAIMove();
    }
  }, [gameState.gameMode, gameState.currentPlayer, gameState.winner, gameState.isDraw, makeAIMove]);

  return {
    gameState,
    winningLine,
    makeMove,
    resetGame,
    resetScore,
    setGameMode
  };
};
