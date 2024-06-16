import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { generateRandomCandidate } from "../../services/candidateService";
import { Candidate } from "../../models/Candidate";
import EditableCandidateCard from "./EditableCandidateCard";

const CandidateManager: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const addNewCandidate = async () => {
    const newCandidate = await generateRandomCandidate();
    setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
  };

  const updateCandidate = (index: number, updatedCandidate: Candidate) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = updatedCandidate;
    setCandidates(updatedCandidates);
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={addNewCandidate}>
        Add Candidate
      </Button>
      {candidates.map((candidate, index) => (
        <EditableCandidateCard
          key={index}
          candidate={candidate}
          onUpdate={(updatedCandidate) =>
            updateCandidate(index, updatedCandidate)
          }
        />
      ))}
    </Box>
  );
};

export default CandidateManager;
