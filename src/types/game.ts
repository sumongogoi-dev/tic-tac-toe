export type Player = 'X' | 'O';
export type GameMode = 'pvp' | 'pve';
export type Board = (Player | null)[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  gameMode: GameMode;
  score: {
    X: number;
    O: number;
    ties: number;
  };
}

export interface WinResult {
  winner: Player | null;
  winningLine: number[] | null;
  isDraw: boolean;
}
