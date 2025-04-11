
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import SaveUserDatasPage from "./Pages/SaveUserDatasPage";
import UsersPage from "./Pages/UsersPage";

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
          </Routes>
      </div>
    </Wrapper>
  );
}

export default App;
