import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Stack,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditableCandidateCard from "../Candidates/EditableCandidateCard";
import { addCandidate, removeCandidate } from "../../slices/candidatesSlice";
import { partyColors, parties } from "../../constants/PartyData";
import { PartyState } from "../../models/Party";
import { Candidate } from "../../models/Candidate";
import CandidatePieChart from "./CandidatePieChart";
import { TransitionGroup } from "react-transition-group";

const CandidateManager: React.FC = () => {
  const dispatch = useDispatch();
  const partyList = useSelector((state: RootState) => state.parties.parties);
  const candidatesList = useSelector(
    (state: RootState) => state.candidates.candidates
  );

  const [expanded, setExpanded] = useState<string | false>(false);
  const isInitialized = useRef(false);

  const handleChange =
    (partyId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? partyId : false);
    };

  const handleAddCandidate = async (partyId: string) => {
    try {
      const newCandidate = await Candidate.fromRandomComponents(partyId);
      const candidateObj = { ...newCandidate }; // Ensure it's a plain object
      dispatch(addCandidate({ partyId, candidate: candidateObj }));
    } catch (error) {
      console.error("Failed to add candidate:", error);
    }
  };

  const handleDeleteCandidate = (partyId: string, candidateId: number) => {
    dispatch(removeCandidate({ partyId, candidateId }));
  };

  useEffect(() => {
    if (!isInitialized.current) {
      partyList.forEach(async (party) => {
        if (
          !candidatesList[party.id] ||
          candidatesList[party.id].length === 0
        ) {
          try {
            const newCandidate = await Candidate.fromRandomComponents(party.id);
            const candidateObj = { ...newCandidate }; // Ensure it's a plain object
            dispatch(
              addCandidate({ partyId: party.id, candidate: candidateObj })
            );
          } catch (error) {
            console.error("Failed to add candidate on init:", error);
          }
        }
      });
      if (partyList.length > 0) {
        setExpanded(partyList[0].id);
      }
      isInitialized.current = true;
    }
  }, [dispatch, partyList, candidatesList]);

  return (
    <div>
      <CandidatePieChart />
      {partyList.map((party: PartyState) => {
        const partyName = parties[party.id].name;
        const firstChar = partyName.charAt(0);
        const restOfName = partyName.slice(1);

        return (
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
                [{firstChar}]{restOfName} Party
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "background.paper" }}>
              <Stack
                component={TransitionGroup}
                spacing={{ xs: 1 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                {candidatesList[party.id]?.map((candidate, index) => (
                  <Collapse
                    key={candidate.id}
                    timeout={400}
                    orientation="horizontal"
                  >
                    <EditableCandidateCard
                      partyId={party.id}
                      candidate={candidate}
                      candidateIndex={index}
                      onDelete={() =>
                        handleDeleteCandidate(party.id, candidate.id)
                      }
                    />
                  </Collapse>
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
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation(); // Prevent accordion collapse
                    handleAddCandidate(party.id);
                  }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CandidateManager;
