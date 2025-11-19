import React from 'react';
import { GameSettings, BoardSize, GameTheme } from '../types/game';
import './GameSettings.css';

interface GameSettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onStartGame: () => void;
}

const boardSizes: { value: BoardSize; label: string }[] = [
  { value: 9, label: '9×9 (快速)' },
  { value: 13, label: '13×13 (中等)' },
  { value: 15, label: '15×15 (标准)' },
  { value: 19, label: '19×19 (专业)' }
];

const themes: { value: GameTheme; label: string; description: string }[] = [
  { value: 'wood', label: '木纹', description: '经典木纹棋盘' },
  { value: 'stone', label: '石纹', description: '古朴石纹质感' },
  { value: 'star', label: '星空', description: '梦幻星空背景' },
  { value: 'ocean', label: '海洋', description: '深邃海洋主题' },
  { value: 'forest', label: '森林', description: '自然森林风格' }
];

export const GameSettings: React.FC<GameSettingsProps> = ({
  settings,
  onSettingsChange,
  onStartGame
}) => {
  const handleBoardSizeChange = (boardSize: BoardSize) => {
    onSettingsChange({ ...settings, boardSize });
  };

  const handleThemeChange = (theme: GameTheme) => {
    onSettingsChange({ ...settings, theme });
  };

  return (
    <div className="game-settings">
      <div className="settings-container">
        <h2 className="settings-title">游戏设置</h2>
        
        <div className="setting-group">
          <h3 className="setting-label">棋盘大小</h3>
          <div className="board-size-options">
            {boardSizes.map((size) => (
              <button
                key={size.value}
                className={`size-option ${settings.boardSize === size.value ? 'active' : ''}`}
                onClick={() => handleBoardSizeChange(size.value)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <h3 className="setting-label">场景主题</h3>
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.value}
                className={`theme-option ${settings.theme === theme.value ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.value)}
              >
                <div className={`theme-preview theme-${theme.value}`}></div>
                <div className="theme-info">
                  <span className="theme-name">{theme.label}</span>
                  <span className="theme-description">{theme.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button className="start-game-button" onClick={onStartGame}>
          开始游戏
        </button>
      </div>
    </div>
  );
};