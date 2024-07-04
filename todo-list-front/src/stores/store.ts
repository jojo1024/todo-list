import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import taskReducer, { ITaskState } from "./taskSlice";

export interface IReduxState {
    task: ITaskState;
}

const reducers = combineReducers({
    task: taskReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: [], // liste des slices qui doivent etre persister
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.MODE === 'development',
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
