import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import EditBody from "./pages/EditBody";
import { IconButton } from "@mui/material";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <IconButton component={Link} to="/" aria-label="home">
                <img src={logo} className="App-logo" alt="logo" />
              </IconButton>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/edit-body">Edit Body</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-body" element={<EditBody />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
