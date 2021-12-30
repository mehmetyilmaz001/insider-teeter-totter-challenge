import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OBJECT_MOVE_DELAY } from "../../constants";
import { formatMMSS, secondsToTime } from "../../helpers/Common";
import useDidUpdate from "../../hooks/UseDidUpdate";
import useInterval from "../../hooks/UseInterval";
import useKeypress from "../../hooks/UseKeyPress";
import { createFlyingObject, createRightObject, moveObject, replay, setElapsedTime, setIsPlaying } from "../../redux/reducers/SceneReducer";
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
  const { 
      leftObjects, 
      rightObjects, 
      bending, 
      flyingObject, 
      hasReached, 
      hasFailed, 
      isPlaying, 
      failReason,
      elapsedTime
     } = useSelector((state: Store) => state.scene);

  useInterval(() => {
    dispatch(setElapsedTime(elapsedTime + 1));
  } , isPlaying ? 1000 : null);

  useInterval(
    () => {
      dispatch(moveObject("bottom"));
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? OBJECT_MOVE_DELAY : null,
  )

  const _onPlay = () => {
    dispatch(createFlyingObject());
    dispatch(setIsPlaying(true));
  }

  useKeypress("ArrowLeft", () => {
    dispatch(moveObject("left"));
  });
  useKeypress("ArrowRight", () => {
    dispatch(moveObject("right"));
  });
  
  useKeypress(" ", () => {
    dispatch(setIsPlaying(!isPlaying));
  });


  useDidUpdate(() => {
    if (hasReached || hasFailed) {
      dispatch(setIsPlaying(false));
    }else{
      dispatch(setIsPlaying(true));
    }
  } , [hasReached, hasFailed]);
  

  // First object for intial setup to the right
  useEffect(() => {
    dispatch(createRightObject())
  }, [dispatch])
 
  return (
    <>
    Is Playing :{isPlaying ? "evet" : "hayır"} <br />
    Elapsed Time : {formatMMSS(elapsedTime)}  <br />
    {hasFailed && <FailState onReply={() => dispatch(replay())} reason={failReason}/>}
    <Container>
      <ButtonsContainer>

          <button onClick={_onPlay}>{flyingObject ? 'RESTART' : 'PLAY'}</button>

          {flyingObject && 
            <button onClick={() => dispatch(setIsPlaying(!isPlaying))}>{isPlaying ? 'PAUSE' : 'CONTINUE'}</button>
          }
      </ButtonsContainer>

        {flyingObject && <WeightObject {...flyingObject} className='flying-object' /> }
      
        <ArmAndLever>
          <Arm className="arm" angel={bending!} > 
            {leftObjects.map(createlistOfObjects)}  
            {rightObjects.map(createlistOfObjects)}
          </Arm>
        <Lever />
      </ArmAndLever>


    </Container>
    </>
  );
};

export default Scene;


export const createlistOfObjects = (object: ObjectProps, index: number) => <WeightObject key={index} {...object} />
