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
  const spinnerRef1 = useRef<{ startSpinning: () => void }>(null);
  const spinnerRef2 = useRef<{ startSpinning: () => void }>(null);
  const [generatedTitle, setGeneratedTitle] = useState<string>("");
  const [generatedResponsibility, setGeneratedResponsibility] =
    useState<string>("");
  const [spinner1Finished, setSpinner1Finished] = useState<boolean>(false);
  const [spinner2Finished, setSpinner2Finished] = useState<boolean>(false);

  const handleStartSpinning = () => {
    setSpinner1Finished(false);
    setSpinner2Finished(false);
    spinnerRef1.current?.startSpinning();
    spinnerRef2.current?.startSpinning();
  };

  const handleSpinningFinish = (finalWord: string, spinnerIndex: number) => {
    if (spinnerIndex === 1) {
      setGeneratedTitle(finalWord);
      setSpinner1Finished(true);
    } else if (spinnerIndex === 2) {
      setGeneratedResponsibility(finalWord);
      setSpinner2Finished(true);
    }
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <WordSpinner
        ref={spinnerRef1}
        words={titles}
        onFinish={(finalWord) => handleSpinningFinish(finalWord, 1)}
      />
      <WordSpinner
        ref={spinnerRef2}
        words={responsibilities}
        onFinish={(finalWord) => handleSpinningFinish(finalWord, 2)}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleStartSpinning}
      >
        Spin
      </Button>
      {spinner1Finished && spinner2Finished && (
        <div>{`${generatedTitle} of ${generatedResponsibility}`}</div>
      )}
    </div>
  );
};

export default App;
