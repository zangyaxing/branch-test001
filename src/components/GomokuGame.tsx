import React, { useState, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import { Player, Position, GameStatus as GameStatusType } from '../types/game';
import { 
  BOARD_SIZE, 
  createEmptyBoard, 
  checkWinner, 
  isBoardFull, 
  isValidMove, 
  getNextPlayer,
  initializeGameStatus 
} from '../utils/gameLogic';

const GomokuGame: React.FC = () => {
  const [board, setBoard] = useState<Player[][]>(createEmptyBoard());
  const [gameStatus, setGameStatus] = useState<GameStatusType>(initializeGameStatus());

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameStatus.gameState !== 'playing') return;
    if (!isValidMove(board, row, col)) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = gameStatus.currentPlayer;
    
    const hasWon = checkWinner(newBoard, row, col, gameStatus.currentPlayer);
    const isDraw = isBoardFull(newBoard);
    
    let newGameState: GameStatusType['gameState'] = 'playing';
    let winner: Player = null;
    
    if (hasWon) {
      newGameState = gameStatus.currentPlayer === 'black' ? 'blackWins' : 'whiteWins';
      winner = gameStatus.currentPlayer;
    } else if (isDraw) {
      newGameState = 'draw';
    }
    
    const newPosition: Position = { row, col };
    
    setGameStatus({
      currentPlayer: hasWon || isDraw ? gameStatus.currentPlayer : getNextPlayer(gameStatus.currentPlayer),
      gameState: newGameState,
      winner,
      lastMove: newPosition,
      moveHistory: [...gameStatus.moveHistory, newPosition]
    });
    
    setBoard(newBoard);
  }, [board, gameStatus]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setGameStatus(initializeGameStatus());
  }, []);

  return (
    <div className="gomoku-game">
      <GameStatus 
        gameStatus={gameStatus} 
        onReset={resetGame} 
      />
      <GameBoard 
        board={board} 
        onCellClick={handleCellClick}
        lastMove={gameStatus.lastMove}
        disabled={gameStatus.gameState !== 'playing'}
      />
    </div>
  );
};

export default GomokuGame;