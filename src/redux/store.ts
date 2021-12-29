import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import SceneReducer from "./reducers/SceneReducer";



const store = configureStore({ reducer: {
    scene: SceneReducer    
} });

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, Store, null, Action<string>>;
export default store;
