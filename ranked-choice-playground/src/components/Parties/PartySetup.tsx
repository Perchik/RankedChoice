import React, { useState } from "react";
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import PartyPresetSelector from "./PartyPresetSelector";
import PartyCustomization from "./PartyCustomization";

const steps = ["Select a Scenario", "Customize Scenario"];

const PartySetup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [numberOfParties, setNumberOfParties] = useState(5); // Default number of parties

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedPreset(null);
    setNumberOfParties(5);
  };

  const handlePresetSelect = (presetContent: string) => {
    setSelectedPreset(presetContent);
    handleNext();
  };

  const handleCreateCustomScenario = () => {
    setSelectedPreset("custom");
    handleNext();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#0000000b",
        borderRadius: 2,
        pt: 2,
        border: "solid thin grey",
      }}
    >
      <Box sx={{ width: "100%", mt: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box sx={{ mt: 2 }}>
            <Typography>All steps completed - you're finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {activeStep === 0 ? (
              <PartyPresetSelector
                onPresetSelect={handlePresetSelect}
                onCreateCustomScenario={handleCreateCustomScenario}
              />
            ) : (
              <PartyCustomization
                preset={selectedPreset}
                numberOfParties={numberOfParties}
                setNumberOfParties={setNumberOfParties}
              />
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep !== steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PartySetup;
