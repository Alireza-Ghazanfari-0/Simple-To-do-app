import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todo: [],
  loading: false,
  error: "",
};
export const addAsyncData = createAsyncThunk(
  "todo/addAsyncData",
  async (payload, { rejectWithValue }) => {
    try {
      // const response = await axios.post("http://localhost:9000/todos", {
      const response = await axios.post("https://json-server-repo-for-to-do-app.onrender.com/todos", {
        id: Date.now(),
        title: payload,
        completed: false,
      });
      //   console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAsyncData = createAsyncThunk(
  "todo/getAsyncData",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.get("http://localhost:9000/todos");
      const response = await axios.get("https://json-server-repo-for-to-do-app.onrender.com/todos");
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncData = createAsyncThunk(
  "todo/toggleAsyncData",
  async (payload, { rejectWithValue }) => {
    try {
      //   console.log(payload);

      const response = await axios.patch(
        // `http://localhost:9000/todos/${payload.id}`, 
        `https://json-server-repo-for-to-do-app.onrender.com/todos/${payload.id}`,
        {
          completed: payload.completed,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncData = createAsyncThunk(
  "todo/deleteAsyncData",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        // `http://localhost:9000/todos/${payload.id}`
        `https://json-server-repo-for-to-do-app.onrender.com/todos/${payload.id}`
      );
      console.log(data);

      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        state.todo.push(action.payload);
      })
      .addCase(addAsyncData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAsyncData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = action.payload;
      })
      .addCase(getAsyncData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleAsyncData.fulfilled, (state, action) => {
        state.loading = false;
        // const selected = state.todo.find(
        //   (item) => Number(item.id) === Number(action.payload.id)
        // );
        const uploaded = state.todo.map((item) =>
          Number(item.id) === Number(action.payload.id) ? action.payload : item
        );
        state.todo = uploaded;

        // selected.completed = action.payload.completed;
      })
      .addCase(deleteAsyncData.fulfilled, (state, action) => {
        state.todo = state.todo.filter(
          (item) => Number(item.id) !== Number(action.payload.id)
        );
      });
  },
});

export default toDoSlice.reducer;
// export const { uploadData } = toDoSlice.actions;
