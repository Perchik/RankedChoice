import React, { useState, useEffect } from "react";
import Holder from "holderjs";
import presetsData from "../config/party-presets.json";
import { Row, Col } from "react-bootstrap";
import PartyPresetCard from "./PartyPresetCard";
import { PartyPreset } from "../models/PartyPreset";

interface PresetSelectionProps {
  onPresetSelect: (fileContent: string) => void;
}

const PartyPresetSelector: React.FC<PresetSelectionProps> = ({
  onPresetSelect,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const presets: { [key: string]: PartyPreset } = presetsData;

  const handlePresetClick = (file: string) => {
    fetch(`${process.env.PUBLIC_URL}/${file}`)
      .then((response) => response.text())
      .then((data) => onPresetSelect(data))
      .catch((error) => console.error("Error loading text file:", error));
  };

  const toggleExpanded = (key: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  useEffect(() => {
    Holder.run();
  }, []);

  return (
    <div>
      <h3>Select a premade scenario</h3>
      <Row className="mx-3">
        {Object.entries(presets).map(([key, preset], idx) => (
          <Col key={idx} xs={12} sm={6} md={4}>
            <PartyPresetCard
              preset={preset}
              isExpanded={expanded[key]}
              onToggleExpand={() => toggleExpanded(key)}
              onUsePreset={() => handlePresetClick(preset.interaction_file)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PartyPresetSelector;
