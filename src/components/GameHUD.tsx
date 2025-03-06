// src/components/GameHUD.tsx
import React from "react";
import { StyledHUDButton, GameHUDContainer } from "../styles/GameHud";

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
    <GameHUDContainer>
      <StyledHUDButton onClick={onInventory}>Inventário</StyledHUDButton>
      <StyledHUDButton onClick={onOpenQuestLog}>Quests</StyledHUDButton>
      <StyledHUDButton onClick={onOpenShop}>Loja</StyledHUDButton>
      <StyledHUDButton onClick={onSaveGame}>Salvar</StyledHUDButton>
      <StyledHUDButton onClick={onLoadGame}>Carregar</StyledHUDButton>
      <StyledHUDButton onClick={onOpenAreaSelection}>
        Mudar Área
      </StyledHUDButton>
    </GameHUDContainer>
  );
};

export default GameHUD;
