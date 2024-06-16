import React, { useState, forwardRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardHeader,
  SxProps,
  Modal,
  IconButton,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { PartyPreset } from "../../models/PartyPreset";
import palette from "../../styles/palette";

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  border: selected
    ? `2px solid ${theme.palette.primary.main}`
    : "1px solid grey",
  backgroundColor: selected
    ? palette.primary[50]
    : theme.palette.background.paper,
  boxShadow: selected
    ? "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px"
    : "none",
  transition: "background-color 0.3s, border 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: selected
      ? theme.palette.action.hover
      : palette.primary[200],
  },
  padding: theme.spacing(2),
  width: 350,
  cursor: "pointer",
  position: "relative",
  animation: selected ? `${scaleUp} 0.3s ease-in-out forwards` : "none",
  transformOrigin: "center",
}));

interface PartyPresetCardProps {
  preset: PartyPreset;
  selected: boolean;
  onClick: () => void;
  onUsePreset: () => void;
  buttonTitle?: string;
}

const PartyPresetCard = forwardRef<HTMLDivElement, PartyPresetCardProps>(
  (
    {
      preset,
      selected,
      onClick,
      onUsePreset,
      buttonTitle = "Use this scenario",
    },
    ref
  ) => {
    const { title, short_description, examples, image_file, long_description } =
      preset;

    const [moreInfo, setMoreInfo] = useState(false);

    const handleMoreInfoOpen = () => setMoreInfo(true);
    const handleMoreInfoClose = () => setMoreInfo(false);

    const handleUsePresetClick = () => {
      onClick();
      onUsePreset();
    };

    return (
      <Box
        ref={ref}
        sx={{ p: 2, boxSizing: "border-box", width: "100$" }}
        onClick={onClick}
      >
        <StyledCard selected={selected}>
          <CardHeader
            title={title}
            sx={{
              color: "primary.contrastText",
              bgcolor: "primary.main",
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
            <Box display="flex" justifyContent="center" my={1}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoreInfoOpen();
                }}
                variant="text"
              >
                More Info
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center">
              <i>{examples}</i>
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="center" pb={2}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleUsePresetClick();
              }}
              variant="contained"
              color="primary"
            >
              {buttonTitle}
            </Button>
          </Box>
          {selected && (
            <Box
              sx={{
                display: "block",
                position: "absolute",
                top: 8,
                height: "40px",
                width: "40px",
                right: 8,
                padding: 0,
                backgroundColor: "white", // Set the background color
                borderRadius: "50%", // To make the background color a circle
              }}
            >
              <CheckCircleIcon
                color="primary"
                sx={{
                  fontSize: "40px",
                }}
              />
            </Box>
          )}
        </StyledCard>

        {moreInfo && (
          <Modal open={moreInfo} onClose={handleMoreInfoClose}>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 24,
                display: "flex",
                flexDirection: "column",
                left: "50%",
                maxHeight: "90vh",
                maxWidth: 800,
                outline: 0,
                overflow: "hidden",
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
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
                  {title}
                </Typography>
                <IconButton onClick={handleMoreInfoClose}>
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
                    {long_description}
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
                    image={`${process.env.PUBLIC_URL}/${image_file}`}
                    alt={`${title} image`}
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
                <Button
                  onClick={handleMoreInfoClose}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    );
  }
);

export { PartyPresetCard };
