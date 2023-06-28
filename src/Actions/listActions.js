import { createAsyncThunk } from "@reduxjs/toolkit";

import listService from "../services/listService";

export const fetchAllListAction = createAsyncThunk(
  "lists/fetch",
  async (data, thunkAPI) => {
    try {
      return await listService.fetchAllList(data);
    } catch (err) {
      const message = err.response.data.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchListTaskAction = createAsyncThunk(
  "list/task/fetch",
  async (data, thunkAPI) => {
    try {
      return await listService.GetAllTasksFromList(data);
    } catch (err) {
      const message = err.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewList = createAsyncThunk(
  "list/post",
  async (name, thunkAPI) => {
    try {
      return await listService.newList(name);
    } catch (err) {
      const message = err.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteList = createAsyncThunk(
  "list/delete",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      return await listService.DeleteList(id);
    } catch (err) {
      const message = err.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "task/post",
  async (data, thunkAPI) => {
    try {
      return await listService.newTask(
        data?.name,
        data?.todoListId,
        data?.token
      );
    } catch (err) {
      const message = err.response.data.message;
      console.log(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DeleteTask = createAsyncThunk(
  "task/delete",
  async (id, thunkAPI) => {
    try {
      return await listService.DeleteTask(id);
    } catch (err) {
      const message = err.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UpdateTask = createAsyncThunk(
  "task/update",
  async (id, thunkAPI) => {
    try {
      return await listService.UpdateTask(id);
    } catch (err) {
      const message = err.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
