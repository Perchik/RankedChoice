import React, { useState } from "react";
import { Box, Typography, Slider, Grid, Paper } from "@mui/material";
import InteractivePartyGraph from "./InteractivePartyGraph";

interface PartyCustomizationProps {
  preset: string | null;
  numberOfParties: number;
  setNumberOfParties: (value: number) => void;
}

const PartyCustomization: React.FC<PartyCustomizationProps> = ({
  preset,
  numberOfParties,
  setNumberOfParties,
}) => {
  const [majorParties, setMajorParties] = useState<string[]>([]);
  const [minorParties, setMinorParties] = useState<string[]>([]);
  const [fringeParties, setFringeParties] = useState<string[]>([]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNumberOfParties(newValue as number);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Customize Scenario
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography>Number of Parties</Typography>
        <Slider
          value={numberOfParties}
          onChange={handleSliderChange}
          aria-labelledby="number-of-parties-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={12}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Major Parties</Typography>
            {/* Render major parties as draggable circles */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Minor Parties</Typography>
            {/* Render minor parties as draggable circles */}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Fringe Parties</Typography>
            {/* Render fringe parties as draggable circles */}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <InteractivePartyGraph />
      </Box>
    </Box>
  );
};

export default PartyCustomization;
