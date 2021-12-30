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

const StyledShape = styled.div.attrs<ObjectProps>(({position}) => ({
  style: {
    top: position.y + 'px',
    left: position.x + 'px'
  }
}))<WeightObjectProps>`
  position: absolute;
  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  font-weight: bold;
  font-size: ${(props) => getDisplayWeight(props.weight) * 0.8}px;
  color: white;

  width: ${(props) => getDisplayWeight(props.weight)}px;
  height: ${(props) => getDisplayWeight(props.weight)}px;
  opacity: 0.8;
  animation: center-animate .2s ease alternate;

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


  span {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    text-shadow: 1px 2px black;
    
    ${(props) => props.shape === "TRIANGLE" &&
    css<{ weight: number }>`
      left: -${props => props.weight * 2}px;
      
    `}

  }

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

    @keyframes center-animate {
    0% {
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }
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
  return (
  <StyledShape {...defaultProps} className="weight-object">
      <span>{props.weight}</span>
  </StyledShape>);
};

export default WeightObject;
