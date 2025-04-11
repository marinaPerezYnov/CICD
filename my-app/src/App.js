
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import SaveUserDatasPage from "./Pages/SaveUserDatasPage";
import UsersPage from "./Pages/UsersPage";

function App({ disableRouter }) {
  const Wrapper = disableRouter ? React.Fragment : Router; // Désactive le routeur si demandé

  return (
    // <Router>
      <Wrapper>
      <div className="App">
          <Routes>
            <Route exact path="/CICD" element={<SaveUserDatasPage />}></Route>
            <Route exact path="/CICD/listUsers" element={<UsersPage />}></Route>
          </Routes>
      </div>
      </Wrapper>
    // </Router>
  );
}

export default App;
