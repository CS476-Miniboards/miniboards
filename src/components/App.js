import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../Models/auth/AuthContext";
import { GameListProvider } from "../Models/gameList/GameListContext";

import { BrowserRouter as Router } from "react-router-dom";

import Header from "../Controller components/Header";
import AllRoutes from "../routes/AllRoutes";
import { AdminProvider } from "../Models/admin/AdminContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AdminProvider>
            <GameListProvider>
              <Header />
              <div className="main-div">
                <AllRoutes />
              </div>
            </GameListProvider>
          </AdminProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
