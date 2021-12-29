import { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { OBJECT_WEIGHT_MULTIPLIER } from "../../constants";
import { ObjectProps } from "../../helpers/Common";

interface WeightObjectProps extends ObjectProps {}

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

  width: ${(props) => props.weight * OBJECT_WEIGHT_MULTIPLIER}px;
  height: ${(props) => props.weight * OBJECT_WEIGHT_MULTIPLIER}px;

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
      border-left: ${(props) => (props.weight * OBJECT_WEIGHT_MULTIPLIER) / 2}px
        solid transparent;
      border-right: ${(props) =>
          (props.weight * OBJECT_WEIGHT_MULTIPLIER) / 2}px
        solid transparent;
      border-bottom: ${(props) => props.weight * OBJECT_WEIGHT_MULTIPLIER}px
        solid ${(props) => props.color};
    `}
`;

const WeightObject: FunctionComponent<WeightObjectProps> = (props) => {
  const defaultProps = {
    ...props,
    position: {
      ...props.position,
      y: -props.weight * OBJECT_WEIGHT_MULTIPLIER,
    },
  };
  return <StyledShape {...defaultProps}>{props.weight}</StyledShape>;
};

export default WeightObject;
