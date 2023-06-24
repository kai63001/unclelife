"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  selectedForm: string;
}

const initialState: FormState = {
  selectedForm: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSelectedForm: (state, action: PayloadAction<string>) => {
      state.selectedForm = action.payload;
    },
  },
});

export const { setSelectedForm } = formSlice.actions;

export default formSlice.reducer;
