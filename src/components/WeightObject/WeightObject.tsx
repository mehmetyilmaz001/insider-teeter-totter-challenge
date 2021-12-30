import { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { OBJECT_WEIGHT_MULTIPLIER } from "../../constants";
import ObjectProps from "../../types/ObjectProps";

export const getDisplayWeight = (weight: number) => {
  return weight * OBJECT_WEIGHT_MULTIPLIER;
}

interface WeightObjectProps extends ObjectProps {
  className?: string
}

const StyledShape = styled.div<WeightObjectProps>`
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  font-weight: bold;
  color: white;

  width: ${(props) => getDisplayWeight(props.weight)}px;
  height: ${(props) => getDisplayWeight(props.weight)}px;
  opacity: 0.9;
  border-radius: ${(props) => {
    switch (props.shape) {
      case "CIRCLE":
        return "50%";
      case "SQUARE":
        return "0";
      default:
        return "0";
    }
  }};

  ${(props) =>
    props.shape !== "TRIANGLE" &&
    css<{ color: string }>`
      background-color: ${(props) => props.color};
      
    `}

  ${(props) =>
    props.shape === "TRIANGLE" &&
    css<{ color: string; weight: number }>`
      width: 0;
      height: 0;
      border-left: ${(props) => getDisplayWeight(props.weight) / 2}px
        solid transparent;
      border-right: ${(props) =>
          getDisplayWeight(props.weight) / 2}px
        solid transparent;
      border-bottom: ${(props) => getDisplayWeight(props.weight)}px
        solid ${(props) => props.color};
    `}
`;

const WeightObject: FunctionComponent<WeightObjectProps> = (props) => {
  // console.log("props: ", props.position);
  const defaultProps = {
    ...props,
    position: {
      ...props.position,
      y: props.side === 'right' ?  -getDisplayWeight(props.weight) : props.position.y,
    },
  };
  return <StyledShape {...defaultProps}>{props.weight}</StyledShape>;
};

export default WeightObject;
