"use client";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export interface PomodoroState {
    customTimer: any[];
    selectedCustomTimer: number;
    counting: 'start' | 'pause' | 'stop';
}

const initialState: PomodoroState = {
    customTimer: [
        {
            name: "📚 Pomodoro",
            time: 25,
        },
        {
            name: "☕️ Short Break",
            time: 5,
        },
        {
            name: "🛌 Long Break",
            time: 15,
        }
    ],
    selectedCustomTimer: 0,
    counting: 'stop',
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
        },
        setCounting: (state, action: PayloadAction<any>) => {
            state.counting = action.payload;
        }
    },
});

export const {
    setCustomTimer,
    setSelectedCustomTimer,
    setCounting
} = pomodoro.actions;

export default pomodoro.reducer;
