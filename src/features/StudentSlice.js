import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import StudentService from "./StudentService";

const initialState = {
  allStudents: [],
  selectedStudent: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllStudents = createAsyncThunk(
  "students/getAllStudents",
  async (_, thunkAPI) => {
    try {
      return await StudentService.getAllStudents();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allStudents = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
