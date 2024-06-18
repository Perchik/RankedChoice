import React from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchRandomName } from "../../services/nameService";
import { Candidate } from "../../models/Candidate";
import PopularitySlider from "../Common/PopularitySlider";
import {
  updateCandidate,
  updateCandidateName,
} from "../../slices/candidatesSlice";
import { parties } from "../../constants/PartyData";

interface EditableCandidateCardProps {
  partyId: string;
  candidate: any; // Use any for plain object
  candidateIndex: number;
  onDelete: () => void;
}

const EditableCandidateCard: React.FC<EditableCandidateCardProps> = ({
  partyId,
  candidate,
  candidateIndex,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const candidateInstance = new Candidate(
    candidate.id,
    candidate.fullName,
    candidate.shortName,
    candidate.partyId,
    candidate.popularity,
    candidate.inPartyPopularity,
    candidate.partyColor,
    candidate.personalColor
  );
  const [avatarUrl, setAvatarUrl] = React.useState(
    "https://placehold.co/220x360.png"
  );

  const handleFetchNewName = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation();
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

  const regenerateAvatar = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation();
    setAvatarUrl(`https://placehold.co/220x360.png`);
  };

  const handlePopularityChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
    type: "popularity" | "inPartyPopularity"
  ) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation();
    const updatedCandidate = new Candidate(
      candidateInstance.id, // reuse the id since we're "updating" this candidate.
      candidateInstance.fullName,
      candidateInstance.shortName,
      candidateInstance.partyId,
      type === "popularity"
        ? (newValue as number)
        : candidateInstance.popularity,
      type === "inPartyPopularity"
        ? (newValue as number)
        : candidateInstance.inPartyPopularity,
      candidateInstance.partyColor,
      candidateInstance.personalColor
    );
    dispatch(
      updateCandidate({
        partyId,
        candidateIndex,
        candidate: { ...updatedCandidate },
      })
    );
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation();
    onDelete();
  };

  const partyName = parties[partyId].name;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        height: "160px",
        width: "fit-content",
        border: "1px solid black",
        overflow: "hidden",
        borderRadius: 1,
        gap: 1,
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          position: "relative",
          "&:hover .avatarReloadIcon": {
            visibility: "visible",
          },
        }}
      >
        <Box
          position="relative"
          sx={{ display: "flex", alignItems: "stretch" }}
        >
          <img
            src={avatarUrl}
            alt="Candidate Avatar"
            style={{ maxHeight: "100%", width: "auto", objectFit: "cover" }}
          />
          <Tooltip title="Regenerate Avatar">
            <Box
              className="avatarReloadIcon"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "50%",
                padding: "2px",
                visibility: "hidden",
                transition: "visibility 0.2s",
              }}
            >
              <IconButton size="small" onClick={regenerateAvatar}>
                <RefreshIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "relative",
              "&:hover .nameRefreshIcon": {
                visibility: "visible",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 18 }}>
              {candidateInstance.fullName}
            </Typography>
            <Tooltip title="Regenerate candidate name">
              <IconButton
                size="small"
                onClick={handleFetchNewName}
                sx={{
                  visibility: "hidden",
                  transition: "visibility 0.2s",
                }}
                className="nameRefreshIcon"
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Delete Candidate">
            <IconButton size="medium" onClick={handleDelete}>
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              backgroundColor: candidateInstance.partyColor,
              width: 16,
              height: 16,
              marginRight: 1,
            }}
          ></Box>
          <Typography variant="subtitle2">{partyName} Party</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "right", height: "24px" }}>
          <Typography variant="body2" sx={{ flexGrow: 1, textAlign: "right" }}>
            Overall popularity
          </Typography>
          <PopularitySlider
            value={candidateInstance.popularity}
            onChange={(event, newValue, activeThumb) =>
              handlePopularityChange(event, newValue, activeThumb, "popularity")
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "right", height: "24px" }}>
          <Typography variant="body2" sx={{ flexGrow: 1, textAlign: "right" }}>
            In-party popularity
          </Typography>
          <PopularitySlider
            value={candidateInstance.inPartyPopularity}
            onChange={(event, newValue, activeThumb) =>
              handlePopularityChange(
                event,
                newValue,
                activeThumb,
                "inPartyPopularity"
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditableCandidateCard;
