import styled from "styled-components";

export const GameHUDContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  background-color: rgb(110, 73, 0);
  height: 100%;
  width: 100%;
  padding: 8px;
  border: 4px solid rgb(39, 26, 0);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.74);
`;

export const StyledHUDButton = styled.button`
  background-color: rgb(78, 52, 0);
  color: #ffffff;
  border: 2px solid rgb(49, 33, 0);
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Faz o botão ocupar toda a largura disponível do contêiner */
  text-align: center; /* Centraliza o texto dentro do botão */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgb(110, 74, 1);
    color: #fff;
  }
`;

export const ButtonIcon = styled.span`
  margin-right: 8px;
  display: inline-block;
  font-size: 16px;
`;