"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  databaseId: string;
  selectedForm: "DB" | "";
  tableOfDatabase: any[];
  form: any;
  layer: any[];
  infomation: any;
}

const initialState: FormState = {
  databaseId: "",
  selectedForm: "",
  tableOfDatabase: [],
  form: {
    title: "Contact Form",
  },
  infomation: {},
  layer: [],
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
    setDatabaseId: (state, action: PayloadAction<any>) => {
      state.databaseId = action.payload;
    },
    setForm: (state, action: PayloadAction<any>) => {
      state.form[action.payload.name] = action.payload.value;
    },
    setLayer: (state, action: PayloadAction<any>) => {
      state.layer = action.payload;
    },
    setInformation: (state, action: PayloadAction<any>) => {
      state.infomation = action.payload;
    },
    setLayerWithId: (state, action: PayloadAction<any>) => {
      // id find index
      const index = state.layer.findIndex((item) => item.id === action.payload.id);
      // update value
      state.layer[index] = action.payload.value;
    }

  },
});

export const {
  setSelectedForm,
  setTableOfDatabase,
  setForm,
  setLayer,
  setInformation,
  setLayerWithId,
  setDatabaseId
} = formSlice.actions;

export default formSlice.reducer;
