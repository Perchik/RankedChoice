import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  IconButton,
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

  const handleAddCandidate = async (partyId: string) => {
    const newCandidate = await Candidate.fromRandomComponents(
      partyColors[partyId]
    );
    const candidateObj = { ...newCandidate }; // Ensure it's a plain object
    dispatch(addCandidate({ partyId, candidate: candidateObj }));
  };

  return (
    <div>
      {partyList.map((party: PartyState) => (
        <Accordion
          key={party.id}
          style={{ backgroundColor: partyColors[party.id] }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h6"
              style={{ color: parties[party.id].fontColor }}
            >
              {parties[party.id].name} Party
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" width="100%">
              {candidatesList[party.id]?.map((candidate, index) => (
                <EditableCandidateCard
                  key={index}
                  partyId={party.id}
                  candidate={candidate}
                  candidateIndex={index}
                />
              ))}
              <Box display="flex" justifyContent="center" mt={2}>
                <IconButton onClick={() => handleAddCandidate(party.id)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CandidateList;
