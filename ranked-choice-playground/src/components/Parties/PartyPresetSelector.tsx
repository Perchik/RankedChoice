import React, { useState, useRef, useEffect } from "react";
import presetsData from "../../config/party-presets.json";
import { Box, Container, Typography, Fab } from "@mui/material";
import { PartyPresetCard } from "./PartyPresetCard";
import { PartyPreset } from "../../models/PartyPreset";
import { useDispatch } from "react-redux";
import { setPartyConfigurationInStore } from "../../utils/partyUtils";
import { parseConfig } from "../../utils/partyGraphParser";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import "./PartyPresetSelector.css";

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
  const [showLeftFab, setShowLeftFab] = useState(false);
  const [showRightFab, setShowRightFab] = useState(true);
  const presets: { [key: string]: PartyPreset } = presetsData;
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePresetClick = (file: string, key: string) => {
    fetch(`${process.env.PUBLIC_URL}/${file}`)
      .then((response) => response.text())
      .then((data) => {
        const partyConfiguration = parseConfig(data);
        dispatch(setPartyConfigurationInStore(partyConfiguration));
        setSelectedPreset(key);

        onPresetSelect(data);
      })
      .catch((error) => console.error("Error loading text file:", error));
  };

  const scrollContainer = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftFab(scrollLeft > 0);
      setShowRightFab(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ p: 1 }} component="main">
      <Typography variant="h3" align="center" gutterBottom>
        Choose a Party Configuration
      </Typography>
      <Box sx={{ display: "flex", position: "relative", alignItems: "center" }}>
        {showLeftFab && (
          <Fab
            color="primary"
            aria-label="scroll left"
            className="scroll-fab left"
            onClick={() => scrollContainer("left")}
            sx={{
              position: "absolute",
              left: -28,
              zIndex: 1,
            }}
          >
            <ArrowBack />
          </Fab>
        )}
        <div className="preset-container" ref={containerRef}>
          {Object.entries(presets).map(([key, preset]) => (
            <PartyPresetCard
              key={key}
              preset={preset}
              selected={selectedPreset === key}
              onClick={() => setSelectedPreset(key)}
              onUsePreset={() =>
                handlePresetClick(preset.interaction_file, key)
              }
            />
          ))}
        </div>
        {showRightFab && (
          <Fab
            color="primary"
            aria-label="scroll right"
            className="scroll-fab right"
            onClick={() => scrollContainer("right")}
            sx={{
              position: "absolute",
              right: -28,
              zIndex: 1,
            }}
          >
            <ArrowForward />
          </Fab>
        )}
      </Box>
    </Container>
  );
};

export default PartyPresetSelector;
