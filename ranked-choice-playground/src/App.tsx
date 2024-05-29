import logo from "./logo.svg";
import "./App.css";
import React, { useRef } from "react";
import { Button } from "@mui/material";

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
const App: React.FC = () => {
  const spinnerRef = useRef<{ startSpinning: () => void }>(null);

  const handleExternalStart = () => {
    spinnerRef.current?.startSpinning();
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <WordSpinner ref={spinnerRef} words={titles} />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleExternalStart}
      >
        Spin
      </Button>
    </div>
  );
};

export default App;
