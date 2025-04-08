
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import LoginPage from "./Pages/LoginPage";
import UsersPage from "./Pages/UsersPage";

function App() {

  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exact path="/CICD" element={<LoginPage />}></Route>
            <Route exact path="/CICD/listUsers" element={<UsersPage />}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
