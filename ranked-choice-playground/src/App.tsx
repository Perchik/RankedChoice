import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useState } from "react";
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
  const [generatedWord, setGeneratedWord] = useState<string>("");
  const handleStartSpinning = () => {
    spinnerRef.current?.startSpinning();
  };

  const handleSpinningFinish = (finalWord: string) => {
    setGeneratedWord(finalWord);
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <WordSpinner
        ref={spinnerRef}
        words={titles}
        onFinish={handleSpinningFinish}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleStartSpinning}
      >
        Spin
      </Button>

      {generatedWord}
    </div>
  );
};

export default App;
