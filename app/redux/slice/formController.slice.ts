"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  selectedForm: "DB" | "";
  tableOfDatabase: any[];
}

const initialState: FormState = {
  selectedForm: "",
  tableOfDatabase: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSelectedForm: (state, action: PayloadAction<any>) => {
      state.selectedForm = action.payload;
    },
    setTableOfDatabase: (state, action: PayloadAction<any>) => {
      state.tableOfDatabase = action.payload;
    },
  },
});

export const { setSelectedForm, setTableOfDatabase } = formSlice.actions;

export default formSlice.reducer;
