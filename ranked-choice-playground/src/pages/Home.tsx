import logo from "../assets/logo.svg";
import "../App.css";
import React from "react";
import SetupWizard from "../components/SetupWizard/SetupWizard";
import CandidateManager from "../components/Candidates/CandidateManager";
const Home: React.FC = () => {
  const handleNext = (name: string) => {
    console.log("Generated or entered name:", name);
    // Handle the generated or entered name
  };

  return (
    <div className="App">
      <SetupWizard />
      <CandidateManager />
    </div>
  );
};

export default Home;
