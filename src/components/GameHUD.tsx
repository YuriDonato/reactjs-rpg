// src/components/GameHUD.tsx
import React from 'react';
import { GameHUDContainer, StyledHUDButton } from '../styles/GameHud';

interface GameHUDProps {
  onInventory: () => void;
  onOpenQuestLog: () => void;
  onOpenShop: () => void;
  onSaveGame: () => void;
  onLoadGame: () => void;
  onOpenAreaSelection: () => void;
  onOpenEquipment: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({
  onInventory,
  onOpenQuestLog,
  onOpenShop,
  onSaveGame,
  onLoadGame,
  onOpenAreaSelection,
  onOpenEquipment,
}) => {
  return (
    <GameHUDContainer style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
      <StyledHUDButton onClick={onInventory}>Inventário</StyledHUDButton>
      <StyledHUDButton onClick={onOpenQuestLog}>Quests</StyledHUDButton>
      <StyledHUDButton onClick={onOpenShop}>Loja</StyledHUDButton>
      <StyledHUDButton onClick={onSaveGame}>Salvar</StyledHUDButton>
      <StyledHUDButton onClick={onLoadGame}>Carregar</StyledHUDButton>
      <StyledHUDButton onClick={onOpenAreaSelection}>Mudar Área</StyledHUDButton>
      <StyledHUDButton onClick={onOpenEquipment}>Equipamentos</StyledHUDButton>
    </GameHUDContainer>
  );
};

export default GameHUD;
