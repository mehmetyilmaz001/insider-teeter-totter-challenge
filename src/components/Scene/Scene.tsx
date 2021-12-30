import React, { FunctionComponent, useEffect, useState } from "react";
import { useInterval } from "react-interval-hook";
import { useDispatch, useSelector } from "react-redux";
import { createFlyingObject, getObject } from "../../redux/reducers/SceneReducer";
import { Store } from "../../redux/store";
import ObjectProps from "../../types/ObjectProps";
import WeightObject from "../WeightObject/WeightObject";
import Arm from "./components/Arm";
import ArmAndLever from "./components/ArmAndLever";
import ButtonsContainer from "./components/ButtonsContainer";
import Container from "./components/Container";
import Lever from "./components/Lever";

interface SceneProps {}

const Scene: FunctionComponent<SceneProps> = () => {
  
  const dispatch = useDispatch();
  const { leftObjects, rightObjects, bending, flyingObject } = useSelector((state: Store) => state.scene);
  const contaierRef = React.useRef<HTMLDivElement>(null);
  const armRef = React.useRef<HTMLDivElement>(null);

  const {start, stop, isActive} = useInterval(() => {
    console.log("a")
  },  1000, {autoStart: false, onFinish: () => {
    console.log("finish");
  }, });


  useEffect(() => {
    dispatch(getObject('right'))
  }, [dispatch])


  useEffect(() => {
    // start();
  } , [leftObjects])


  const _onPlay = () => {
    dispatch(createFlyingObject());
  }

  console.log("is timer active: ", isActive());

  return (
    <Container ref={contaierRef}>
      <ButtonsContainer>
          <button onClick={_onPlay}>{isActive() ? 'Pause' : 'Play'}</button>
      </ButtonsContainer>


        {flyingObject && <WeightObject {...flyingObject} className='flying-object' /> }
      
        <ArmAndLever>
        {leftObjects.map((object: ObjectProps, index: number) => <WeightObject key={index} {...object} />)}
          <Arm className="arm" angel={bending!} ref={armRef} > 
            
            {rightObjects.map((object: ObjectProps, index: number) => <WeightObject key={index} {...object} />)}
          </Arm>
        <Lever />
      </ArmAndLever>
    </Container>
  );
};

export default Scene;
