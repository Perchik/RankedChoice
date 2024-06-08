import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

const steps = [
  "Setup Election",
  "Setup Political Parties",
  "Setup Politicians",
  "Setup Voters",
];

function getStepContent(stepIndex: number, mode: string) {
  switch (stepIndex) {
    case 0:
      return "setup election";
    case 1:
      return mode === "simple"
        ? "setup parties (simple)"
        : "setup parties (advanced)";
    case 2:
      return "setup politicians";
    case 3:
      return "setup voter population";
    default:
      return "Unknown step";
  }
}

const SetupWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [partySetupMode, setPartySetupMode] = useState<"simple" | "advanced">(
    "simple"
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Box sx={{ mt: 2 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          {activeStep === 1 ? (
            <Box>
              <Tabs
                value={partySetupMode}
                onChange={(e, newValue) => setPartySetupMode(newValue)}
              >
                <Tab label="Simple Mode" value="simple" />
                <Tab label="Advanced Mode" value="advanced" />
              </Tabs>
              {getStepContent(activeStep, partySetupMode)}
            </Box>
          ) : (
            getStepContent(activeStep, partySetupMode)
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SetupWizard;
