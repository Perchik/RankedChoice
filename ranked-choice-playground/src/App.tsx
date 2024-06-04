import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import EditBody from "./pages/EditBody";
import Parties from "./pages/Parties";
import logo from "./assets/logo.svg";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ height: "30px" }}
              />
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/edit-body">
              Edit Body SVG
            </Button>
            <Button color="inherit" component={Link} to="/parties">
              Parties
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-body" element={<EditBody />} />
            <Route path="/parties" element={<Parties />} />
          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;
