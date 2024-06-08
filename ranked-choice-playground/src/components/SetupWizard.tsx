import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Tabs,
  Paper,
  Tab,
} from "@mui/material";

import SetupElectionDetails from "./SetupElectionDetails/SetupElectionDetails";
const steps = [
  "Setup Election",
  "Setup Political Parties",
  "Setup Candidates",
  "Setup Voters",
];

function getStepContent(
  stepIndex: number,
  mode: string,
  setFormComplete: (complete: boolean) => void
) {
  switch (stepIndex) {
    case 0:
      return <SetupElectionDetails setFormComplete={setFormComplete} />;
    case 1:
      return mode === "simple"
        ? "setup parties simple"
        : "setup parties advanced";
    case 2:
      return "setup candidates";
    case 3:
      return "setup voters";
    default:
      return "Unknown step";
  }
}

const ElectionSetupStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [partySetupMode, setPartySetupMode] = useState<"simple" | "advanced">(
    "simple"
  );
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsFormComplete(false); // Reset form completion state for next step
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsFormComplete(false);
  };

  return (
    <Paper sx={{ mx: 2, my: 3, p: 2 }}>
      <Typography component="h1" variant="h4" align="center">
        Create Scenario
      </Typography>
      <Stepper sx={{ pt: 3, px: 0, pb: 5 }} activeStep={activeStep}>
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
              {getStepContent(activeStep, partySetupMode, setIsFormComplete)}
            </Box>
          ) : (
            getStepContent(activeStep, partySetupMode, setIsFormComplete)
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isFormComplete}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ElectionSetupStepper;
