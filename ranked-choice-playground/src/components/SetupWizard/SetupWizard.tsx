import React, { useState } from "react";
import { useSelector } from "react-redux";

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
import { RootState } from "../../store";
import CandidateList from "../Candidates/CandidateManager";
const steps = [
  "Setup Election",
  "Select Political Parties",
  "Setup Candidates",
  "Setup Voters",
];

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <SetupElectionDetails />;
    case 1:
      return <SetupPoliticalParties />;
    case 2:
      return <CandidateList />;
    case 3:
      return "Setup voters";
    default:
      return "Unknown step";
  }
}

const ElectionSetupStepper = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const electionTitle = useSelector((state: RootState) => state.election.title);
  const parties = useSelector((state: RootState) => state.parties.parties);

  const isFormComplete = (() => {
    switch (activeStep) {
      case 0:
        return Boolean(electionTitle);
      case 1:
        return parties.length > 0;
      default:
        return false;
    }
  })();

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
                {getStepContent(activeStep)}
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
