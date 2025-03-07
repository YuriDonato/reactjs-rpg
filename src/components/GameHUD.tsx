// src/components/GameHUD.tsx
import React from "react";
import { StyledButton } from "../styles/StyledButtons";
import { StyledHUD } from "../styles/StyledHUD";

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
    <StyledHUD>
      <StyledButton onClick={onInventory}>Inventário</StyledButton>
      <StyledButton onClick={onOpenQuestLog}>Quests</StyledButton>
      <StyledButton onClick={onOpenShop}>Loja</StyledButton>
      <StyledButton onClick={onSaveGame}>Salvar</StyledButton>
      <StyledButton onClick={onLoadGame}>Carregar</StyledButton>
      <StyledButton onClick={onOpenAreaSelection}>Mudar Área</StyledButton>
      <StyledButton onClick={onOpenEquipment}>Equipamentos</StyledButton>
    </StyledHUD>
  );
};

export default GameHUD;
