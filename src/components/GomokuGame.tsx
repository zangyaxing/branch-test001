import React, { useState, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import { GameSettings } from './GameSettings';
import { Player, Position, GameStatus as GameStatusType, GameSettingsConfig } from '../types/game';
import { 
  createEmptyBoard, 
  checkWinner, 
  isBoardFull, 
  isValidMove, 
  getNextPlayer,
  initializeGameStatus 
} from '../utils/gameLogic';

const GomokuGame: React.FC = () => {
  const [showSettings, setShowSettings] = useState(true);
  const [gameSettings, setGameSettings] = useState<GameSettingsConfig>({
    boardSize: 15,
    theme: 'wood'
  });
  const [board, setBoard] = useState<Player[][]>(createEmptyBoard(gameSettings.boardSize));
  const [gameStatus, setGameStatus] = useState<GameStatusType>(initializeGameStatus(gameSettings.boardSize, gameSettings.theme));

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
    setBoard(createEmptyBoard(gameSettings.boardSize));
    setGameStatus(initializeGameStatus(gameSettings.boardSize, gameSettings.theme));
  }, [gameSettings]);

  const startNewGame = useCallback(() => {
    setBoard(createEmptyBoard(gameSettings.boardSize));
    setGameStatus(initializeGameStatus(gameSettings.boardSize, gameSettings.theme));
    setShowSettings(false);
  }, [gameSettings]);

  const backToSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const handleSettingsChange = useCallback((newSettings: GameSettingsConfig) => {
    setGameSettings(newSettings);
  }, []);

  if (showSettings) {
    return (
      <GameSettings
        settings={gameSettings}
        onSettingsChange={handleSettingsChange}
        onStartGame={startNewGame}
      />
    );
  }

  return (
    <div className={`gomoku-game theme-${gameSettings.theme}`}>
      <GameStatus 
        gameStatus={gameStatus} 
        onReset={resetGame}
        onBackToSettings={backToSettings}
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