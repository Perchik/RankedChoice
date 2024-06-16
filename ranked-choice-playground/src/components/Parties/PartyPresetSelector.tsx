import React, { useState } from "react";
import presetsData from "../../config/party-presets.json";
import { Container, Typography } from "@mui/material";
import { PartyPresetCard } from "./PartyPresetCard";
import { PartyPreset } from "../../models/PartyPreset";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./PartyPresetCard.css";
import "./PartyPresetSelector.css";
import { useDispatch } from "react-redux";
import { setPartyConfigurationInStore } from "../../utils/partyUtils";
import { parseConfig } from "../../utils/partyGraphParser";

const breakpoints = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
  },
};

interface PresetSelectionProps {
  onPresetSelect: (fileContent: string) => void;
  onCreateCustomScenario: (presetContent: string) => void;
}

const PartyPresetSelector: React.FC<PresetSelectionProps> = ({
  onPresetSelect,
  onCreateCustomScenario,
}) => {
  const dispatch = useDispatch();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const presets: { [key: string]: PartyPreset } = presetsData;

  const handlePresetClick = (file: string, key: string) => {
    fetch(`${process.env.PUBLIC_URL}/${file}`)
      .then((response) => response.text())
      .then((data) => {
        const partyConfiguration = parseConfig(data);
        dispatch(setPartyConfigurationInStore(partyConfiguration));
        onPresetSelect(data);
        setSelectedPreset(key);
      })
      .catch((error) => console.error("Error loading text file:", error));
  };

  return (
    <Container maxWidth="lg" sx={{ p: 1 }} component="main">
      <Typography variant="h3" align="center" gutterBottom>
        Choose a Party Configuration
      </Typography>
      <Carousel
        responsive={breakpoints}
        showDots={true}
        keyBoardControl={true}
        slidesToSlide={2}
        centerMode
        renderDotsOutside
        dotListClass="dots"
        itemClass="carousel-item"
      >
        {Object.entries(presets).map(([key, preset]) => (
          <PartyPresetCard
            key={key}
            preset={preset}
            selected={selectedPreset === key}
            onClick={() => setSelectedPreset(key)}
            onUsePreset={() => handlePresetClick(preset.interaction_file, key)}
          />
        ))}
      </Carousel>
    </Container>
  );
};

export default PartyPresetSelector;
