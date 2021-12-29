import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ObjectProps } from "../../helpers/Common";
import { getRightObject } from "../../redux/reducers/SceneReducer";
import { Store } from "../../redux/store";
import WeightObject from "../WeightObject/WeightObject";
import Arm from "./components/Arm";
import ArmAndLever from "./components/ArmAndLever";
import Container from "./components/Container";
import Lever from "./components/Lever";

interface SceneProps {}

const Scene: FunctionComponent<SceneProps> = () => {
  const dispatch = useDispatch();
  const { rightObjects } = useSelector((state: Store) => state.scene);
  const contaierRef = React.useRef<HTMLDivElement>(null);
  const armRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    dispatch(getRightObject())
  }, [dispatch])
 

  return (
    <Container ref={contaierRef}>
        <ArmAndLever>
          {rightObjects.map((object: ObjectProps, index: number) => <WeightObject key={index} {...object} />)}
          <Arm className="arm" angel={0} ref={armRef} />
        <Lever />
      </ArmAndLever>
    </Container>
  );
};

export default Scene;
