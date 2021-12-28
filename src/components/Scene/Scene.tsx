import React, { FunctionComponent, useEffect, useState } from "react";
import { useCallback } from "react";
import { useInterval } from "react-interval-hook";
import styled from "styled-components";
import { ObjectShape } from "../../enums/ObjectShape";
import { getRandomNumberBetween } from "../../helpers/Common";
import useKeypress from "../../hooks/UseKeyPress";
import Position from "../../types/Position";
import WeightObject from "../WeightObject/WeightObject";
import Arm from "./components/Arm";
import Lever from "./components/Lever";
import useCreateRandomObject from "./useCreateRandomObject";

interface SceneProps {}

const Container = styled.div`
  position: relative;
  width: 50%;
  height: 90%;
  margin: auto;
  border: solid 1px;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  left: -200px;
`;

const ArmAndLever = styled.div`
  position: absolute;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
const rightElementValue = 20;

const maxAngle = 12.4;
const elementValue = 25;
const moveStep = 20;

const Scene: FunctionComponent<SceneProps> = () => {
  const contaierRef = React.useRef<HTMLDivElement>(null);
  const armRef = React.useRef<HTMLDivElement>(null);

  const [rightSideObject, setRightSideObject] = useState<{
    obj: JSX.Element;
    pos: Position;
    value: number;
  }>({ obj: <></>, pos: { x: 0, y: 0 }, value: 0 });

  const [pos, setPos] = React.useState<Position>({
    x: 0,
    y: 0,
  });

  const [equity, setEquity] = useState<number>(rightElementValue);
  const [armAngel, setArmAngel] = useState<number>(0);
  const [isKeysLocked, setIsKeysLocked] = useState<boolean>(false);
  //   const dropInterval = React.useRef<Timer>(null);

  const { getObject, value: newRightSideObjValue } = useCreateRandomObject();

  const createRightSideObj = useCallback( () => {
    if (armRef.current) {
      const {y: armY, width} = armRef.current.getBoundingClientRect();
      
      const halfOfArm = width / 2;
      const randomStartX = getRandomNumberBetween(halfOfArm, width)

      const pos: Position = { x: randomStartX, y: armY };
      
      const newRightSideObj = getObject(pos);
      setRightSideObject({ obj: newRightSideObj, pos, value: newRightSideObjValue });
      const weight = calculateWeight(pos.x);
      setEquity(weight);
    }
  }, [getObject, newRightSideObjValue]);

  useEffect(() => {
    // Create right side object randomly
    createRightSideObj();
  }, []);




 

  const { start, stop, isActive } = useInterval(
    () => {
      setPos((pos) => ({ ...pos, y: pos.y + moveStep }));
    },
    200,
    {
      autoStart: false,
      immediate: false,
      selfCorrecting: false,
      onFinish: () => {
        console.log("Callback when timer is stopped");
      },
    }
  );



  const calculateWeight = useCallback((posX: number) => {
    const halfOfArm = armRef.current!.offsetWidth / 2;
    const multiplier = halfOfArm - posX;
    const weight = Math.round(multiplier * elementValue);

    return Math.abs(weight);
  }, []);

  const calcAngle = useCallback(() => {
    const angle = equity % maxAngle;
    /* console.log("equity", equity, angle);    // if the weight equilty more then zero it means that the elements ara more heavy then the right ones. */
    return angle;
  }, [equity]);

  const reStart = () => {
    setPos({ x: 0, y: 0 });
    setIsKeysLocked(false);
    start();
  };

  const move = (direction: "left" | "right") => {
    if (!isKeysLocked) {
      if (direction === "left") {
        setPos((pos) => ({ ...pos, x: pos.x - moveStep }));
      } else {
        setPos((pos) => ({ ...pos, x: pos.x + moveStep }));
      }
    }
  };

  const onReachToArm = useCallback(
    (pos: Position) => {
      const { x, y } = pos;

      if (armRef.current) {
        const { y: armY } = armRef.current.getBoundingClientRect();

        if (y + elementValue >= armY) {
          setIsKeysLocked(true);
          stop();

          const weight = calculateWeight(x);
          console.log("weight => ", weight);

          setEquity((equity) => equity - weight);
        }
      }
    },
    [calculateWeight, stop]
  );

  useEffect(() => {
    onReachToArm(pos);
  }, [pos, onReachToArm]);

  useEffect(() => {
    const angle = calcAngle();
    setArmAngel(angle);
  }, [calcAngle, equity]);

  useKeypress("ArrowLeft", () => {
    move("left");
  });
  useKeypress("ArrowRight", () => {
    move("right");
  });

  /* useEffect(() => {
    console.log("arm angel", armAngel, isKeysLocked);
  }, [armAngel, isKeysLocked]); */

  const testLeftEl = (
    <WeightObject
      color="red"
      shape={ObjectShape.CIRCLE}
      value={elementValue}
      position={pos}
    />
  );

  return (
    <Container ref={contaierRef}>
      <ButtonsContainer>
        <button onClick={isActive() ? reStart : start}>
          {isActive() ? "Restart" : "Start"}
        </button>
      </ButtonsContainer>

      {testLeftEl}
      {rightSideObject.obj}
      <ArmAndLever>
        <Arm className="arm" angel={armAngel} ref={armRef} />
        <Lever />
      </ArmAndLever>
    </Container>
  );
};

export default Scene;
