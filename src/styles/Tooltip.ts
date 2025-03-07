import styled from "styled-components";

export const Tooltip = styled.span`
  visibility: hidden;
  background-color: black;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 10;
  font-size: 0.8rem;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
  }
`;
