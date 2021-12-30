import { getDisplayWeight } from './../../components/WeightObject/WeightObject';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ARM_MAX_BENDING_PERCENTAGE, ARM_WIDTH, OBJECT_MOVE_STEP } from "../../constants";
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
    setFlyingObject: (state: SceneReducerType, action: PayloadAction<ObjectProps | null>) =>
      void (state.flyingObject = action.payload),
    setStarted: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.started = action.payload),
    setPaused: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.paused = action.payload),
    setHasReached: (state: SceneReducerType, action: PayloadAction<boolean>) =>
      void (state.hasReached = action.payload),
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
  setHasReached
} = scene.actions;

// create a method to add an object to the scene with async dispatch
// export const getRightObject = (): AppThunk => async (dispatch) => {
//   const object = createRandomObjectProps();
//   dispatch(setEquity(object.weight));
//   dispatch(addRightObject(object));
// }


export const createFlyingObject = (): AppThunk => async (dispatch) => {
  const object = createRandomObjectProps("left");
  dispatch(setFlyingObject(object));
}

export const moveObject = (direction: 'left' | 'right' | 'bottom',  ): AppThunk => (dispatch, getState) => {
  const { scene: { flyingObject }} = getState();
  
  if (flyingObject) {

    let x = flyingObject.position.x;
    let y = flyingObject.position.y;

    if(direction === 'left') {
      x -= OBJECT_MOVE_STEP;
    }else if(direction === 'right') {
      x += OBJECT_MOVE_STEP;
    }else if(direction === 'bottom') {
      y += OBJECT_MOVE_STEP;
    }

  

    const newFliyngObject = {
      ...flyingObject, 
      position: {
        ...flyingObject.position, 
        x,
        y
      }};

      const {y: armY} = document.getElementsByClassName('arm')[0].getBoundingClientRect();

      if( (y + getDisplayWeight(flyingObject.weight)) >= armY ){
        dispatch(setHasReached(true));
        dispatch(setEquity(-flyingObject.weight))     
        dispatch(calculateBending());
        dispatch(addLeftObject({...flyingObject, position: {...flyingObject.position, y: -getDisplayWeight(flyingObject.weight)}}));
        dispatch(setFlyingObject(null));
        return;
      }

      console.log("objectY", y);
      console.log("armY", armY);    

      dispatch(setFlyingObject(newFliyngObject));
  
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
      dispatch(calculateBending());
    }
  };

export const calculateBending = (): AppThunk => async (dispatch, getState) => {
  const {
    scene: { equity, rightObjects, leftObjects },
  } = getState();

  const rightPower = rightObjects.reduce(
    (power, object) => power + object.position.x / (ARM_WIDTH + 10),
    0
  );
  
  const leftPower = leftObjects.reduce(
    (power, object) => power + object.position.x / (ARM_WIDTH + 10),
    0
  );

  console.log('equit => ', equity)

  const bending = Math.min(equity *  Math.abs(leftPower - rightPower), ARM_MAX_BENDING_PERCENTAGE);
  dispatch(setBending(bending));
};

export default scene.reducer;
