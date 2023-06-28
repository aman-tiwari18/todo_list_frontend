import "./App.css";

import Login from "./components/Login";

import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import TodoPage from "./components/TodoPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRouteTodo = ({ state, children }) => {
  if (!state.user) {
    return <Navigate replace to="/todo_list_frontend/login" />;
  }
  return children;
};

const PrivateRouteLogin = ({ state, children }) => {
  if (state.user) {
    return <Navigate replace to={"/todo_list_frontend"} />;
  }

  return children;
};

function App() {
  // const { isAuthenticated } = useSelector((state) => state.user);
  const state = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/todo_list_frontend/login"
          element={
            <PrivateRouteLogin state={state}>
              <Login />
            </PrivateRouteLogin>
          }
        />
        <Route
          exact
          path="/todo_list_frontend"
          element={
            <PrivateRouteTodo state={state}>
              <TodoPage />
            </PrivateRouteTodo>
          }
        />
        <Route
          exact
          path="/todo_list_frontend/register"
          element={
            <PrivateRouteLogin state={state}>
              <Register />
            </PrivateRouteLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
