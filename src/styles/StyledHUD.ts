import styled from "styled-components";
import { theme } from "./Themes";

export const BaseHUDElement = styled.div`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: ${theme.borders.width} solid ${theme.colors.primaryDark};
  width: 100%;
  padding: ${theme.spacing.medium};
  box-shadow: ${theme.shadows.outer};
  border-radius: ${theme.borders.radius};
  text-align: center;
`;

export const StyledHUD = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Centraliza os filhos horizontalmente
  justify-content: center;
  gap: 8px;
  background-color: rgb(110, 73, 0);
  height: 100%;
  width: 100%;
  padding: 12px;
  border: 4px solid rgb(39, 26, 0);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.74);
`;

export const PlayerStats = styled(BaseHUDElement).attrs({ as: "span" })`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
