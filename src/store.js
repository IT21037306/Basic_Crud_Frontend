import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import studentReducer from "./features/StudentSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
