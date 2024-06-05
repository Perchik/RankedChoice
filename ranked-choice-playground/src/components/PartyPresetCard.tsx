import React, { forwardRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardHeader,
  SxProps,
} from "@mui/material";
import { PartyPreset } from "../models/PartyPreset";

interface PartyPresetCardProps {
  preset: PartyPreset;
  onMoreInfo?: () => void;
  onUsePreset: () => void;
  buttonTitle?: string;
}

const PartyPresetCard = forwardRef<HTMLDivElement, PartyPresetCardProps>(
  (
    { preset, onMoreInfo, onUsePreset, buttonTitle = "Use this scenario" },
    ref
  ) => {
    const { title, short_description, examples, image_file } = preset;

    return (
      <PresetCard
        ref={ref}
        title={title}
        short_description={short_description}
        description={short_description}
        examples={examples}
        image_file={image_file}
        buttonTitle={buttonTitle}
        useSecondaryStyle={false}
        onMoreInfo={onMoreInfo}
        onUsePreset={onUsePreset}
        sx={{}}
      />
    );
  }
);

interface CardProps {
  title: string;
  short_description: string;
  description: string;
  examples: string;
  image_file: string;
  buttonTitle: string;
  useSecondaryStyle: boolean;
  onMoreInfo?: () => void;
  onUsePreset: () => void;
  sx?: SxProps;
}

const PresetCard = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      short_description,
      description,
      examples,
      image_file,
      buttonTitle,
      useSecondaryStyle,
      onMoreInfo,
      onUsePreset,
      sx,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{ padding: 2, boxSizing: "border-box", width: "100%" }}
      >
        <Card
          className="mb-4 w-100 h-100"
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            ...sx,
          }}
        >
          <CardHeader
            title={title}
            sx={{
              color: useSecondaryStyle
                ? "secondary.contrastText"
                : "primary.contrastText",
              bgcolor: useSecondaryStyle ? "secondary.main" : "primary.main",
            }}
          />
          <CardMedia
            component="img"
            height="140"
            image={`${process.env.PUBLIC_URL}/${image_file}`}
            alt={`${title} image`}
            sx={{ objectFit: "contain" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {short_description}
            </Typography>
            {onMoreInfo && (
              <Box display="flex" justifyContent="center" my={1}>
                <Button onClick={onMoreInfo} variant="text">
                  More Info
                </Button>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary" align="center">
              <i>{examples}</i>
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="center" pb={2}>
            <Button
              onClick={onUsePreset}
              variant="contained"
              color={useSecondaryStyle ? "secondary" : "primary"}
            >
              {buttonTitle}
            </Button>
          </Box>
        </Card>
      </div>
    );
  }
);

export { PartyPresetCard, PresetCard };
