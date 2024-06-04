import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import EditBody from "./pages/EditBody";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./assets/logo.svg";
import "./App.css";
import Parties from "./pages/Parties";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "30px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/edit-body">
                Edit Body SVG
              </Nav.Link>
              <Nav.Link as={Link} to="/parties">
                Parties
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-body" element={<EditBody />} />
          <Route path="/parties" element={<Parties />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
