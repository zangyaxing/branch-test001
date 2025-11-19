export type Player = 'black' | 'white' | null;
export type GameState = 'playing' | 'blackWins' | 'whiteWins' | 'draw';

export interface Position {
  row: number;
  col: number;
}

export interface GameStatus {
  currentPlayer: Player;
  gameState: GameState;
  winner: Player;
  lastMove: Position | null;
  moveHistory: Position[];
}