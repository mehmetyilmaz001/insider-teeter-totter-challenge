import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ElementShape } from "../../enums/ElementShape";
import WeightElement from "../Element/WeightElement";

interface SceneProps {}

const Container = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  border: solid 1px;
`;

const Lever = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid grey;
`;

const Scene: FunctionComponent<SceneProps> = () => {
  return (
    <Container>
      {/* <WeightElement color="red" shape={ElementShape.CIRCLE} value={20} />
      <WeightElement color="blue" shape={ElementShape.SQUARE} value={40} />
      <WeightElement color="orange" shape={ElementShape.TRIANGLE} value={80} /> */}
      <Lever />
    </Container>
  );
};

export default Scene;
