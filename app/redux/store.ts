"use client";
import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "./slice/formController.slice";
import UserReducer from "./slice/userController.slice";
import PomodoroReducer from "./slice/pomodoroController.slice";
import GlobalReducer from "./slice/globalController.slice";

export const store = configureStore({
  reducer: {
    formReducer: FormReducer,
    userReducer: UserReducer,
    pomodoroReducer: PomodoroReducer,
    globalReducer: GlobalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
