import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { projectReducer } from "@/store/projectSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const projectPersistConfig = {
    key: "project",
    storage: storage,
    whitelist: ["projectId"],
};

const rootReducer = combineReducers({
    project: persistReducer(projectPersistConfig, projectReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;