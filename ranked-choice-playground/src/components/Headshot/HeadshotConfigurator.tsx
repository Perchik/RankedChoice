import React, { useState } from "react";
import { SketchPicker } from "react-color";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
} from "react-bootstrap";
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
const defaultAccessoryColor = partyColors["red"];

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
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
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
        <div>
          <Headshot
            variantId=""
            accessoryColor={accessoryColor}
            skinColor={skinColor}
            {...currentVariant}
          />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <FormGroup>
            <FormLabel>ID</FormLabel>
            <FormControl
              type="text"
              name="id"
              value={currentVariant.id}
              onChange={(event) => handleInputChange(event as any)}
            />
          </FormGroup>
          <h6>Accessory Color</h6>
          <ColorPalette
            colors={Object.values(partyColors)}
            onClick={setAccessoryColor}
          />
          <h6>Skin Color</h6>
          <ColorPalette colors={skinColors} onClick={setSkinColor} />
          <FormGroup>
            <FormLabel>Color Target</FormLabel>
            <FormControl
              as="select"
              value={colorTarget}
              onChange={(event) =>
                setColorTarget(event.target.value as keyof Variant)
              }
            >
              <option value="suitColor">Suit Color</option>
              <option value="shirtColor">Shirt Color</option>
              <option value="lapelColor">Lapel Color</option>
            </FormControl>
          </FormGroup>
          <SketchPicker
            color={currentColor}
            onChangeComplete={handleColorChange}
          />
          <FormGroup>
            <FormLabel>Tie Type</FormLabel>
            <div>
              <FormCheck
                type="radio"
                name="tieType"
                value="none"
                label="None"
                checked={currentVariant.tieType === "none"}
                onChange={handleInputChange}
              />
              <FormCheck
                type="radio"
                name="tieType"
                value="tie"
                label="Tie"
                checked={currentVariant.tieType === "tie"}
                onChange={handleInputChange}
              />
              <FormCheck
                type="radio"
                name="tieType"
                value="bowtie"
                label="Bowtie"
                checked={currentVariant.tieType === "bowtie"}
                onChange={handleInputChange}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel>Pocket Square Variation</FormLabel>
            <div>
              <FormCheck
                type="radio"
                name="pocketSquareVariation"
                value="none"
                label="None"
                checked={currentVariant.pocketSquareVariation === "none"}
                onChange={handleInputChange}
              />
              <FormCheck
                type="radio"
                name="pocketSquareVariation"
                value="variation1"
                label="Variation 1"
                checked={currentVariant.pocketSquareVariation === "variation1"}
                onChange={handleInputChange}
              />
              <FormCheck
                type="radio"
                name="pocketSquareVariation"
                value="variation2"
                label="Variation 2"
                checked={currentVariant.pocketSquareVariation === "variation2"}
                onChange={handleInputChange}
              />
            </div>
          </FormGroup>
          <Button
            variant="primary"
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
          variant="secondary"
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
