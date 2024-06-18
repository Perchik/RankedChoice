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
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Headshot from "./Headshot";
import { partyColors } from "../../constants/PartyData";
import ColorPalette from "../Common/ColorPalette";

interface Variant {
  id: string;
  suitColor: string;
  shirtColor: string;
  lapelColor: string;
  tieType: "none" | "tie" | "bowtie";
  pocketSquareType: "none" | "type1" | "type2";
}

const skinColors = [
  "#f9c9b6", // Light skin
  "#f0d5c9", // Fair skin
  "#d1a684", // Medium skin
  "#a67c52", // Tan skin
  "#8d5524", // Olive skin
  "#7d4b1f", // Brown skin
  "#4e342e", // Dark brown skin
  "#21150b", // Very dark skin
];

const defaultSkinColor = skinColors[0];
const defaultAccessoryColor = partyColors["red"];

const HeadshotConfigurator: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [currentVariant, setCurrentVariant] = useState<Variant>({
    id: "",
    suitColor: "#000000",
    shirtColor: "#ffffff",
    lapelColor: "#ffffff",
    tieType: "tie",
    pocketSquareType: "none",
  });
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colorTarget, setColorTarget] = useState<keyof Variant>("suitColor");
  const [accessoryColor, setAccessoryColor] = useState(defaultAccessoryColor);
  const [skinColor, setSkinColor] = useState(defaultSkinColor);

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex);
    setCurrentVariant({ ...currentVariant, [colorTarget]: color.hex });
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setCurrentVariant({ ...currentVariant, [name]: value });
  };

  const handleAddVariant = () => {
    setVariants([...variants, { ...currentVariant }]);
    setCurrentVariant({
      id: "",
      suitColor: "#000000",
      shirtColor: "#ffffff",
      lapelColor: "#ffffff",
      tieType: "tie",
      pocketSquareType: "none",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4">SVG Variant Creator</Typography>
      <Box display="flex" mb={3}>
        <div>
          <Headshot
            variantId=""
            accessoryColor={accessoryColor}
            skinColor={skinColor}
            {...currentVariant}
          />
        </div>
        <Box ml={3}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="ID"
              type="text"
              name="id"
              value={currentVariant.id}
              onChange={(event) => handleInputChange(event as any)}
            />
          </FormControl>
          <Typography variant="h6">Accessory Color</Typography>
          <ColorPalette
            colors={Object.values(partyColors)}
            onClick={setAccessoryColor}
          />
          <Typography variant="h6">Skin Color</Typography>
          <ColorPalette colors={skinColors} onClick={setSkinColor} />
          <FormControl fullWidth margin="normal">
            <FormLabel>Color Target</FormLabel>
            <Select
              value={colorTarget}
              onChange={(event) =>
                setColorTarget(event.target.value as keyof Variant)
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
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Tie Type</FormLabel>
            <RadioGroup
              name="tieType"
              value={currentVariant.tieType}
              onChange={handleInputChange}
            >
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel value="tie" control={<Radio />} label="Tie" />
              <FormControlLabel
                value="bowtie"
                control={<Radio />}
                label="Bowtie"
              />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Pocket Square Variation</FormLabel>
            <RadioGroup
              name="pocketSquareType"
              value={currentVariant.pocketSquareType}
              onChange={handleInputChange}
            >
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel
                value="type1"
                control={<Radio />}
                label="Variation 1"
              />
              <FormControlLabel
                value="type2"
                control={<Radio />}
                label="Variation 2"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVariant}
            style={{ marginTop: "20px" }}
          >
            Add Variant
          </Button>
        </Box>
      </Box>
      <div>
        <Typography variant="h5">Variants</Typography>
        <pre>{JSON.stringify(variants, null, 2)}</pre>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(variants, null, 2))
          }
          style={{ marginTop: "10px" }}
        >
          <FontAwesomeIcon icon={faCopy} /> Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};

export default HeadshotConfigurator;
