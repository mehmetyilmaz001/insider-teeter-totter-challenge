import { FunctionComponent } from "react";
import { ObjectShape } from "../../enums/ObjectShape";
import styled, { css } from "styled-components";
import Position from "../../types/Position";

interface WeightObjectProps {
  shape: ObjectShape;
  color: string;
  value: number;
  position: Position;
}

const StyledShape = styled.div<WeightObjectProps>`
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  transition: all 0.2s;
  font-weight: bold;
  color: white;

  width: ${(props) => props.value + 20}px;
  height: ${(props) => props.value + 20}px;

  border-radius: ${(props) => {
    switch (props.shape) {
      case ObjectShape.CIRCLE:
        return "50%";
      case ObjectShape.SQUARE:
        return "0";
      default:
        return "0";
    }
  }};

  ${(props) =>
    props.shape !== ObjectShape.TRIANGLE &&
    css<{ color: string }>`
      background-color: ${(props) => props.color};
    `}

  ${(props) =>
    props.shape === ObjectShape.TRIANGLE &&
    css<{ color: string, value: number }>`
      width: 0;
      height: 0;
      border-left: ${(props) => (props.value + 20 / 2)}px solid transparent;
      border-right: ${(props) => (props.value + 20 / 2)}px solid transparent;
      border-bottom: ${(props) => props.value + 20}px solid ${(props) => props.color};
    `}
`;

const WeightObject: FunctionComponent<WeightObjectProps> = (props) => {
  return <StyledShape {...props}>{props.value}</StyledShape>;
};

export default WeightObject;
