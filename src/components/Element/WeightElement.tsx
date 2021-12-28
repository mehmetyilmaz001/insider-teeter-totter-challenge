import { FunctionComponent } from "react";
import { ElementShape } from "../../enums/ElementShape";
import styled, { css } from "styled-components";

interface WeightElementProps {
  shape: ElementShape;
  color: string;
  value: number;
}

const StyledShape = styled.div<WeightElementProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: ${(props) => props.value + 20}px;
  height: ${(props) => props.value + 20}px;

  border-radius: ${(props) => {
    switch (props.shape) {
      case ElementShape.CIRCLE:
        return "50%";
      case ElementShape.SQUARE:
        return "0";
      default:
        return "0";
    }
  }};

  background-color: ${(props) => props.color};

  ${(props) =>
    props.shape === ElementShape.TRIANGLE &&
    css<{ color: string }>`
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid ${(props) => props.color};
    `}
`;

const WeightElement: FunctionComponent<WeightElementProps> = (props) => {
  return <StyledShape {...props}>{props.value}</StyledShape>;
};

export default WeightElement;
