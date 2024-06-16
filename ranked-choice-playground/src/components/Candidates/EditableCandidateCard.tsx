import React from "react";
import { useDispatch } from "react-redux";
import styles from "./EditableCandidateCard.module.css";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchRandomName } from "../../services/nameService";
import { Candidate } from "../../models/Candidate";
import PopularitySlider from "../Common/PopularitySlider";
import {
  updateCandidate,
  updateCandidateName,
} from "../../slices/candidatesSlice";

interface EditableCandidateCardProps {
  partyId: string;
  candidate: any; // Use any for plain object
  candidateIndex: number;
}

const EditableCandidateCard: React.FC<EditableCandidateCardProps> = ({
  partyId,
  candidate,
  candidateIndex,
}) => {
  const dispatch = useDispatch();
  const candidateInstance = new Candidate(
    candidate.fullName,
    candidate.shortName,
    candidate.popularity,
    candidate.inPartyPopularity,
    candidate.color
  );
  const [avatarUrl, setAvatarUrl] = React.useState(
    `https://api.adorable.io/avatars/285/${candidate.shortName}.png`
  );

  const handleFetchNewName = async () => {
    const { title, firstName, lastName, suffix } = await fetchRandomName();
    const newFullName = Candidate.generateFullName(
      title,
      firstName,
      lastName,
      suffix
    );
    const newShortName = Candidate.generateShortName(firstName, lastName);

    dispatch(
      updateCandidateName({
        partyId,
        candidateIndex,
        fullName: newFullName,
        shortName: newShortName,
      })
    );
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
      candidateInstance.fullName,
      candidateInstance.shortName,
      type === "popularity"
        ? (newValue as number)
        : candidateInstance.popularity,
      type === "inPartyPopularity"
        ? (newValue as number)
        : candidateInstance.inPartyPopularity,
      candidateInstance.color
    );
    dispatch(
      updateCandidate({
        partyId,
        candidateIndex,
        candidate: { ...updatedCandidate },
      })
    );
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
              {candidateInstance.fullName}
            </Typography>
            <Box className={styles.nameReloadIconBox}>
              <RefreshIcon fontSize="small" className={styles.reloadIcon} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              className={styles.partyColor}
              style={{ backgroundColor: candidateInstance.color }}
            ></Box>
            <Typography variant="subtitle1" className={styles.partyName}>
              {candidateInstance.color} Party
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Box className={styles.popularityContainer}>
            <Typography variant="subtitle2">Overall popularity</Typography>
            <PopularitySlider
              value={candidateInstance.popularity}
              onChange={(event, newValue) =>
                handlePopularityChange(event, newValue, "popularity")
              }
            />
          </Box>
          <Box className={styles.popularityContainer}>
            <Typography variant="subtitle2">In-party popularity</Typography>
            <PopularitySlider
              value={candidateInstance.inPartyPopularity}
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
