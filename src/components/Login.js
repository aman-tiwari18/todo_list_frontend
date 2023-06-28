import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../auth/authSlice";
import { loginUser } from "../Actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      // notify("Fill all the fields", ERROR_NOTIFICATION, "error");
      return;
    } else {
      const userData = {
        username: username,
        password: password,
      };

      dispatch(loginUser(userData));
    }
  };

  return (
    <div>
      <div className="text-gray-800 text-3xl flex mt-4 justify-center font-bold">
        Login
      </div>
      <div className="max-w-md mx-auto mt-8">
        <form className="bg-blue-300 shadow-md rounded px-8 py-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
        <Link to="/register">don't have a account?</Link>
      </div>
    </div>
  );
};

export default Login;
