import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import counterReducer from "./counter/counterSlice";
import toDoReducer from "./todo/toDoSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: toDoReducer,
  },
});

export default store;
