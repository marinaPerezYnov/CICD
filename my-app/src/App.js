
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import SaveUserDatasPage from "./Pages/SaveUserDatasPage";
import UsersPage from "./Pages/UsersPage";
import AdminPage from "./Pages/AdminPage";
import RegisterPage from "./Pages/RegisterPage";
import ConnectionPage from "./Pages/ConnectionPage";

function App({ disableRouter }) {
  const Wrapper = disableRouter ? React.Fragment : ({ children }) => (
    <Router future={{ v7_startTransition: true }}>{children}</Router>
  );
  return (
    <Wrapper>
      <div className="App">
          <Routes>
            <Route exact path="/CICD" element={<SaveUserDatasPage />}></Route>
            <Route exact path="/CICD/listUsers" element={<UsersPage />}></Route>
            <Route exact path="/CICD/admin" element={<AdminPage />}></Route>
            <Route exact path="/CICD/admin/s-inscrire" element={<RegisterPage />}></Route>
            <Route exact path="/CICD/admin/se-connecter" element={<ConnectionPage />}></Route>
          </Routes>
      </div>
    </Wrapper>
  );
}

export default App;
