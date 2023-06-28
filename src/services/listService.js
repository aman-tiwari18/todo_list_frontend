import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

// const API_URL = process.env.REACT_APP_API_URL;

const token = getLocalStorage("user")?.token;
console.log(token);
const fetchAllList = async (data) => {
  const response = await axios.get("http://localhost:8000/api/v1/todo-list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    data,
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const newList = async (name) => {
  const response = await axios.post("http://localhost:8000/api/v1/todo-list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    name,
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const DeleteList = async (id) => {
  const response = await axios.delete(
    "http://localhost:8000/api/v1/todo-list/" + id
  );
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const newTask = async (name) => {
  const response = await axios.post("http://localhost:8000/api/v1/task", name);
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const DeleteTask = async (id) => {
  const response = await axios.delete(
    "http://localhost:8000/api/v1/task/" + id
  );
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const UpdateTask = async (id) => {
  const response = await axios.patch("http://localhost:8000/api/v1/task/" + id);
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const listService = {
  fetchAllList,
  newList,
  DeleteList,
  newTask,
  DeleteTask,
  UpdateTask,
};
export default listService;
