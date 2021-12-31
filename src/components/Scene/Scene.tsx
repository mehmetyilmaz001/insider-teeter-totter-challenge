import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OBJECT_MOVE_DELAY, TIME_STEP } from "../../constants";
import { formatMMSS } from "../../helpers/Common";
import useDidUpdate from "../../hooks/UseDidUpdate";
import useInterval from "../../hooks/UseInterval";
import useKeypress from "../../hooks/UseKeyPress";
import {
  createFlyingObject,
  createRightObject,
  getSpeed,
  moveObject,
  replay,
  setElapsedTime,
  setIsPlaying,
} from "../../redux/reducers/SceneReducer";
import { Store } from "../../redux/store";
import ObjectProps from "../../types/ObjectProps";
import WeightObject from "../WeightObject/WeightObject";
import Arm from "./components/Arm";
import ArmAndLever from "./components/ArmAndLever";
import ButtonsContainer from "./components/ButtonsContainer";
import Container from "./components/Container";
import FailState from "./components/FailState";
import InfoCard from "./components/InfoCard";
import Lever from "./components/Lever";
import SpeedIncreasedState from "./components/SpeedIncreasedState";

interface SceneProps {}

const Scene: FunctionComponent<SceneProps> = () => {
  const [showSpeedIncreaseState, setShowSpeedIncreaseState] =
    useState<boolean>(false);
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
    elapsedTime,
    speed,
    timeStep,
  } = useSelector((state: Store) => state.scene);

  useInterval(
    () => {
      dispatch(setElapsedTime(elapsedTime + 1));
    },
    isPlaying ? 1000 : null
  );

  useInterval(
    () => {
      dispatch(moveObject("bottom"));
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? speed : null
  );

  const _onPlay = () => {
    dispatch(createFlyingObject());
    dispatch(setIsPlaying(true));
  };
 
  const _re = () => {
    dispatch(createFlyingObject());
    dispatch(setIsPlaying(true));
  };

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
    dispatch(getSpeed(elapsedTime));
  }, [elapsedTime]);

  useDidUpdate(() => {
    console.log("timeStep changed", timeStep);
    setShowSpeedIncreaseState(true);

    setTimeout(() => {
      setShowSpeedIncreaseState(false);
    }, (TIME_STEP - 3) * 1000);
  }, [timeStep]);

  useDidUpdate(() => {
    if (hasReached || hasFailed) {
      dispatch(setIsPlaying(false));
    } else {
      dispatch(setIsPlaying(true));
    }
  }, [hasReached, hasFailed]);

  // First object for intial setup to the right
  useEffect(() => {
    dispatch(createRightObject());
  }, [dispatch]);

  return (
    <>
      {hasFailed && (
        <FailState onReply={() => dispatch(replay())} reason={failReason} />
      )}
      <SpeedIncreasedState show={showSpeedIncreaseState} />

      <div style={{ padding: 10, position: 'fixed', left: 10, top: 10 }}>
        <InfoCard />
        <ButtonsContainer>
          <button onClick={() => flyingObject ? dispatch(replay()) : _onPlay()}>{flyingObject ? "RESTART" : "PLAY"}</button>

          {flyingObject && (
            <button onClick={() => dispatch(setIsPlaying(!isPlaying))}>
              {isPlaying ? "PAUSE" : "CONTINUE"}
            </button>
          )}
        </ButtonsContainer>
      </div>
      <Container>
        {flyingObject && (
          <WeightObject {...flyingObject} className="flying-object" />
        )}

        <ArmAndLever>
          <Arm className="arm" angel={bending!}>
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

export const createlistOfObjects = (object: ObjectProps, index: number) => (
  <WeightObject key={index} {...object} />
);
