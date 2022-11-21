import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Models/auth/AuthContext";
import { useAdmin } from "../Models/admin/AdminContext";
import Dashboard from "../Controller components/Dashboard";
import Login from "../Controller components/Login";
import ForgotPassword from "../Controller components/ForgotPassword";
import UpdateProfile from "../Controller components/UpdateProfile";
import Home from "../View Components/Home";
import Board from "../View Components/Board";
import Game from "../View Components/Game";
import Signup from "../Controller components/Signup";
import ErrorReports from "../View Components/ErrorReports";
import ReportError from "../Controller components/ReportError";

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
      <Route
        path="/report-error"
        element={
          <RequireAuth redirectTo="/login">
            <ReportError />
          </RequireAuth>
        }
      />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// Must be authenticated to access this route
function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to={redirectTo} />;
}

// Authentication not required to access this route
function NoAuth({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : children;
}

// Admin permission required to access this route
function RequireAdmin({ children, redirectTo }) {
  const { isAdmin } = useAdmin();
  return isAdmin() ? children : <Navigate to={redirectTo} />;
}
