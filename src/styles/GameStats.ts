import styled from "styled-components";

export const PlayerStatsContainer = styled.div`
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

export const PlayerStats = styled.p`
  margin: 0;
  color: #ffffff;
  border: 2px solid rgb(49, 33, 0);
  padding: 8px;
  width: 100%;
`;