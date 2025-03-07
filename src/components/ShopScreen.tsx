// src/components/ShopScreen.tsx
import React from "react";
import { ShopItem } from "./types";
import { StyledHUD } from "../styles/StyledHUD";
import { StyledButton } from "../styles/StyledButtons";
import {
  StyledH1,
  StyledLi,
  StyledP,
  StyledStrong,
  StyledUl,
} from "../styles/StyledWord";
import {
  StyledTable,
  StyledTbody,
  StyledTd,
  StyledTh,
  StyledThead,
  StyledTr,
} from "../styles/StyledTable";
import { Tooltip, TooltipContainer } from "../styles/Tooltip";

interface ShopScreenProps {
  onClose: () => void;
  onBuy: (item: ShopItem) => void;
  shopItems: ShopItem[];
  playerGold: number;
}

const ShopScreen: React.FC<ShopScreenProps> = ({
  onClose,
  onBuy,
  shopItems,
  playerGold,
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <StyledHUD>
        <StyledH1>Loja</StyledH1>
        <StyledP>Ouro: {playerGold}</StyledP>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>Nome</StyledTh>
              <StyledTh>Preço</StyledTh>
              <StyledTh>Efeito</StyledTh>
              <StyledTh>Ação</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {shopItems.map((item) => (
              <StyledTr key={item.id}>
                <StyledTd>
                  <StyledStrong>{item.name}</StyledStrong>
                </StyledTd>
                <StyledTd>{item.price}</StyledTd>
                <StyledTd>
                  <TooltipContainer>
                    {item.effect}
                    <Tooltip>{item.description}</Tooltip>
                  </TooltipContainer>
                </StyledTd>
                <StyledTd>
                  <StyledButton onClick={() => onBuy(item)}>
                    Comprar
                  </StyledButton>
                </StyledTd>
              </StyledTr>
            ))}
          </StyledTbody>
        </StyledTable>
        <StyledButton onClick={onClose}>Fechar Loja</StyledButton>
      </StyledHUD>
    </div>
  );
};

export default ShopScreen;
