import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARM_MAX_BENDING_PERCENTAGE, ARM_WIDTH } from "../../constants";
import { ObjectProps } from "../../helpers/Common";
import { getObject, getRightObject } from "../../redux/reducers/SceneReducer";
import { Store } from "../../redux/store";
import WeightObject from "../WeightObject/WeightObject";
import Arm from "./components/Arm";
import ArmAndLever from "./components/ArmAndLever";
import Container from "./components/Container";
import Lever from "./components/Lever";

interface SceneProps {}

const Scene: FunctionComponent<SceneProps> = () => {
  
  const dispatch = useDispatch();
  const { rightObjects, equity } = useSelector((state: Store) => state.scene);
  const contaierRef = React.useRef<HTMLDivElement>(null);
  const armRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    dispatch(getObject('right'))
  }, [dispatch])

  
  let bending = 0
  if(rightObjects.length > 0 ) {
    const rightPower = rightObjects.reduce((power, object) => power + (object.position.x / (ARM_WIDTH + 10)), 0)
    bending = Math.min((equity * rightPower), ARM_MAX_BENDING_PERCENTAGE);
    console.log("bending",  bending, equity);
  }
 

  return (
    <Container ref={contaierRef}>
      <button onClick={() => dispatch(getObject('left'))}>Set Left</button>
        <ArmAndLever>
          
          <Arm className="arm" angel={bending!} ref={armRef} > 
            {rightObjects.map((object: ObjectProps, index: number) => <WeightObject key={index} {...object} />)}
          </Arm>
        <Lever />
      </ArmAndLever>
    </Container>
  );
};

export default Scene;
