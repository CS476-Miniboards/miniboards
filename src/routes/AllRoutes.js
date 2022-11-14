import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Models/auth/AuthContext";
import Dashboard from "../Controller components/Dashboard";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import UpdateProfile from "../components/UpdateProfile";
import Home from "../components/Home";
import Board from "../View Components/Board";
import Game from "../View Components/Game";
import AdminList from "../View Components/AdminList";
import Signup from "../components/Signup";
import ErrorReports from "../View Components/ErrorReports";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <RequireAuth redirectTo="/login">
            <Home />
          </RequireAuth>
        }
      />
      <Route
        exact
        path="/dashboard"
        element={
          <RequireAuth redirectTo="/login">
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/update-profile"
        element={
          <RequireAuth redirectTo="/login">
            <UpdateProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/board"
        element={
          <RequireAuth redirectTo="/login">
            <Board />
          </RequireAuth>
        }
      />
      <Route
        path="/game"
        element={
          <RequireAuth redirectTo="/login">
            <Game />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAdmin redirectTo="/login">
            <AdminList />
          </RequireAdmin>
        }
      />
      <Route
        path="/signup"
        element={
          <NoAuth>
            <Signup />
          </NoAuth>
        }
      />
      <Route
        path="/login"
        element={
          <NoAuth>
            <Login />
          </NoAuth>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <NoAuth>
            <ForgotPassword />
          </NoAuth>
        }
      />
      <Route
        path="/errors"
        element={
          <RequireAdmin redirectTo="/login">
            <ErrorReports />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}

function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to={redirectTo} />;
}

function NoAuth({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : children;
}

function RequireAdmin({ children, redirectTo }) {
  const { isAdmin } = useAuth();
  return isAdmin() ? children : <Navigate to={redirectTo} />;
}
