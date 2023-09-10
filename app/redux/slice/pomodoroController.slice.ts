"use client";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export interface PomodoroState {
    customTimer: any[];
    selectedCustomTimer: number;
}

const initialState: PomodoroState = {
    customTimer: [
        {
            name: "Pomodoro",
            time: 25,
        },
        {
            name: "Short Break",
            time: 5,
        },
        {
            name: "Long Break",
            time: 15,
        }
    ],
    selectedCustomTimer: 0,
};

export const pomodoro = createSlice({
    name: "pomodoro",
    initialState,
    reducers: {
        setCustomTimer: (state, action: PayloadAction<any>) => {
            state.customTimer = action.payload;
        },
        setSelectedCustomTimer: (state, action: PayloadAction<any>) => {
            state.selectedCustomTimer = action.payload;
        }
    },
});

export const {
    setCustomTimer,
    setSelectedCustomTimer,
} = pomodoro.actions;

export default pomodoro.reducer;
