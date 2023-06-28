import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "../Actions/authActions";

import { getLocalStorage } from "../helpers/localStorage";
import {
  DeleteTask,
  UpdateTask,
  createNewList,
  createNewTask,
  deleteList,
  fetchAllListAction,
} from "../Actions/listActions";

const USER = getLocalStorage("user") ? getLocalStorage("user") : null;
const initialState = {
  user: USER,
  //   classes: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(fetchAllListAction.fulfilled, (state, action) => {
        state.classes = action.payload?.data;
        state.isSuccess = true;
      })
      .addCase(fetchAllListAction.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchAllListAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(createNewList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNewTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(DeleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(DeleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UpdateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(UpdateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = authSlice.actions;
export const { resetList } = authSlice.actions;
export default authSlice.reducer;

// newPostRequest: (state) => {
//     state.loading = true;
//   },
//   newPostSuccess: (state, action) => {
//     state.loading = false;
//     state.message = action.payload;
//   },
//   newPostFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//   },
