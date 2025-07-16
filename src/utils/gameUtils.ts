import { Board, Player, WinResult } from '../types/game';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

export const checkWinner = (board: Board): WinResult => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as Player,
        winningLine: combination,
        isDraw: false
      };
    }
  }
  
  return { winner: null, winningLine: null, isDraw: false };
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
};

export const minimax = (board: Board, player: Player, isMaximizing: boolean): { score: number; index: number } => {
  const result = checkWinner(board);
  
  if (result.winner === 'O') return { score: 10, index: -1 };
  if (result.winner === 'X') return { score: -10, index: -1 };
  if (board.every(cell => cell !== null)) return { score: 0, index: -1 };

  const availableMoves = getAvailableMoves(board);
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = -1;
    
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const score = minimax(newBoard, 'X', false).score;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return { score: bestScore, index: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = -1;
    
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = 'X';
      const score = minimax(newBoard, 'O', true).score;
      
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    return { score: bestScore, index: bestMove };
  }
};
