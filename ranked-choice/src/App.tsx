import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.component";
import ElectionWizard from "./components/Wizard.component";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/wizard" element={<ElectionWizard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
