import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditableCandidateCard from "../Candidates/EditableCandidateCard";
import { addCandidate } from "../../slices/candidatesSlice";
import { partyColors, parties } from "../../constants/PartyData";
import { PartyState } from "../../models/Party";
import { Candidate } from "../../models/Candidate";

const CandidateList: React.FC = () => {
  const dispatch = useDispatch();
  const partyList = useSelector((state: RootState) => state.parties.parties);
  const candidatesList = useSelector(
    (state: RootState) => state.candidates.candidates
  );

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (partyId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? partyId : false);
    };

  const handleAddCandidate = async (partyId: string) => {
    try {
      const newCandidate = await Candidate.fromRandomComponents(
        partyColors[partyId]
      );
      const candidateObj = { ...newCandidate }; // Ensure it's a plain object
      dispatch(addCandidate({ partyId, candidate: candidateObj }));
    } catch (error) {
      console.error("Failed to add candidate:", error);
    }
  };

  useEffect(() => {
    // Ensure candidates are only added once per party
    partyList.forEach(async (party) => {
      if (!candidatesList[party.id] || candidatesList[party.id].length === 0) {
        try {
          const newCandidate = await Candidate.fromRandomComponents(
            partyColors[party.id]
          );
          const candidateObj = { ...newCandidate }; // Ensure it's a plain object
          dispatch(
            addCandidate({ partyId: party.id, candidate: candidateObj })
          );
        } catch (error) {
          console.error("Failed to add candidate on init:", error);
        }
      }
    });
    setExpanded(partyList[0]?.id || false);
  }, [dispatch, partyList, candidatesList]);

  return (
    <div>
      {partyList.map((party: PartyState) => (
        <Accordion
          key={party.id}
          expanded={expanded === party.id}
          onChange={handleChange(party.id)}
          sx={{ backgroundColor: partyColors[party.id] }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h6"
              sx={{ color: parties[party.id].fontColor }}
            >
              {parties[party.id].name} Party
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "background.paper" }}>
            <Stack
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
            >
              {candidatesList[party.id]?.map((candidate, index) => (
                <EditableCandidateCard
                  key={index}
                  partyId={party.id}
                  candidate={candidate}
                  candidateIndex={index}
                />
              ))}
              <IconButton
                sx={{
                  width: "auto",
                  height: "auto",
                  alignSelf: "center",
                  backgroundColor: "#9c9c9c",
                  boxShadow: 3,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#696969",
                  },
                }}
                onClick={() => handleAddCandidate(party.id)}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CandidateList;
