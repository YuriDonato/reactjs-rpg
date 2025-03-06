// src/components/GameHUD.tsx
import React from 'react';

interface GameHUDProps {
  onInventory: () => void;
  onOpenQuestLog: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({ onInventory, onOpenQuestLog }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        gap: '10px',
      }}
    >
      <button onClick={onInventory}>Inventário</button>
      <button onClick={onOpenQuestLog}>Quests</button>
    </div>
  );
};

export default GameHUD;
