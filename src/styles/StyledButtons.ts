import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: rgb(78, 52, 0);
  color: #ffffff;
  border: 2px solid rgb(49, 33, 0);
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Faz o botão ocupar toda a largura disponível do contêiner */
  text-align: center; /* Centraliza o texto dentro do botão */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

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
