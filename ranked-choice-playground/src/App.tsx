import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WordSpinner from "./components/WordSpinner/WordSpinner.component";

const titles: string[] = [
  "Senator",
  "Governor",
  "Mayor",
  "Council Member",
  "President",
];
const responsibilities: string[] = [
  "Healthcare",
  "Education",
  "Infrastructure",
  "Public Safety",
  "Economy",
];
function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <WordSpinner />
    </div>
  );
}

export default App;
