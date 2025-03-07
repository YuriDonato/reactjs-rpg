import styled from "styled-components";

export const StyledHUD = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  background-color: rgb(110, 73, 0);
  height: 100%;
  width: 100%;
  padding: 12px;
  border: 4px solid rgb(39, 26, 0);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.74);
`;

export const PlayerStats = styled.span`
  background-color: rgb(78, 52, 0);
  color: #ffffff;
  border: 2px solid rgb(49, 33, 0);
  width: 180px;
  padding: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;
