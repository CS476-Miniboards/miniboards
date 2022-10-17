import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "../Models/auth/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../Controller components/Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "./Home";
import Header from "../Controller components/Header";
import { db } from "../firebase";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
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
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </div>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

function RequireAuth({ children, redirectTo }) {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? children : <Navigate to={redirectTo} />;
}

export default App;
