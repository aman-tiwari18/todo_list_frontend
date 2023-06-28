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
  fetchListTaskAction,
} from "../Actions/listActions";

const user = getLocalStorage("user");

const USER = user ?? null;
const initialState = {
  user: USER,
  list: [],
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isListLoading: false,
  isListError: false,
  isListSuccess: false,
  isTaskSuccess: false,
  isTaskError: false,
  isTaskLoading: false,
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
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(fetchAllListAction.fulfilled, (state, action) => {
        state.list = action.payload?.data;
        state.isListSuccess = true;
        state.isListError = false;
        state.isListLoading = false;
      })
      .addCase(fetchAllListAction.rejected, (state, action) => {
        state.isListSuccess = false;
        state.isListLoading = false;
        state.isListError = true;
        state.message = action.payload;
      })
      .addCase(fetchAllListAction.pending, (state) => {
        state.isListLoading = true;
        state.isListError = false;
        state.isListSuccess = false;
      })
      .addCase(createNewList.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.isListSuccess = true;
        let newList = state.list.some(
          (item) => item?.id === action.payload?.data?.id
        );
        if (!newList) {
          state.list = [...state.list, action.payload?.data];
        }
      })
      .addCase(createNewList.pending, (state) => {
        state.isListLoading = true;
      })
      .addCase(createNewList.rejected, (state, action) => {
        state.isListLoading = false;
        state.isListError = true;
        state.message = action.payload;
      })
      .addCase(deleteList.pending, (state) => {
        state.isListLoading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        let todo = state.list.filter((t) => t.id !== action?.payload?.id);
        state.list = todo;
        state.isListLoading = false;
        state.isListSuccess = true;
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.isListLoading = false;
        state.isListError = true;
        state.message = action.payload;
      })
      .addCase(createNewTask.pending, (state) => {
        state.isTaskLoading = true;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskSuccess = true;
        state.user = action.payload;
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskError = true;
        state.message = action.payload;
      })
      .addCase(DeleteTask.pending, (state) => {
        state.isTaskLoading = true;
      })
      .addCase(DeleteTask.fulfilled, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskSuccess = true;
      })
      .addCase(DeleteTask.rejected, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskError = true;
        state.message = action.payload;
      })
      .addCase(UpdateTask.pending, (state) => {
        state.isTaskLoading = true;
      })
      .addCase(UpdateTask.fulfilled, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskSuccess = true;
      })
      .addCase(UpdateTask.rejected, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskError = true;
        state.message = action.payload;
      })
      .addCase(fetchListTaskAction.rejected, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskError = true;
        state.isTaskSuccess = false;
        state.message = action.payload;
      })
      .addCase(fetchListTaskAction.pending, (state, action) => {
        state.isTaskLoading = true;
        state.isTaskError = false;
        state.isTaskSuccess = false;
        state.message = action.payload;
      })
      .addCase(fetchListTaskAction.fulfilled, (state, action) => {
        state.isTaskLoading = false;
        state.isTaskError = false;
        state.isTaskSuccess = true;
        state.tasks = [...action.payload?.data];
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = authSlice.actions;
export const { resetList } = authSlice.actions;
export default authSlice.reducer;
