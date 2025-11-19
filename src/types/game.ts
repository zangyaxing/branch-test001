export type Player = 'black' | 'white' | null;
export type GameState = 'playing' | 'blackWins' | 'whiteWins' | 'draw';
export type BoardSize = 9 | 13 | 15 | 19;
export type GameTheme = 'wood' | 'stone' | 'star' | 'ocean' | 'forest';

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
  boardSize: BoardSize;
  theme: GameTheme;
}

export interface GameSettings {
  boardSize: BoardSize;
  theme: GameTheme;
}