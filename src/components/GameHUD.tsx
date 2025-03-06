// src/components/GameHUD.tsx
import React from 'react';

interface GameHUDProps {
  onInventory: () => void;
  onOpenQuestLog: () => void;
  onOpenShop: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({ onInventory, onOpenQuestLog, onOpenShop }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
      <button onClick={onInventory}>Inventário</button>
      <button onClick={onOpenQuestLog}>Quests</button>
      <button onClick={onOpenShop}>Loja</button>
    </div>
  );
};

export default GameHUD;
