import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "../Models/auth/AuthContext";
import { GameListProvider } from "../Models/gameList/GameListContext";

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
import Board from "../View Components/Board";
import Game from "../View Components/Game";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <GameListProvider>
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
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </div>
            </Container>
          </GameListProvider>
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
