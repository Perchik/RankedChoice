import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource/lexend";
import "@fontsource/manrope";

import Home from "./pages/Home";
import EditBody from "./pages/EditBody";
import Glossary from "./pages/Glossary";
import logo from "./assets/logo.svg";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
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

          <Button color="inherit" component={Link} to="/glossary">
            Glossary
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-body" element={<EditBody />} />
          <Route path="/glossary" element={<Glossary />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
