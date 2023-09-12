"use client";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export interface PomodoroState {
    customTimer: any[];
    selectedCustomTimer: number;
    counting: 'start' | 'pause' | 'stop';
    customization: {
        tab: {
            backgroundColor: string;
            backgroundColorHover: string;
            color: string;
            colorHover: string;
            borderColor: string;
        }
        tabSelected: {
            backgroundColor: string;
            backgroundColorHover: string;
            color: string;
            colorHover: string;
            borderColor: string;
        }
        start: {
            backgroundColor: string;
            backgroundColorHover: string;
            color: string;
            colorHover: string;
            borderColor: string;
        }
        pause: {
            backgroundColor: string;
            backgroundColorHover: string;
            color: string;
            colorHover: string;
            borderColor: string;
        }
        pomodoro: {
            color: string;
        }
        resetColor: {
            color: string;
        }
    }
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
    customization: {
        tab: {
            backgroundColor: 'transparent',
            backgroundColorHover: '#e7e7e7',
            color: '#000000',
            colorHover: '#000000',
            borderColor: '#e7e7e7',
        },
        tabSelected: {
            backgroundColor: '#000000',
            backgroundColorHover: '#000000',
            color: '#ffffff',
            colorHover: '#ffffff',
            borderColor: '#000000',
        },
        start: {
            backgroundColor: 'transparent',
            backgroundColorHover: '#e7e7e7',
            color: '#000000',
            colorHover: '#000000',
            borderColor: '#e7e7e7',
        },
        pause: {
            backgroundColor: '#000000',
            backgroundColorHover: '#000000',
            color: '#ffffff',
            colorHover: '#ffffff',
            borderColor: '#e7e7e7',
        },
        pomodoro: {
            color: '#000000',
        },
        resetColor: {
            color: '#000000',
        }
    },
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
        },
        setCustomization: (state, action: PayloadAction<{
            type: 'tab' | 'start' | 'pause' | 'pomodoro' | 'tabSelected' | 'resetColor',
            key: 'backgroundColor' | 'color',
            value: string
        }>) => {
            // @ts-ignore
            state.customization[action.payload.type][action.payload.key] = action.payload.value;
        }
    },
});

export const {
    setCustomTimer,
    setSelectedCustomTimer,
    setCounting,
    setCustomization
} = pomodoro.actions;

export default pomodoro.reducer;
