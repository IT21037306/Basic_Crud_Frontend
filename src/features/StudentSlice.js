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
  async (getObj, thunkAPI) => {
    try {
      return await StudentService.getAllStudents(getObj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addAStudent = createAsyncThunk(
  "students/addAStudent",
  async (student, thunkAPI) => {
    try {
      return await StudentService.addAStudent({
        name: student.name,
        age: student.age,
        address: student.address,
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStudentDetail = createAsyncThunk(
  "students/updateStudentDetail",
  async (pack, thunkAPI) => {
    try {
      return await StudentService.updateStudentDetail(pack.student, pack.id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, thunkAPI) => {
    try {
      return await StudentService.deleteStudent(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    getSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    deleteSelectedStudent: (state, action) => {
      state.allStudents = state.allStudents.filter(
        (student) => student.studentId !== action.payload
      );
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
        state.allStudents = action.payload.content;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(addAStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allStudents.push(action.payload.data);
      })
      .addCase(addAStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateStudentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.allStudents = state.allStudents.map((student) =>
          student.studentId === action.payload.data.studentId
            ? action.payload.data
            : student
        );
      })
      .addCase(updateStudentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { getSelectedStudent, deleteSelectedStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
