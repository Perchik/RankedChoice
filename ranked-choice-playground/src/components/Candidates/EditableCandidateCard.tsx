import React, { useState } from "react";
import styles from "./CandidateCard.module.css"; // Updated to import CSS module
import { Button } from "@mui/material";
import { fetchRandomName } from "../../services/nameService";
import { partyColors, partyNames } from "../../constants/PartyData";
import { PartySelect, PopularitySlider } from "../Common/FormControls";
import { Candidate } from "../../types/types";
import { SelectChangeEvent } from "@mui/material"; // Import SelectChangeEvent

interface EditableCandidateCardProps {
  candidate: Candidate;
  onUpdate: (candidate: Candidate) => void;
}

const EditableCandidateCard: React.FC<EditableCandidateCardProps> = ({
  candidate,
  onUpdate,
}) => {
  const [currentCandidate, setCurrentCandidate] =
    useState<Candidate>(candidate);
  const [isEditing, setIsEditing] = useState(false);

  const handleFetchNewName = async () => {
    const newName = await fetchRandomName();
    const updatedCandidate = { ...currentCandidate, ...newName };
    setCurrentCandidate(updatedCandidate);
    onUpdate(updatedCandidate);
  };

  const handlePartyChange = (
    event: SelectChangeEvent,
    type: "major" | "minor"
  ) => {
    const updatedCandidate = {
      ...currentCandidate,
      [type === "major" ? "majorParty" : "minorParty"]: event.target
        .value as string,
    };
    setCurrentCandidate(updatedCandidate);
    onUpdate(updatedCandidate);
  };

  const handlePopularityChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    const updatedCandidate = {
      ...currentCandidate,
      popularity: newValue as number,
    };
    setCurrentCandidate(updatedCandidate);
    onUpdate(updatedCandidate);
  };

  const frameColor = partyColors[currentCandidate.majorParty];

  return (
    <div className={styles.candidateCard}>
      <div className={styles.avatarFrame} style={{ borderColor: frameColor }}>
        <div
          className={styles.candidatePhoto}
          dangerouslySetInnerHTML={{ __html: candidate.photoSvg }}
        />
      </div>
      <div className={styles.nameSection}>
        <h2>{`${currentCandidate.firstName} ${currentCandidate.lastName}`}</h2>
        {isEditing && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchNewName}
          >
            Reload Name
          </Button>
        )}
      </div>
      <div className={styles.toggleEditSection}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      {isEditing ? (
        <div className={styles.editSection}>
          <PartySelect
            label="Major Party"
            value={currentCandidate.majorParty}
            onChange={(e) => handlePartyChange(e, "major")}
            options={partyNames}
          />
          <PartySelect
            label="Minor Party"
            value={currentCandidate.minorParty}
            onChange={(e) => handlePartyChange(e, "minor")}
            options={partyNames}
          />
          <PopularitySlider
            value={currentCandidate.popularity}
            onChange={handlePopularityChange}
          />
        </div>
      ) : (
        <div className={styles.viewSection}>
          <p>Major Party: {currentCandidate.majorParty}</p>
          {currentCandidate.minorParty && (
            <p>Minor Party: {currentCandidate.minorParty}</p>
          )}
          <p>Popularity: {currentCandidate.popularity}</p>
        </div>
      )}
    </div>
  );
};

export default EditableCandidateCard;
