import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "../Models/AppContext";
import Header from "../Controller components/Header";
import AllRoutes from "../routes/AllRoutes";

function App() {
  return (
    <>
      <Router>
        <AppProvider>
          <Header>
            <div className="main-div">
              <AllRoutes />
            </div>
          </Header>
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
