import { calcBending } from "./../../helpers/Common";
import { getDisplayWeight } from "./../../components/WeightObject/WeightObject";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ARM_MAX_BENDING_PERCENTAGE,
  OBJECT_MOVE_STEP,
} from "../../constants";
import { createRandomObjectProps } from "../../helpers/Common";
import ObjectProps from "../../types/ObjectProps";
import { AppThunk } from "../store";

type SceneReducerType = {
  rightObjects: ObjectProps[];
  leftObjects: ObjectProps[];
  flyingObject: ObjectProps | null;
  equity: number;
  bending: number;
  started: boolean;
  paused: boolean;
  hasReached: boolean;
  hasFailed: boolean;
};

const initialState: SceneReducerType = {
  rightObjects: [],
  leftObjects: [],
  flyingObject: null,
  equity: 0,
  bending: 0,
  started: false,
  paused: false,
  hasReached: false,
  hasFailed: false,
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
    setStarted: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.started = action.payload),
    setPaused: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.paused = action.payload),
    setHasReached: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.hasReached = action.payload),
    setHasFailed: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.hasFailed = action.payload),
    reset: (state: SceneReducerType) => {
      state.rightObjects = [];
      state.leftObjects = [];
      state.equity = 0;
      state.bending = 0;
      state.flyingObject = null;
      state.started = false;
      state.paused = false;
      state.hasReached = false;
      state.hasFailed = false;
    }
  },
});

export const {
  addRightObject,
  addLeftObject,
  setEquity,
  setFlyingObject,
  setBending,
  setStarted,
  setPaused,
  setHasReached,
  setHasFailed,
  reset
} = scene.actions;

export const replay = (): AppThunk => (dispatch) => {
  dispatch(reset());
  dispatch(createFlyingObject());
  dispatch(getObject("right"));
}

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

    if (flyingObject.position.y + getDisplayWeight(flyingObject.weight) >= armY) {
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
        
        dispatch(getObject("right"));
        console.log("bending", bending);

        if (Math.abs(bending) >= ARM_MAX_BENDING_PERCENTAGE) {
          dispatch(setHasFailed(true));
          return;

        } else {
          dispatch(setHasFailed(false));
          dispatch(createFlyingObject());
          dispatch(setHasReached(false));

        }
      }
    }
  }
};

export const getObject =
  (direction: "left" | "right"): AppThunk =>
  async (dispatch) => {
    const object = createRandomObjectProps(direction);
    dispatch(setEquity(direction === "left" ? 0 : object.weight));
    // the equity is initially 0 for the left object. Because equity will be set after the left object reaches the arm

    dispatch(
      direction === "left" ? addLeftObject(object) : addRightObject(object)
    );

    if (direction === "right") {
      dispatch(getBending());
    }
  };

export const getBending = (): AppThunk => async (dispatch, getState) => {
  const {
    scene: { equity, rightObjects, leftObjects },
  } = getState();

  const bending = calcBending(equity, rightObjects, leftObjects);
  dispatch(setBending(bending));
};

export default scene.reducer;
