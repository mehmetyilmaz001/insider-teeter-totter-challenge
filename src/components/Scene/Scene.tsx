import React, { FunctionComponent, useEffect, useState } from "react";
import { useInterval } from "react-interval-hook";
import { useDispatch, useSelector } from "react-redux";
import useKeypress from "../../hooks/UseKeyPress";
import { createFlyingObject, getObject, moveObject, replay } from "../../redux/reducers/SceneReducer";
import { Store } from "../../redux/store";
import ObjectProps from "../../types/ObjectProps";
import WeightObject from "../WeightObject/WeightObject";
import Arm from "./components/Arm";
import ArmAndLever from "./components/ArmAndLever";
import ButtonsContainer from "./components/ButtonsContainer";
import Container from "./components/Container";
import FailState from "./components/FailState";
import Lever from "./components/Lever";

interface SceneProps {}

const Scene: FunctionComponent<SceneProps> = () => {
  
  const dispatch = useDispatch();
  const { leftObjects, rightObjects, bending, flyingObject, hasReached, hasFailed } = useSelector((state: Store) => state.scene);
  const contaierRef = React.useRef<HTMLDivElement>(null);
  const armRef = React.useRef<HTMLDivElement>(null);

  const {start, stop, isActive} = useInterval(() => {
    dispatch(moveObject("bottom"));
  },  50, {autoStart: false, selfCorrecting: true, onFinish: () => {
    console.log("finish");
  }, });

  const _onPlay = () => {
    dispatch(createFlyingObject());
    start();
  }

  useKeypress("ArrowLeft", () => {
    dispatch(moveObject("left"));
  });
  useKeypress("ArrowRight", () => {
    dispatch(moveObject("right"));
  });


  useEffect(() => {
    if (hasReached || hasFailed) {
      stop();
    }else{
      start();
    }
  } , [hasReached, stop, start, hasFailed]);
  

  // First object for intial setup to the right
  useEffect(() => {
    dispatch(getObject('right'))
  }, [dispatch])

 
  return (
    <>
    {hasFailed && <FailState onReply={() => dispatch(replay())}/>}
    <Container ref={contaierRef}>
      <ButtonsContainer>
          <button onClick={_onPlay}>{'Play'}</button>
      </ButtonsContainer>

        {flyingObject && <WeightObject {...flyingObject} className='flying-object' /> }
      
        <ArmAndLever>
          <Arm className="arm" angel={bending!} ref={armRef} > 
            {leftObjects.map((object: ObjectProps, index: number) => <WeightObject key={index} {...object} />)}  
            {rightObjects.map((object: ObjectProps, index: number) => <WeightObject key={index} {...object} />)}
          </Arm>
        <Lever />
      </ArmAndLever>


    </Container>
    </>
  );
};

export default Scene;
