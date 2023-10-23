"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  databaseId: string;
  workspaceId: string;
  selectedForm: "DB" | "";
  databaseName: string;
  tableOfDatabase: any[];
  form: any;
  layer: any[];
  logic: any;
  infomation: any;
  notification: any;
  alertPro: any[];
  modalMapInputOpen: boolean;
}

const initialState: FormState = {
  databaseId: "",
  workspaceId: "",
  selectedForm: "",
  databaseName: "",
  tableOfDatabase: [],
  form: {
    title: "Untitle",
    button: {
      text: "Submit",
      color: "#000000",
      position: "flex-start",
    },
    pro: {},
    free: {},
  },
  infomation: {},
  layer: [],
  logic: [],
  notification: {
    // respondentEmail: {
    //   enable: false,
    //   sendTo: undefined,
    //   replyTo: "",
    //   senderName: "UncelLife",
    //   emailSubject: "Your Submission Has Been Recorded!",
    //   emailContent: `<p>Hey there! 😁</p>
    //   <p>Just letting you know that UncleLife has successfully received your form submission.</p>`,
    // },
  },
  alertPro: [],
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
    setDatabaseName: (state, action: PayloadAction<any>) => {
      state.databaseName = action.payload;
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
      state.workspaceId = initialState.workspaceId;
      state.databaseId = initialState.databaseId;
      state.databaseName = initialState.databaseName;
      state.tableOfDatabase = initialState.tableOfDatabase;
      state.alertPro = initialState.alertPro;
      state.modalMapInputOpen = initialState.modalMapInputOpen;
      state.logic = initialState.logic;
      state.notification = initialState.notification;
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
    },
    setAlert: (state, action: PayloadAction<any>) => {
      state.alertPro = action.payload;
    },
    setWorkspaceId: (state, action: PayloadAction<any>) => {
      state.workspaceId = action.payload;
    },
    setLogic: (state, action: PayloadAction<any>) => {
      state.logic = action.payload;
    },
    addLogic: (state, action: PayloadAction<any>) => {
      state.logic.push(action.payload);
    },
    deleteLogic: (state, action: PayloadAction<any>) => {
      const index = state.logic.findIndex(
        (item: any) => item.layerId === action.payload.layerId
      );
      state.logic.splice(index, 1);
    },
    updateLogic: (state, action: PayloadAction<any>) => {
      const index = state.logic.findIndex(
        (item: any) => item.layerId === action.payload.layerId
      );
      state.logic[index] = action.payload;
    },
    setNotification: (state, action: PayloadAction<any>) => {
      state.notification = action.payload;
    },
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
  clearAllData,
  setDatabaseName,
  setAlert,
  setWorkspaceId,
  setLogic,
  addLogic,
  deleteLogic,
  setNotification,
} = formSlice.actions;

export default formSlice.reducer;
