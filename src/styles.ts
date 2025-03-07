import styled, { createGlobalStyle } from "styled-components";

export const GlobalCss = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #021408;
    color: #ffffff;
    font-family: 'Inter', sans-serif !important;
    overflow-x: hidden;
  }
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
`;
