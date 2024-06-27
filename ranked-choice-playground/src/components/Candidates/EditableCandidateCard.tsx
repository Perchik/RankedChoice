import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  styled,
} from "@mui/material";
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
import RandomHeadshot, {
  RandomHeadshotHandle,
  RandomHeadshotProps,
} from "../Headshot/RandomHeadshot";
import { RootState } from "../../store";

interface EditableCandidateCardProps {
  partyId: string;
  candidate: any; // Use any for plain object
  candidateIndex: number;
  onDelete: () => void;
}

const PhotoCard = styled(Card)(({ theme }) => ({
  display: "flex",
  position: "relative",
  alignItems: "stretch",
  boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ccc",
  overflow: "hidden",
  backgroundImage: "linear-gradient(to bottom right,#ffffff,#a7b2d3)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    borderRadius: "8px",
    border: "2px solid #fff",
    boxShadow: "inset 0 1px 1px rgba(0, 0, 0, 0.4)",
    pointerEvents: "none",
  },
}));

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

  const headshotRef = useRef<RandomHeadshotHandle>(null);

  const handleFetchNewName = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const { title, firstName, lastName } = await fetchRandomName();
    const newFullName = Candidate.generateFullName(title, firstName, lastName);
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

  const regenerateAvatar = (
    event: React.MouseEvent,
    section: "head" | "body"
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (headshotRef.current) {
      headshotRef.current.regenerateHeadshot({
        reloadBody: section === "body",
        reloadHead: section === "head",
      });
    }
  };

  const handlePopularityChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null,
    type: "popularity" | "inPartyPopularity"
  ) => {
    event.preventDefault();
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

  const randomHeadshotProps: RandomHeadshotProps = {
    accessoryColor: candidateInstance.partyColor,
  };

  const commonBoxStyles = {
    position: "absolute",
    left: 0,
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      border: "1px solid",
      borderColor: "primary.main",
      ".reloadIcon": {
        visibility: "visible",
      },
    },
  };

  const partyCandidates = useSelector(
    (state: RootState) => state.candidates.candidates[partyId]
  );

  const isSingleCandidate = partyCandidates && partyCandidates.length === 1;

  return (
    <Paper
      elevation={6}
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
      <PhotoCard>
        <RandomHeadshot ref={headshotRef} {...randomHeadshotProps} />
        <Tooltip
          title="Change head"
          placement="top"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -30],
                },
              },
            ],
          }}
        >
          <Box
            sx={{
              ...commonBoxStyles,
              top: 0,
              height: "65%",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
            onClick={(e) => regenerateAvatar(e, "head")}
          >
            <RefreshIcon
              className="reloadIcon"
              fontSize="large"
              sx={{
                color: "white",
                opacity: ".5",
                transition: "visibility 0.2s",
                visibility: "hidden",
              }}
            />
          </Box>
        </Tooltip>

        <Tooltip
          title="Change body"
          placement="bottom"
          arrow
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10],
                },
              },
            ],
          }}
        >
          <Box
            sx={{
              ...commonBoxStyles,
              bottom: 0,
              height: "35%",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
            onClick={(e) => regenerateAvatar(e, "body")}
          >
            <RefreshIcon
              className="reloadIcon"
              fontSize="large"
              sx={{
                color: "white",
                opacity: ".5",
                transition: "visibility 0.2s",
                visibility: "hidden",
              }}
            />
          </Box>
        </Tooltip>
      </PhotoCard>

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
              border: "1px solid transparent",
              position: "relative",
              px: 0.5,
              "&:hover": {
                cursor: "pointer",
                borderColor: "primary.main",
              },
            }}
            onClick={handleFetchNewName}
          >
            <Tooltip
              title="Regenerate candidate name"
              arrow
              placement="top"
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 0],
                    },
                  },
                ],
              }}
            >
              <Typography variant="h6" sx={{ fontSize: 18 }}>
                {candidateInstance.fullName}
              </Typography>
            </Tooltip>
          </Box>
          <Tooltip title="Delete Candidate">
            <IconButton size="small" onClick={handleDelete}>
              <DeleteIcon fontSize="inherit" />
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
        <Typography variant="body1" fontWeight={"bold"}>
          Popularity
        </Typography>
        <Box sx={{ display: "flex", alignItems: "right", height: "24px" }}>
          <Typography variant="body2" sx={{ flexGrow: 1, textAlign: "right" }}>
            Overall
          </Typography>
          <PopularitySlider
            value={candidateInstance.popularity}
            onChange={(event, newValue) =>
              handlePopularityChange(event, newValue, "popularity")
            }
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "right", height: "24px" }}>
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              textAlign: "right",
              fontStyle: isSingleCandidate ? "italic" : "none",
              color: isSingleCandidate ? "#c0c0c0" : "inherit",
            }}
          >
            Party
          </Typography>
          <PopularitySlider
            value={candidateInstance.inPartyPopularity}
            onChange={(event, newValue) =>
              handlePopularityChange(event, newValue, "inPartyPopularity")
            }
            disabled={isSingleCandidate}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default EditableCandidateCard;
