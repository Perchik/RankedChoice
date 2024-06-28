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
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SetupElectionDetails from "./SetupElectionDetails";
import SetupSummary from "./SetupSummaryCard";
import SetupPoliticalParties from "./SetupPoliticalParties";
import { RootState } from "../../store";
import CandidateManager from "../Candidates/CandidateManager";

const steps = [
  "Setup Election",
  "Select Political Parties",
  "Setup Candidates",
  "Setup Voters",
];

function getStepContent(stepIndex: number, handleNext: () => void) {
  switch (stepIndex) {
    case 0:
      return <SetupElectionDetails />;
    case 1:
      return <SetupPoliticalParties handleNext={handleNext} />;
    case 2:
      return <CandidateManager />;
    case 3:
      return "Setup voters";
    default:
      return "Unknown step";
  }
}

const ElectionSetupStepper = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);

  const electionTitle = useSelector((state: RootState) => state.election.title);
  const parties = useSelector((state: RootState) => state.parties.parties);

  const isFormComplete = (() => {
    switch (activeStep) {
      case 0:
        return Boolean(electionTitle);
      case 1:
        return parties.length > 0;
      case 2:
        return true;
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
    <Grid container spacing={2} sx={{ mt: 0, px: 2 }}>
      {isSmallScreen ? (
        <>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Election Summary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SetupSummary />
              </AccordionDetails>
            </Accordion>
            <Stepper activeStep={activeStep} sx={{ p: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </>
      ) : (
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
      )}
      <Grid item xs={isSmallScreen ? 12 : 10}>
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
              {getStepContent(activeStep, handleNext)}
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
  );
};

export default ElectionSetupStepper;
