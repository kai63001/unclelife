"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
    workspace: any;
}

const initialState: GlobalState = {
    workspace: null
};

export const globalState = createSlice({
    name: "global",
    initialState,
    reducers: {
        setWorkspace: (state, action: PayloadAction<any>) => {
            state.workspace = action.payload;
        }
    },
});

export const {
    setWorkspace,
} = globalState.actions;

export default globalState.reducer;
