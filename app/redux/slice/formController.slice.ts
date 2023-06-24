"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  selectedForm: "DB" | "";
}

const initialState: FormState = {
  selectedForm: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSelectedForm: (state, action: PayloadAction<FormState>) => {
      state.selectedForm = action.payload.selectedForm;
    },
  },
});

export const { setSelectedForm } = formSlice.actions;

export default formSlice.reducer;
