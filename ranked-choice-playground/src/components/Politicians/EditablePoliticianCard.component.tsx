import React, { useState } from "react";
import "./PoliticianCard.css";
import { Button } from "@mui/material";
import { fetchRandomName } from "../../services/nameService";
import { partyStyle, partyNames } from "../../constants/partyStyles";
import { PartySelect, PopularitySlider } from "../Common/FormControls";
import { Politician } from "./../../types/types";
import { SelectChangeEvent } from "@mui/material";

interface EditablePoliticianCardProps {
  politician: Politician;
  onUpdate: (politician: Politician) => void;
}

const EditablePoliticianCard: React.FC<EditablePoliticianCardProps> = ({
  politician,
  onUpdate,
}) => {
  const [currentPolitician, setCurrentPolitician] =
    useState<Politician>(politician);
  const [isEditing, setIsEditing] = useState(false);

  const handleFetchNewName = async () => {
    const newName = await fetchRandomName();
    const updatedPolitician = { ...currentPolitician, ...newName };
    setCurrentPolitician(updatedPolitician);
    onUpdate(updatedPolitician);
  };

  const handlePartyChange = (
    event: SelectChangeEvent<string>,
    type: "major" | "minor"
  ) => {
    const updatedPolitician = {
      ...currentPolitician,
      [type === "major" ? "majorParty" : "minorParty"]: event.target.value,
    };
    setCurrentPolitician(updatedPolitician);
    onUpdate(updatedPolitician);
  };

  const handlePopularityChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const updatedPolitician = {
      ...currentPolitician,
      popularity: newValue as number,
    };
    setCurrentPolitician(updatedPolitician);
    onUpdate(updatedPolitician);
  };

  const frameColor = partyStyle[currentPolitician.majorParty];

  return (
    <div className="politician-card">
      <div className="avatar-frame" style={{ borderColor: frameColor }}>
        <div
          // alt={`${currentPolitician.firstName} ${currentPolitician.lastName}`}
          className="politician-photo"
          dangerouslySetInnerHTML={{ __html: politician.photoSvg }}
        />
      </div>
      <div className="name-section">
        <h2>{`${currentPolitician.firstName} ${currentPolitician.lastName}`}</h2>
        {isEditing && (
          <Button variant="contained" onClick={handleFetchNewName}>
            Reload Name
          </Button>
        )}
      </div>
      <div className="toggle-edit-section">
        <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      {isEditing ? (
        <div className="edit-section">
          <PartySelect
            label="Major Party"
            value={currentPolitician.majorParty}
            onChange={(e) => handlePartyChange(e, "major")}
            options={partyNames}
          />
          <PartySelect
            label="Minor Party"
            value={currentPolitician.minorParty}
            onChange={(e) => handlePartyChange(e, "minor")}
            options={partyNames}
          />
          <PopularitySlider
            value={currentPolitician.popularity}
            onChange={handlePopularityChange}
          />
        </div>
      ) : (
        <div className="view-section">
          <p>Major Party: {currentPolitician.majorParty}</p>
          {currentPolitician.minorParty && (
            <p>Minor Party: {currentPolitician.minorParty}</p>
          )}
          <p>Popularity: {currentPolitician.popularity}</p>
        </div>
      )}
    </div>
  );
};

export default EditablePoliticianCard;