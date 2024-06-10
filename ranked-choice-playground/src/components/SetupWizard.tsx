import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Divider,
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
  setFormComplete: (complete: boolean) => void,
  setPartySetupMode: (mode: "simple" | "advanced") => void
) {
  switch (stepIndex) {
    case 0:
      return <SetupElectionDetails setFormComplete={setFormComplete} />;
    case 1:
      return (
        <Box>
          <Tabs
            value={mode}
            onChange={(e, newValue) => setPartySetupMode(newValue)}
          >
            <Tab label="Simple Mode" value="simple" />
            <Tab label="Advanced Mode" value="advanced" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {mode === "simple"
              ? "Setup parties in simple mode"
              : "Setup parties in advanced mode"}
          </Box>
        </Box>
      );
    case 2:
      return "Setup candidates";
    case 3:
      return "Setup voters";
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
    <>
      <Stepper sx={{ p: 2 }} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper sx={{ mx: 2, mb: 2, p: 2, width: "90%" }}>
        {activeStep === steps.length ? (
          <Box sx={{ mt: 2 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {getStepContent(
              activeStep,
              partySetupMode,
              setIsFormComplete,
              setPartySetupMode
            )}
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
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
    </>
  );
};

export default ElectionSetupStepper;
