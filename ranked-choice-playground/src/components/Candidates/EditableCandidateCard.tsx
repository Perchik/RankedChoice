import React, { useState } from "react";
import styles from "./EditableCandidateCard.module.css";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchRandomName } from "../../services/nameService";
import { Candidate } from "../../models/Candidate";
import PopularitySlider from "../Common/PopularitySlider";

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
  const [avatarUrl, setAvatarUrl] = useState(
    `https://api.adorable.io/avatars/285/${candidate.shortName}.png`
  );

  const handleFetchNewName = async () => {
    const { title, firstName, lastName, suffix } = await fetchRandomName();
    const newFullName = `${title ? title + " " : ""}${firstName} ${lastName}${suffix ? ", " + suffix : ""}`;
    const newShortName = `${firstName.charAt(0)}. ${lastName}`;

    const updatedCandidate = new Candidate(
      newFullName,
      newShortName,
      currentCandidate.popularity,
      currentCandidate.inPartyPopularity,
      currentCandidate.color
    );

    setCurrentCandidate(updatedCandidate);
    onUpdate(updatedCandidate);
  };

  const regenerateAvatar = () => {
    setAvatarUrl(`https://api.adorable.io/avatars/285/${Math.random()}.png`);
  };

  const handlePopularityChange = (
    event: Event,
    newValue: number | number[],
    type: "popularity" | "inPartyPopularity"
  ) => {
    const updatedCandidate = new Candidate(
      currentCandidate.fullName,
      currentCandidate.shortName,
      type === "popularity"
        ? (newValue as number)
        : currentCandidate.popularity,
      type === "inPartyPopularity"
        ? (newValue as number)
        : currentCandidate.inPartyPopularity,
      currentCandidate.color
    );
    setCurrentCandidate(updatedCandidate);
    onUpdate(updatedCandidate);
  };

  return (
    <Box className={styles.candidateCard}>
      <Box className={styles.leftSection}>
        <Tooltip title="Regenerate Avatar">
          <Box position="relative" className={styles.avatarWrapper}>
            <img
              src={avatarUrl}
              alt="Candidate Avatar"
              className={styles.candidatePhoto}
            />
            <Box className={styles.avatarReloadIconBox}>
              <IconButton
                size="small"
                className={styles.reloadIcon}
                onClick={regenerateAvatar}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Tooltip>
      </Box>
      <Box className={styles.rightSection}>
        <Box className={styles.nameWrapper}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            onClick={handleFetchNewName}
            className={styles.nameContainer}
          >
            <Typography variant="h5" className={styles.candidateName}>
              {currentCandidate.fullName}
            </Typography>
            <Box className={styles.nameReloadIconBox}>
              <RefreshIcon fontSize="small" className={styles.reloadIcon} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              className={styles.partyColor}
              style={{ backgroundColor: currentCandidate.color }}
            ></Box>
            <Typography variant="subtitle1" className={styles.partyName}>
              {currentCandidate.color} Party
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Box className={styles.popularityContainer}>
            <Typography variant="subtitle2">Overall popularity</Typography>
            <PopularitySlider
              value={currentCandidate.popularity}
              onChange={(event, newValue) =>
                handlePopularityChange(event, newValue, "popularity")
              }
            />
          </Box>
          <Box className={styles.popularityContainer}>
            <Typography variant="subtitle2">In-party popularity</Typography>
            <PopularitySlider
              value={currentCandidate.inPartyPopularity}
              onChange={(event, newValue) =>
                handlePopularityChange(event, newValue, "inPartyPopularity")
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditableCandidateCard;
