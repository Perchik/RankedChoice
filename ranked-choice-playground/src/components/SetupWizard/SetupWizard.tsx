import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";

import SetupElectionDetails from "./SetupElectionDetails";
import SetupSummary from "./SetupSummaryCard";
import SetupPoliticalParties from "./SetupPoliticalParties";
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
      return <SetupPoliticalParties setFormComplete={setFormComplete} />;
    case 2:
      return "Setup candidates";
    case 3:
      return "Setup voters";
    default:
      return "Unknown step";
  }
}

const ElectionSetupStepper = () => {
  const theme = useTheme();
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
      <Grid container spacing={2} sx={{ mt: 0, px: 2 }}>
        <Grid item xs={2}>
          <SetupSummary />
          <Stepper
            orientation="vertical"
            sx={{
              p: 2,
              "& .MuiStepIcon-root": {
                color: theme.palette.primary.main,
                "&.Mui-completed": {
                  color: theme.palette.secondary.main,
                },
              },
              ".MuiStepIcon-root .Mui-active": { color: "green" },
            }}
            activeStep={activeStep}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={10}>
          <Paper sx={{ p: 2, m: 0 }}>
            {activeStep === steps.length ? (
              <Box sx={{ mt: 2 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button
                  onClick={handleReset}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  Reset
                </Button>
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
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1, color: theme.palette.secondary.main }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isFormComplete}
                    color="secondary"
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ElectionSetupStepper;
