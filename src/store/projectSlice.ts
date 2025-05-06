import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IProjectState {
    projectId: string;
}

const initialState: IProjectState = {
    projectId: "",
};

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjectState: (state, action: PayloadAction<string>) => {
            console.log('payload is ', action.payload);
            state.projectId = action.payload;
        },
    },
});

export const { setProjectState } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;