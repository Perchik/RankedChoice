// src/pages/PartyDiagramPage.tsx
import React, { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";
import PartyDiagram from "../components/PartyDiagram/PartyDiagram";

const Parties: React.FC = () => {
  const [numberOfParties, setNumberOfParties] = useState(1);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setNumberOfParties(newValue as number);
  };

  return (
    <Box sx={{ width: 300, margin: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Party Diagram
      </Typography>
      <Slider
        value={numberOfParties}
        onChange={handleSliderChange}
        aria-labelledby="party-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
      <Typography variant="h6">Number of Parties: {numberOfParties}</Typography>
      <PartyDiagram numberOfParties={numberOfParties} />
    </Box>
  );
};

export default Parties;
