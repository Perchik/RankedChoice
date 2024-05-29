import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ElectionNameGenerator from "./components/ElectionNameGenerator/ElectionNameGenerator.component";

const App: React.FC = () => {
  const handleNext = (name: string) => {
    console.log("Generated or entered name:", name);
    // Handle the generated or entered name
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <ElectionNameGenerator onNext={handleNext} />
    </div>
  );
};

export default App;