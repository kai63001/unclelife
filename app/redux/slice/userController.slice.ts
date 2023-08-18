"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
    data: any;
}

const initialState: FormState = {
    data: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        }
    },
});

export const {
    setUserData,
} = userSlice.actions;

export default userSlice.reducer;
