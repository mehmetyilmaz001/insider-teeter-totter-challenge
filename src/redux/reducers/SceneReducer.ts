import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ARM_MAX_BENDING_PERCENTAGE, ARM_WIDTH } from "../../constants";
import { createRandomObjectProps } from "../../helpers/Common";
import ObjectProps from "../../types/ObjectProps";
import { AppThunk } from "../store";

type SceneReducerType = {
  rightObjects: ObjectProps[];
  leftObjects: ObjectProps[];
  flyingObject: ObjectProps | null;
  equity: number;
  bending: number;
};

const initialState: SceneReducerType = {
  rightObjects: [],
  leftObjects: [],
  flyingObject: null,
  equity: 0,
  bending: 0,
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
    setFlyingObject: (state: SceneReducerType, action: PayloadAction<ObjectProps>) =>
      void (state.flyingObject = action.payload),
  },
});

export const {
  addRightObject,
  addLeftObject,
  setEquity,
  setFlyingObject,
  setBending,
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
    scene: { equity, rightObjects },
  } = getState();

  const rightPower = rightObjects.reduce(
    (power, object) => power + object.position.x / (ARM_WIDTH + 10),
    0
  );
  const bending = Math.min(equity * rightPower, ARM_MAX_BENDING_PERCENTAGE);
  dispatch(setBending(bending));
};

export default scene.reducer;
