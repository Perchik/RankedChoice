import React, { useState, useEffect } from "react";
import presetsData from "../config/party-presets.json";
import {
  Container,
  Typography,
  Button,
  Box,
  Modal,
  CardMedia,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PresetCard, PartyPresetCard } from "./PartyPresetCard";
import { PartyPreset } from "../models/PartyPreset";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./PartyPresetCard.css";

const breakpoints = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
};

interface PresetSelectionProps {
  onPresetSelect: (fileContent: string) => void;
  onCreateCustomScenario: () => void;
}

const PartyPresetSelector: React.FC<PresetSelectionProps> = ({
  onPresetSelect,
  onCreateCustomScenario,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [moreInfo, setMoreInfo] = useState<{
    title: string;
    description: string;
    image: string;
  } | null>(null);
  const presets: { [key: string]: PartyPreset } = presetsData;

  const handlePresetClick = (file: string, key: string) => {
    fetch(`${process.env.PUBLIC_URL}/${file}`)
      .then((response) => response.text())
      .then((data) => {
        onPresetSelect(data);
        setSelectedPreset(key);
      })
      .catch((error) => console.error("Error loading text file:", error));
  };

  const handleMoreInfo = (
    title: string,
    description: string,
    image: string
  ) => {
    setMoreInfo({ title, description, image });
  };

  const handleClose = () => {
    setMoreInfo(null);
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
      >
        <Box
          key="custom-scenario"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <PresetCard
              title="Create Custom Scenario"
              short_description="Start from scratch and create your own custom scenario."
              description=""
              examples=""
              image_file="svgs/parties/custom_scenario.svg"
              buttonTitle="Start customizing"
              onUsePreset={onCreateCustomScenario}
              useSecondaryStyle
            />
          </Box>
          <Typography
            sx={{
              p: "1",
              flexGrow: "1",
              textAlign: "center",
              minWidth: "120px",
            }}
            variant="h6"
          >
            -- or --
          </Typography>
        </Box>
        {Object.entries(presets).map(([key, preset]) => (
          <PartyPresetCard
            key={key}
            preset={preset}
            onMoreInfo={() =>
              handleMoreInfo(
                preset.title,
                preset.long_description,
                preset.image_file
              )
            }
            onUsePreset={() => handlePresetClick(preset.interaction_file, key)}
          />
        ))}
      </Carousel>
      {moreInfo && (
        <Modal open={Boolean(moreInfo)} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 800,
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 1,
              outline: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid #ddd",
              }}
            >
              <Typography variant="h5" component="h2">
                {moreInfo.title}
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              <Box sx={{ flexShrink: 0, p: 2 }}>
                <Typography variant="body1" component="p">
                  {moreInfo.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={`${process.env.PUBLIC_URL}/${moreInfo.image}`}
                  alt={`${moreInfo.title} image`}
                  sx={{
                    width: "400px",
                    maxHeight: "30%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 2,
                borderTop: "1px solid #ddd",
              }}
            >
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Container>
  );
};

export default PartyPresetSelector;
