import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRandomObjectProps, ObjectProps } from "../../helpers/Common";
import { AppThunk } from "../store";

type SceneReducerType = {
  rightObjects: ObjectProps[];
  leftObjects: ObjectProps[];
  equity: number;
};

const initialState: SceneReducerType = {
  rightObjects: [],
  leftObjects: [],
  equity: 0,
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
    setEquity: (state: SceneReducerType, action: PayloadAction<number>) => void (state.equity = state.equity + action.payload),
  },
});

export const { addRightObject, addLeftObject, setEquity } = scene.actions;


// create a method to add an object to the scene with async dispatch
export const getRightObject = (): AppThunk => async (dispatch) => {
  const object = createRandomObjectProps();
  dispatch(setEquity(object.weight));
  dispatch(addRightObject(object));
}

export const getObject = (direction: 'left' | 'right'): AppThunk => async (dispatch) => {
  const object = createRandomObjectProps();
  dispatch(setEquity(direction === 'left' ? 0 : object.weight)); 
  // the equity is initially 0 for the left object. Because equity will be set after the left object reaches the arm

  dispatch(direction === 'left' ? addLeftObject(object) : addRightObject(object));
}



export default scene.reducer;
