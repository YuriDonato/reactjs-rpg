// src/components/GameHUD.tsx
import React from 'react';

interface GameHUDProps {
  onInventory: () => void;
  onOpenQuestLog: () => void;
  onOpenShop: () => void;
  onSaveGame: () => void;
  onLoadGame: () => void;
  onOpenAreaSelection: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({
  onInventory,
  onOpenQuestLog,
  onOpenShop,
  onSaveGame,
  onLoadGame,
  onOpenAreaSelection,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
      <button onClick={onInventory}>Inventário</button>
      <button onClick={onOpenQuestLog}>Quests</button>
      <button onClick={onOpenShop}>Loja</button>
      <button onClick={onSaveGame}>Salvar</button>
      <button onClick={onLoadGame}>Carregar</button>
      <button onClick={onOpenAreaSelection}>Mudar Área</button>
    </div>
  );
};

export default GameHUD;
