import React from 'react';
import { Player, Position } from '../types/game';
import './GameBoard.css';

interface GameBoardProps {
  board: Player[][];
  onCellClick: (row: number, col: number) => void;
  lastMove: Position | null;
  disabled: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  onCellClick, 
  lastMove, 
  disabled 
}) => {
  const boardSize = board.length;
  const cellSize = boardSize <= 9 ? 50 : boardSize <= 13 ? 40 : boardSize <= 15 ? 35 : 30;
  
  return (
    <div className="game-board">
      <div 
        className="board-grid"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${boardSize}, ${cellSize}px)`,
          padding: `${Math.max(10, cellSize / 4)}px`
        }}
      >
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const isLastMove = lastMove?.row === rowIndex && lastMove?.col === colIndex;
            const cellKey = `${rowIndex}-${colIndex}`;
            
            return (
              <div
                key={cellKey}
                className={`cell ${cell ? `cell-${cell}` : ''} ${isLastMove ? 'last-move' : ''}`}
                onClick={() => !disabled && onCellClick(rowIndex, colIndex)}
                disabled={disabled}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`
                }}
              >
                {cell && (
                  <div 
                    className={`piece piece-${cell}`}
                    style={{
                      width: `${cellSize - 4}px`,
                      height: `${cellSize - 4}px`
                    }}
                  >
                    {cell === 'black' && (
                      <svg viewBox="0 0 40 40" className="piece-svg">
                        <circle cx="20" cy="20" r="18" fill="#1a1a1a" />
                        <circle cx="20" cy="20" r="16" fill="#2d2d2d" />
                        <circle cx="17" cy="17" r="8" fill="#404040" opacity="0.3" />
                      </svg>
                    )}
                    {cell === 'white' && (
                      <svg viewBox="0 0 40 40" className="piece-svg">
                        <circle cx="20" cy="20" r="18" fill="#ffffff" />
                        <circle cx="20" cy="20" r="16" fill="#f8f8f8" />
                        <circle cx="17" cy="17" r="8" fill="#ffffff" opacity="0.8" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default GameBoard;