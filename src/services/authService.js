import axios from "axios";
import { setLocalStorage } from "../helpers/localStorage";

// const API_URL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/register",
    userData
  );

  if (response.data) {
    setLocalStorage("user", response.data);
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/login",
    userData
  );
  if (response.data) {
    setLocalStorage("user", response.data);
  }
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
