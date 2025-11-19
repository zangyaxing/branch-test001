import { Player, Position, GameStatus, BoardSize, GameTheme } from '../types/game';

export function createEmptyBoard(boardSize: BoardSize): Player[][] {
  return Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
}

export function checkWinner(board: Player[][], row: number, col: number, player: Player): boolean {
  if (!player) return false;
  
  const boardSize = board.length;

  const directions = [
    [[0, 1], [0, -1]],   // 水平
    [[1, 0], [-1, 0]],   // 垂直
    [[1, 1], [-1, -1]],  // 对角线1
    [[1, -1], [-1, 1]]   // 对角线2
  ];

  for (const direction of directions) {
    let count = 1;
    
    for (const [dr, dc] of direction) {
      let r = row + dr;
      let c = col + dc;
      
      while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === player) {
        count++;
        r += dr;
        c += dc;
      }
    }
    
    if (count >= 5) {
      return true;
    }
  }
  
  return false;
}

export function isBoardFull(board: Player[][]): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

export function isValidMove(board: Player[][], row: number, col: number): boolean {
  const boardSize = board.length;
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize && board[row][col] === null;
}

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'black' ? 'white' : 'black';
}

export function initializeGameStatus(boardSize: BoardSize, theme: GameTheme): GameStatus {
  return {
    currentPlayer: 'black',
    gameState: 'playing',
    winner: null,
    lastMove: null,
    moveHistory: [],
    boardSize,
    theme
  };
}