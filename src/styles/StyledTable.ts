import styled from "styled-components";
import { theme } from "./Themes";

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid ${theme.colors.primaryDark};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium};
`;

export const StyledThead = styled.thead`
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.text};
`;

export const StyledTbody = styled.tbody`
  background-color: ${theme.colors.primary};
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.colors.primaryLight}; // Substituído
  }

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const StyledTh = styled.th`
  padding: ${theme.spacing.small};
  text-align: center;
  border-bottom: 2px solid ${theme.colors.primaryDark};
  font-weight: bold;
`;

export const StyledTd = styled.td`
  padding: ${theme.spacing.small};
  border-bottom: 1px solid ${theme.colors.primaryDark};
  text-align: center;
`;

export const StyledTfoot = styled.tfoot`
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.text};
  font-weight: bold;
`;

export const StyledCaption = styled.caption`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small};
  text-align: center;
`;
