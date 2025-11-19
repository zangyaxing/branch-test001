import React from 'react';
import { GameStatus as GameStatusType, Player } from '../types/game';
import './GameStatus.css';

interface GameStatusProps {
  gameStatus: GameStatusType;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, onReset }) => {
  const getStatusMessage = () => {
    switch (gameStatus.gameState) {
      case 'playing':
        return (
          <div className="status-playing">
            <span className="current-player">
              当前玩家: {gameStatus.currentPlayer === 'black' ? '黑棋' : '白棋'}
            </span>
            <div className={`player-indicator ${gameStatus.currentPlayer}`}></div>
          </div>
        );
      case 'blackWins':
        return (
          <div className="status-winner">
            <span className="winner-text">🎉 黑棋获胜！</span>
            <div className="winner-indicator black"></div>
          </div>
        );
      case 'whiteWins':
        return (
          <div className="status-winner">
            <span className="winner-text">🎉 白棋获胜！</span>
            <div className="winner-indicator white"></div>
          </div>
        );
      case 'draw':
        return (
          <div className="status-draw">
            <span className="draw-text">🤝 平局！</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getMoveCount = () => {
    return `第 ${gameStatus.moveHistory.length} 手`;
  };

  return (
    <div className="game-status">
      <div className="status-content">
        {getStatusMessage()}
        <div className="move-count">{getMoveCount()}</div>
      </div>
      <button 
        className="reset-button"
        onClick={onReset}
      >
        🔄 重新开始
      </button>
    </div>
  );
};

export default GameStatus;