import { Player, Position, GameStatus } from '../types/game';

export const BOARD_SIZE = 15;

export function createEmptyBoard(): Player[][] {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
}

export function checkWinner(board: Player[][], row: number, col: number, player: Player): boolean {
  if (!player) return false;

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
      
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
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
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && board[row][col] === null;
}

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'black' ? 'white' : 'black';
}

export function initializeGameStatus(): GameStatus {
  return {
    currentPlayer: 'black',
    gameState: 'playing',
    winner: null,
    lastMove: null,
    moveHistory: []
  };
}