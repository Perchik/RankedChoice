import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { PartyPreset } from "../models/PartyPreset";

interface PartyPresetCardProps {
  preset: PartyPreset;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUsePreset: () => void;
}

const PartyPresetCard: React.FC<PartyPresetCardProps> = ({
  preset,
  isExpanded,
  onToggleExpand,
  onUsePreset,
}) => {
  return (
    <Card className="mb-4 w-100">
      <CardMedia
        component="img"
        height="140"
        image={`${process.env.PUBLIC_URL}/${preset.image_file}`}
        alt={`${preset.title} image`}
      />
      <CardContent
        className={`text-center card-body-fixed ${
          isExpanded ? "expanded" : ""
        }`}
      >
        <Typography variant="h5">{preset.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {preset.short_description}
          {isExpanded && (
            <>
              <br />
              {preset.long_description}
            </>
          )}
        </Typography>
        {!isExpanded && (
          <Typography variant="body2" color="text.secondary">
            <i>{preset.examples}</i>
          </Typography>
        )}
        <Box mt={2}>
          <Button onClick={onToggleExpand} variant="text">
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
          <Button onClick={onUsePreset} variant="contained" color="primary">
            Use this scenario
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PartyPresetCard;
