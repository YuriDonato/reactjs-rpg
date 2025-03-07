import styled from "styled-components";
import { BaseHUDElement } from "./StyledHUD";
import { theme } from "./Themes";

export const StyledButton = styled(BaseHUDElement).attrs({ as: "button" })`
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primaryLight};
    color: ${theme.colors.text};
  }
`;

export const ButtonIcon = styled.span`
  margin-right: 8px;
  display: inline-block;
  font-size: 16px;
`;
