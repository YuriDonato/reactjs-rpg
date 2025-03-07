import styled from "styled-components";
import { BaseHUDElement } from "./StyledHUD";
import { theme } from "./Themes";

export const AlertContainer = styled(BaseHUDElement)`
  position: fixed;
  top: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: ${theme.borders.width} solid ${theme.colors.primaryDark};
  padding: ${theme.spacing.medium};
  box-shadow: ${theme.shadows.outer};
  border-radius: ${theme.borders.radius};
  text-align: center;
  max-width: 300px;
`;

export const Alert = styled.div`
  position: relative;
  background-color: ${theme.colors.primaryDark}; // Substituindo a cor "danger"
  color: ${theme.colors.text};
  padding: 10px 40px 10px 10px; /* Espaço para o botão de fechar */
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: ${theme.shadows.inner};
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
