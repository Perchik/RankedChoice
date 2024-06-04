import React from "react";
import presetsData from "../config/party-presets.json";

interface Preset {
  description: string;
  examples: string;
  file: string;
}

interface PresetSelectionProps {
  onPresetSelect: (fileContent: string) => void;
}

const PartyPresetSelector: React.FC<PresetSelectionProps> = ({
  onPresetSelect,
}) => {
  const presets: { [key: string]: Preset } = presetsData;

  const handlePresetClick = (file: string) => {
    fetch(`${process.env.PUBLIC_URL}/configs/${file}`)
      .then((response) => response.text())
      .then((data) => onPresetSelect(data))
      .catch((error) => console.error("Error loading text file:", error));
  };

  return (
    <div>
      <h3>Select a Preset</h3>
      <ul>
        {Object.entries(presets).map(([key, preset]) => (
          <li key={key}>
            <button onClick={() => handlePresetClick(preset.file)}>
              {key.replace(/_/g, " ")}
            </button>
            <p>{preset.description}</p>
            <p>
              <i>{preset.examples}</i>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartyPresetSelector;
