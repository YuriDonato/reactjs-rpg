// src/components/InventoryScreen.tsx
import React from "react";
import { InventoryItem } from "./types";
import { StyledH1, StyledP } from "../styles/StyledWord";
import { StyledHUD } from "../styles/StyledHUD";
import { StyledButton } from "../styles/StyledButtons";

interface InventoryScreenProps {
  inventory: InventoryItem[];
  onClose: () => void;
  onUseItem: (item: InventoryItem) => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({
  inventory,
  onClose,
  onUseItem,
}) => {
  return (
    <div>
      <StyledHUD style={{ padding: "20px" }}>
        <StyledH1>Inventário</StyledH1>
        {inventory.length === 0 ? (
          <StyledP>Nenhum item no inventário.</StyledP>
        ) : (
          <ul>
            {inventory.map((item) => (
              <li key={item.id} style={{ marginBottom: "8px" }}>
                {item.name} (x{item.quantity})
                <StyledButton
                  onClick={() => onUseItem(item)}
                  style={{ marginLeft: "10px" }}
                >
                  Usar
                </StyledButton>
              </li>
            ))}
          </ul>
        )}
        <StyledButton onClick={onClose}>Fechar Inventário</StyledButton>
      </StyledHUD>
    </div>
  );
};

export default InventoryScreen;
