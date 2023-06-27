"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  selectedForm: "DB" | "";
  tableOfDatabase: any[];
  form: any;
}

const initialState: FormState = {
  selectedForm: "",
  tableOfDatabase: [],
  form: {
    title: "Contact Form",
  },
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
    setForm: (state, action: PayloadAction<any>) => {
      state.form[action.payload.name] = action.payload.value;
    },
  },
});

export const { setSelectedForm, setTableOfDatabase, setForm } =
  formSlice.actions;

export default formSlice.reducer;
