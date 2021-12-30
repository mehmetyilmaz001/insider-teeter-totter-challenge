import { calcBending } from "./../../helpers/Common";
import { getDisplayWeight } from "./../../components/WeightObject/WeightObject";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ARM_MAX_BENDING_PERCENTAGE, OBJECT_MOVE_DELAY, OBJECT_MOVE_STEP, TIME_STEP } from "../../constants";
import { createRandomObjectProps } from "../../helpers/Common";
import ObjectProps from "../../types/ObjectProps";
import { AppThunk } from "../store";

type SceneReducerType = {
  rightObjects: ObjectProps[];
  leftObjects: ObjectProps[];
  flyingObject: ObjectProps | null;
  equity: number;
  bending: number;
  isPlaying: boolean;
  hasReached: boolean;
  hasFailed: boolean;
  failReason: string;
  elapsedTime: number;
  speed: number;
  timeStep: number;
};

const initialState: SceneReducerType = {
  rightObjects: [],
  leftObjects: [],
  flyingObject: null,
  equity: 0,
  bending: 0,
  isPlaying: false,
  hasReached: false,
  hasFailed: false,
  failReason: "",
  elapsedTime: 0,
  speed: OBJECT_MOVE_DELAY,
  timeStep: 0,
};

const scene = createSlice({
  name: "scene",
  initialState,
  reducers: {
    addRightObject: (
      state: SceneReducerType,
      action: PayloadAction<ObjectProps>
    ) => void (state.rightObjects = [...state.rightObjects, action.payload]),
    addLeftObject: (
      state: SceneReducerType,
      action: PayloadAction<ObjectProps>
    ) => void (state.leftObjects = [...state.leftObjects, action.payload]),
    setEquity: (state: SceneReducerType, action: PayloadAction<number>) =>
      void (state.equity = state.equity + action.payload),
    setBending: (state: SceneReducerType, action: PayloadAction<number>) =>
      void (state.bending = action.payload),
    setFlyingObject: (
      state: SceneReducerType,
      action: PayloadAction<ObjectProps | null>
    ) => void (state.flyingObject = action.payload),

    setIsPlaying: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.isPlaying = action.payload),
    setHasReached: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.hasReached = action.payload),
    setHasFailed: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.hasFailed = action.payload),
    setFailReason: (state: SceneReducerType, action: PayloadAction<string>) =>
      void (state.failReason = action.payload),
    setElapsedTime: (state: SceneReducerType, action: PayloadAction<number>) =>
      void (state.elapsedTime = action.payload),
    setSpeed: (state: SceneReducerType, action: PayloadAction<number>) =>
      void (state.speed = action.payload),
    setTimeStep: (state: SceneReducerType, action: PayloadAction<number>) =>
      void (state.timeStep = action.payload),
    reset: (state: SceneReducerType) => {
      state.rightObjects = [];
      state.leftObjects = [];
      state.equity = 0;
      state.bending = 0;
      state.elapsedTime = 0;
      state.flyingObject = null;
      state.isPlaying = false;
      state.hasReached = false;
      state.hasFailed = false;
      state.timeStep = 0;
      state.speed = OBJECT_MOVE_DELAY;
      state.elapsedTime = 0;
      state.failReason = "";
    },
  },
});

export const {
  addRightObject,
  addLeftObject,
  setEquity,
  setFlyingObject,
  setBending,
  setIsPlaying,
  setHasReached,
  setHasFailed,
  setFailReason,
  setElapsedTime,
  setSpeed,
  setTimeStep,
  reset,
} = scene.actions;

export const replay = (): AppThunk => (dispatch) => {
  dispatch(reset());
  dispatch(createFlyingObject());
  dispatch(createRightObject());
};

export const createFlyingObject = (): AppThunk => async (dispatch) => {
  const object = createRandomObjectProps("left");
  dispatch(setFlyingObject(object));
  dispatch(setHasReached(false));
};

export const moveObject =
  (direction: "left" | "right" | "bottom"): AppThunk =>
  (dispatch, getState) => {
    const {
      scene: { flyingObject },
    } = getState();

    if (flyingObject) {
      let x = flyingObject.position.x;
      let y = flyingObject.position.y;

      if (direction === "left") {
        x -= OBJECT_MOVE_STEP;
      } else if (direction === "right") {
        x += OBJECT_MOVE_STEP;
      } else if (direction === "bottom") {
        y += OBJECT_MOVE_STEP;
      }

      const newFliyngObject = {
        ...flyingObject,
        position: {
          ...flyingObject.position,
          x,
          y,
        },
      };

      dispatch(setFlyingObject(newFliyngObject));
      dispatch(onFlyingObjectReachesArm());
    }
  };

const onFlyingObjectReachesArm = (): AppThunk => (dispatch, getState) => {
  const {
    scene: { flyingObject, bending, hasFailed },
  } = getState();

  if (flyingObject) {
    const { y: armY } = document
      .getElementsByClassName("arm")[0]
      .getBoundingClientRect();

    if (
      flyingObject.position.y + getDisplayWeight(flyingObject.weight) >=
      armY
    ) {
      dispatch(setHasReached(true));
      dispatch(setEquity(-flyingObject.weight));
      dispatch(getBending());
      dispatch(
        addLeftObject({
          ...flyingObject,
          position: {
            ...flyingObject.position,
            y: -getDisplayWeight(flyingObject.weight),
          },
        })
      );
      dispatch(setFlyingObject(null));

      if (hasFailed === false) {
        setTimeout(() => {
          // Create new right object
          dispatch(createRightObject());
        }, 500);

        const bendingClause = Math.abs(bending) >= ARM_MAX_BENDING_PERCENTAGE;

        if (bendingClause) {
          dispatch(setHasFailed(true));
          dispatch(setFailReason("Failed! Weight is too high for one side!"));
          return;
        } else {
          dispatch(setHasFailed(false));
          dispatch(setHasReached(false));

          setTimeout(() => {
            dispatch(createFlyingObject());
          }, 700);
        }
      }
    }
  }
};

export const createRightObject = (): AppThunk => async (dispatch) => {
  const object = createRandomObjectProps("right");
  dispatch(setEquity(object.weight));
  dispatch(addRightObject(object));
  dispatch(getBending());
};

export const getBending = (): AppThunk => async (dispatch, getState) => {
  const {
    scene: { equity, rightObjects, leftObjects },
  } = getState();

  const bending = calcBending(equity, rightObjects, leftObjects);
  dispatch(setBending(bending));
};

export const getSpeed = (elapsedTime: number): AppThunk => async (dispatch, getState) => {

  const {scene: {timeStep, speed}} = getState();
  
    const _timeStep = Math.floor(elapsedTime / TIME_STEP) * TIME_STEP;
    
    if (_timeStep !== timeStep) {
      console.log("everyTenSeconds=> ", timeStep)
      dispatch(setSpeed(speed - (speed * 0.25)));
      dispatch(setTimeStep(_timeStep));
    }
}

export default scene.reducer;
