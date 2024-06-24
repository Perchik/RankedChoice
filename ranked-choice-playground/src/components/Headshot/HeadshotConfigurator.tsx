import React, { useState } from "react";
import { SketchPicker } from "react-color";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Headshot from "./Headshot";
import { partyColors } from "../../constants/PartyData";
import ColorPalette from "../Common/ColorPalette";

interface Outfit {
  id: string;
  suitColor: string;
  shirtColor: string;
  lapelColor: string;
  tieType: "none" | "tie" | "bowtie";
  pocketSquareType: "none" | "type1" | "type2";
}

const defaultAccessoryColor = partyColors["red"];

const clothingColors = [
  "#2a3152",
  "#13304d",
  "#778899",
  "#B0C4DE",
  "#D3D3D3",
  "#A9A9A9",
  "#808080",
  "#696969",
  "#000080",
  "#00008B",
  "#191970",
  "#4169E1",
  "#4682B4",
  "#1E90FF",
  "#082050",
  "#6495ED",
  "#000000",
  "#0C0C0C",
  "#1C1C1C",
  "#2C2C2C",
  "#3C3C3C",
  "#4C4C4C",
];

const HeadshotConfigurator: React.FC = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [currentOutfit, setCurrentOutfit] = useState<Outfit>({
    id: "100",
    suitColor: "#000000",
    shirtColor: "#ffffff",
    lapelColor: "#ffffff",
    tieType: "tie",
    pocketSquareType: "none",
  });
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colorTarget, setColorTarget] = useState<keyof Outfit>("suitColor");
  const [accessoryColor, setAccessoryColor] = useState(defaultAccessoryColor);
  const [currentId, setCurrentId] = useState(101); // Start ID at 100 and increment

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex);
    setCurrentOutfit({ ...currentOutfit, [colorTarget]: color.hex });
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setCurrentOutfit({ ...currentOutfit, [name]: value });
  };

  const handleAddOutfit = () => {
    setOutfits([...outfits, { ...currentOutfit }]);
    setCurrentOutfit({
      ...currentOutfit,
      id: currentId.toString(),
    });
    setCurrentId(currentId + 1);
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" mb={3} align="center">
        SVG Outfit Creator
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={4}
            padding={2}
            mb={3}
          >
            <Typography variant="h6">Accessory Color</Typography>
            <ColorPalette
              colors={Object.values(partyColors)}
              onClick={setAccessoryColor}
            />
          </Box>
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={4}
            padding={2}
            mb={3}
          >
            <Typography variant="h6">Skin Color</Typography>
          </Box>
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={4}
            padding={2}
            mb={3}
          >
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Tie Type</FormLabel>
              <RadioGroup
                name="tieType"
                value={currentOutfit.tieType}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
                <FormControlLabel value="tie" control={<Radio />} label="Tie" />
                <FormControlLabel
                  value="bowtie"
                  control={<Radio />}
                  label="Bowtie"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Pocket Square Type</FormLabel>
              <RadioGroup
                name="pocketSquareType"
                value={currentOutfit.pocketSquareType}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
                <FormControlLabel
                  value="type1"
                  control={<Radio />}
                  label="Type 1"
                />
                <FormControlLabel
                  value="type2"
                  control={<Radio />}
                  label="Type 2"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ height: "500px" }}
          container
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* <Headshot
            outfitId=""
            accessoryColor={accessoryColor}
            skinColor={skinColor}
            hairColor="lime"
            width="auto"
            height="400px"
            {...currentOutfit}
          /> */}
          <Box border={1} borderColor="grey.300" borderRadius={4} padding={2}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="ID"
                type="text"
                name="id"
                value={currentOutfit.id}
                onChange={(event) => handleInputChange(event as any)}
                size="small"
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOutfit}
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Add Outfit
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            border={1}
            borderColor="grey.300"
            borderRadius={4}
            padding={2}
            mb={3}
          >
            <FormControl fullWidth margin="normal">
              <FormLabel>Color Target</FormLabel>
              <Select
                value={colorTarget}
                onChange={(event) =>
                  setColorTarget(event.target.value as keyof Outfit)
                }
              >
                <MenuItem value="suitColor">Suit Color</MenuItem>
                <MenuItem value="shirtColor">Shirt Color</MenuItem>
                <MenuItem value="lapelColor">Lapel Color</MenuItem>
              </Select>
            </FormControl>
            <SketchPicker
              color={currentColor}
              onChangeComplete={handleColorChange}
              presetColors={clothingColors}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="h5">Outfits</Typography>
        <pre>{JSON.stringify(outfits, null, 2)}</pre>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(outfits, null, 2))
          }
          style={{ marginTop: "10px" }}
          fullWidth
        >
          <FontAwesomeIcon icon={faCopy} /> Copy to Clipboard
        </Button>
      </Box>
    </Box>
  );
};

export default HeadshotConfigurator;
