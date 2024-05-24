import React, { useState } from "react";
import SetupElection from "./wizard/SetupElection.component";
import SetupParties from "./wizard/SetupParties.component";
import SetupVoters from "./wizard/SetupVoters.component";
import ProgressTracker from "./wizard/ProgressTracker.component";

const Wizard: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 2));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0:
        return <SetupElection />;
      case 1:
        return <SetupParties />;
      case 2:
        return <SetupVoters />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ProgressTracker numSteps={4} currentStep={step}/>
      {renderStep()}
      <div>
        {step > 0 && <button onClick={prevStep}>Previous</button>}
        {step < 2 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default Wizard;
