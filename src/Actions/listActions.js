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

export const createNewList = createAsyncThunk(
  "list/post",
  async (name, thunkAPI) => {
    try {
      return await listService.newList(name);
    } catch (err) {
      const message = err.response.name.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteList = createAsyncThunk(
  "list/delete",
  async (id, thunkAPI) => {
    try {
      return await listService.DeleteList(id);
    } catch (err) {
      const message = err.response.id.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "task/post",
  async (name, thunkAPI) => {
    try {
      return await listService.newTask(name);
    } catch (err) {
      const message = err.response.name.error;
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
      const message = err.response.id.error;
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
      const message = err.response.id.error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
