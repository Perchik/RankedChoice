import React, { useState } from "react";
import { SketchPicker } from "react-color";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Headshot from "./Headshot.component";
import { partyColors } from "../../constants/partyStyles";
import ColorPalette from "../Common/ColorPalette";

interface Variant {
  id: string;
  suitColor: string;
  shirtColor: string;
  lapelColor: string;
  tieType: "none" | "tie" | "bowtie";
  pocketSquareVariation: "none" | "variation1" | "variation2";
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
const defaultAccessoryColor = partyColors[0];

const HeadshotConfigurator: React.FC = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [currentVariant, setCurrentVariant] = useState<Variant>({
    id: "",
    suitColor: "#000000",
    shirtColor: "#ffffff",
    lapelColor: "#ffffff",
    tieType: "tie",
    pocketSquareVariation: "none",
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
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setCurrentVariant({ ...currentVariant, [name as keyof Variant]: value });
  };

  const handleAddVariant = () => {
    setVariants([...variants, { ...currentVariant }]);
    setCurrentVariant({
      id: "",
      suitColor: "#000000",
      shirtColor: "#ffffff",
      lapelColor: "#ffffff",
      tieType: "none",
      pocketSquareVariation: "none",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>SVG Variant Creator</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div >
          <Headshot
            variantId=""
            accessoryColor={accessoryColor}
            skinColor={skinColor}
            {...currentVariant}
          />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <TextField
            label="ID"
            name="id"
            value={currentVariant.id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Typography variant="h6" gutterBottom>
            Accessory Color
          </Typography>
          <ColorPalette colors={partyColors} onClick={setAccessoryColor} />
          <Typography variant="h6" gutterBottom>
            Skin Color
          </Typography>
          <ColorPalette colors={skinColors} onClick={setSkinColor} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Color Target</InputLabel>
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
              row
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
              row
              name="pocketSquareVariation"
              value={currentVariant.pocketSquareVariation}
              onChange={handleInputChange}
            >
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel
                value="variation1"
                control={<Radio />}
                label="Variation 1"
              />
              <FormControlLabel
                value="variation2"
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
        </div>
      </div>
      <div>
        <h2>Variants</h2>
        <pre>{JSON.stringify(variants, null, 2)}</pre>
        <Button
          variant="contained"
          onClick={() =>
            navigator.clipboard.writeText(JSON.stringify(variants, null, 2))
          }
          style={{ marginTop: "10px" }}
        >
          Copy to Clipboard
        </Button>
      </div>
    </div>
  );
};

export default HeadshotConfigurator;
