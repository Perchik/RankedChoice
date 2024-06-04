import React, { useState, useEffect } from "react";
import Holder from "holderjs";
import presetsData from "../config/party-presets.json";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PartyPresetCard from "./PartyPresetCard";
import { PartyPreset } from "../models/PartyPreset";

interface PresetSelectionProps {
  onPresetSelect: (fileContent: string) => void;
}

const PartyPresetSelector: React.FC<PresetSelectionProps> = ({
  onPresetSelect,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const presets: { [key: string]: PartyPreset } = presetsData;

  const handlePresetClick = (file: string) => {
    fetch(`${process.env.PUBLIC_URL}/${file}`)
      .then((response) => response.text())
      .then((data) => onPresetSelect(data))
      .catch((error) => console.error("Error loading text file:", error));
  };

  const toggleExpanded = (key: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  useEffect(() => {
    Holder.run();
  }, []);

  return (
    <div>
      <Typography variant="h5" component="h3" gutterBottom>
        Select a premade scenario
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(presets).map(([key, preset], idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <PartyPresetCard
              preset={preset}
              isExpanded={expanded[key]}
              onToggleExpand={() => toggleExpanded(key)}
              onUsePreset={() => handlePresetClick(preset.interaction_file)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PartyPresetSelector;
