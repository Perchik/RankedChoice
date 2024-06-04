import React from "react";
import { Button, Card } from "react-bootstrap";
import "./PartyPresetCard.css"; // Import the CSS file
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
      <Card.Img
        variant="top"
        src={`${process.env.PUBLIC_URL}/${preset.image_file}`}
        alt={`${preset.title} image`}
      />
      <Card.Body
        className={`text-center card-body-fixed ${
          isExpanded ? "expanded" : ""
        }`}
      >
        <Card.Title>{preset.title}</Card.Title>
        <Card.Text>
          {preset.short_description}
          {isExpanded && (
            <>
              <br />
              {preset.long_description}
            </>
          )}
        </Card.Text>
        {!isExpanded && (
          <p>
            <i>{preset.examples}</i>
          </p>
        )}
        <Button variant="link" onClick={onToggleExpand}>
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
        <Button onClick={onUsePreset} variant="primary">
          Use this scenario
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PartyPresetCard;
