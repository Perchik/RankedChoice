import React, { useState } from "react";
import styles from "./PoliticianCard.module.css"; // Updated to import CSS module
import { Button } from "react-bootstrap";
import { fetchRandomName } from "../../services/nameService";
import { partyColors, partyNames } from "../../constants/PartyData";
import { PartySelect, PopularitySlider } from "../Common/FormControls";
import { Politician } from "../../types/types";

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
    event: React.ChangeEvent<HTMLSelectElement>,
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedPolitician = {
      ...currentPolitician,
      popularity: Number(event.target.value),
    };
    setCurrentPolitician(updatedPolitician);
    onUpdate(updatedPolitician);
  };

  const frameColor = partyColors[currentPolitician.majorParty];

  return (
    <div className={styles.politicianCard}>
      <div className={styles.avatarFrame} style={{ borderColor: frameColor }}>
        <div
          className={styles.politicianPhoto}
          dangerouslySetInnerHTML={{ __html: politician.photoSvg }}
        />
      </div>
      <div className={styles.nameSection}>
        <h2>{`${currentPolitician.firstName} ${currentPolitician.lastName}`}</h2>
        {isEditing && (
          <Button variant="primary" onClick={handleFetchNewName}>
            Reload Name
          </Button>
        )}
      </div>
      <div className={styles.toggleEditSection}>
        <Button variant="primary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      {isEditing ? (
        <div className={styles.editSection}>
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
        <div className={styles.viewSection}>
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
