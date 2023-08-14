"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  databaseId: string;
  selectedForm: "DB" | "";
  tableOfDatabase: any[];
  form: any;
  layer: any[];
  infomation: any;
  modalMapInputOpen: boolean;
}

const initialState: FormState = {
  databaseId: "",
  selectedForm: "",
  tableOfDatabase: [],
  form: {
    title: "Contact Form",
    button: {
      text: "Submit",
      color: "#000000",
      position: "flex-start"
    },
    customizations: {

    }
  },
  infomation: {},
  layer: [],
  modalMapInputOpen: false,
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
    setAllForm: (state, action: PayloadAction<any>) => {
      state.form = action.payload;
    },
    setForm: (state, action: PayloadAction<any>) => {
      state.form[action.payload.name] = action.payload.value;
    },
    setLayer: (state, action: PayloadAction<any>) => {
      state.layer = action.payload;
    },
    addMoreLayer: (state, action: PayloadAction<any>) => {
      // rerun all id in layer
      state.layer = state.layer.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      state.layer.push({
        id: state.layer.length + 1,
        ...action.payload,
      });
    },
    clearAllData: (state) => {
        state.form = initialState.form;
        state.layer = [];
        state.infomation = initialState.infomation;
        state.selectedForm = initialState.selectedForm;
    },
    setInformation: (state, action: PayloadAction<any>) => {
      state.infomation = action.payload;
    },
    setLayerWithId: (state, action: PayloadAction<any>) => {
      // id find index
      const index = state.layer.findIndex(
        (item) => item.id === action.payload.id
      );
      // update value
      state.layer[index] = action.payload.value;
    },
    setMapFromLayerWithId: (state, action: PayloadAction<any>) => {
      // id find index
      const index = state.layer.findIndex(
        (item) => item.id === action.payload.id
      );
      // update value
      state.layer[index].mapTo = action.payload.mapTo;
      // map type
      state.layer[index].mapType = action.payload.mapType;
    },
    deleteLayerWithId: (state, action: PayloadAction<any>) => {
      // id find index
      const index = state.layer.findIndex(
        (item) => item.id === action.payload.id
      );
      // update value
      state.layer.splice(index, 1);
    },
    updateModalMapInputOpen: (state, action: PayloadAction<any>) => {
      state.modalMapInputOpen = action.payload;
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
  setDatabaseId,
  addMoreLayer,
  deleteLayerWithId,
  setMapFromLayerWithId,
  setAllForm,
  updateModalMapInputOpen,
  clearAllData
} = formSlice.actions;

export default formSlice.reducer;
