import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

const API_URL = "https://mraman.pythonanywhere.com";

const token = getLocalStorage("user")?.token;

const fetchAllList = async (data) => {
  const response = await axios.get(API_URL + "/api/v1/todo-list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${data?.token}`,
    },
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const newList = async (list) => {
  console.log({ token });

  const response = await axios.post(API_URL + "/api/v1/todo-list", list, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const DeleteList = async (id) => {
  const response = await axios.delete(API_URL + "/api/v1/todo-list/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const newTask = async (name, todoListId, token) => {
  console.log(token);
  const response = await axios.post(
    API_URL + `/api/v1/task/${todoListId}`,
    {
      name,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const DeleteTask = async (id) => {
  const response = await axios.delete(API_URL + "/api/v1/task/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const UpdateTask = async (id) => {
  const response = await axios.patch(API_URL + "/api/v1/task/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.data) {
    setLocalStorage("Lists", response.data);
  }
  return response.data;
};

const GetAllTasksFromList = async (id) => {
  const response = await axios.get(API_URL + "/api/v1/todo-list/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (response.data) {
    setLocalStorage("tasks", response.data);
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
  GetAllTasksFromList,
};
export default listService;
