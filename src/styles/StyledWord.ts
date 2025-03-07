import styled, { css } from "styled-components";
import { theme } from "./Themes";
import React from "react";

// Interfaces para as props
interface TextStyleProps {
  color?: string;
  bold?: boolean;
  margin?: string;
  padding?: string;
  align?: string;
  italic?: boolean;
  underline?: boolean;
  size?: string;
  marginBottom?: string;
}

// Interface para os elementos base
interface BaseElementProps {
  bgColor?: string;
  color?: string;
  border?: string;
  width?: string;
  padding?: string;
  shadow?: string;
  borderRadius?: string;
  align?: string;
}

// Estilos base para todos os elementos de texto
const baseTextStyles = css<TextStyleProps>`
  color: ${(props) => props.color || theme.colors.text};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  text-align: ${(props) => props.align || "left"};
  font-style: ${(props) => (props.italic ? "italic" : "normal")};
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  font-size: ${(props) => {
    switch (props.size) {
      case "xs":
        return "0.75rem";
      case "sm":
        return "0.875rem";
      case "md":
        return "1rem";
      case "lg":
        return "1.125rem";
      case "xl":
        return "1.25rem";
      case "2xl":
        return "1.5rem";
      case "3xl":
        return "1.875rem";
      case "4xl":
        return "2.25rem";
      default:
        return props.size || "1rem";
    }
  }};
`;

// Elemento base para textos
export const BaseWordElement = styled.div<BaseElementProps>`
  background-color: ${(props) => props.bgColor || theme.colors.primary};
  color: ${(props) => props.color || theme.colors.text};
  border: ${(props) =>
    props.border || `${theme.borders.width} solid ${theme.colors.primaryDark}`};
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || theme.spacing.medium};
  box-shadow: ${(props) => props.shadow || theme.shadows.outer};
  border-radius: ${(props) => props.borderRadius || theme.borders.radius};
  text-align: ${(props) => props.align || "center"};
`;

// Componentes de texto
export const StyledSpan = styled.span<TextStyleProps>`
  ${baseTextStyles}
`;

export const StyledP = styled.p<TextStyleProps>`
  ${baseTextStyles}
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
`;

export const StyledStrong = styled.strong<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
`;

export const StyledEm = styled.em<TextStyleProps>`
  ${baseTextStyles}
  font-style: italic;
`;

export const StyledMark = styled.mark<TextStyleProps>`
  ${baseTextStyles}
  background-color: yellow;
`;

export const StyledSmall = styled.small<TextStyleProps>`
  ${baseTextStyles}
  font-size: 0.875rem;
`;

export const StyledDel = styled.del<TextStyleProps>`
  ${baseTextStyles}
  text-decoration: line-through;
`;

export const StyledIns = styled.ins<TextStyleProps>`
  ${baseTextStyles}
  text-decoration: underline;
`;

export const StyledSub = styled.sub<TextStyleProps>`
  ${baseTextStyles}
  font-size: 0.75rem;
  vertical-align: sub;
`;

export const StyledSup = styled.sup<TextStyleProps>`
  ${baseTextStyles}
  font-size: 0.75rem;
  vertical-align: super;
`;

// Listas
export const StyledUl = styled.ul<TextStyleProps>`
  ${baseTextStyles}
  list-style-type: disc;
  padding-left: 1.5rem;
`;

export const StyledOl = styled.ol<TextStyleProps>`
  ${baseTextStyles}
  list-style-type: decimal;
  padding-left: 1.5rem;
`;

export const StyledLi = styled.li<TextStyleProps>`
  ${baseTextStyles}
  margin-bottom: ${(props) => props.marginBottom || "0.5rem"};
`;

// Cabeçalhos
export const StyledH1 = styled.h1<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
  font-size: ${(props) => props.size || "2.25rem"};
`;

export const StyledH2 = styled.h2<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
  font-size: ${(props) => props.size || "2rem"};
`;

export const StyledH3 = styled.h3<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
  font-size: ${(props) => props.size || "1.75rem"};
`;

export const StyledH4 = styled.h4<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
  font-size: ${(props) => props.size || "1.5rem"};
`;

export const StyledH5 = styled.h5<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
  font-size: ${(props) => props.size || "1.25rem"};
`;

export const StyledH6 = styled.h6<TextStyleProps>`
  ${baseTextStyles}
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom || theme.spacing.medium};
  font-size: ${(props) => props.size || "1rem"};
`;

// Componente flexível para qualquer elemento de texto
interface TextProps extends TextStyleProps {
  as?: React.ElementType;
}

export const Text = styled.span.attrs<TextProps, {}>((props) => ({
  as: props.as || "span",
}))<TextProps>`
  ${baseTextStyles}
  ${(props) =>
    props.as &&
    typeof props.as === "string" &&
    props.as.startsWith("h") &&
    "font-weight: bold;"}
  ${(props) => props.as === "p" && `margin-bottom: ${theme.spacing.medium};`}
`;
