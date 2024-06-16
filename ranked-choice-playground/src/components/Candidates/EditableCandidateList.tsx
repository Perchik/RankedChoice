import React, { useState, useEffect } from "react";
import EditableCandidateCard from "./EditableCandidateCard";
import { Candidate } from "../../types/types";
import { generateRandomCandidate } from "../../services/candidateService";
const EditableCandidateList: React.FC<{ numberOfCandidates: number }> = ({
  numberOfCandidates,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const promises = Array.from({ length: numberOfCandidates }, () =>
        generateRandomCandidate()
      );
      const results = await Promise.all(promises);
      setCandidates(results);
      setLoading(false);
    };

    fetchCandidates();
  }, [numberOfCandidates]);

  const handleUpdateCandidate = (
    index: number,
    updatedCandidate: Candidate
  ) => {
    const newCandidates = [...candidates];
    newCandidates[index] = updatedCandidate;
    setCandidates(newCandidates);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="candidate-list">
      {candidates.map((candidate, index) => (
        <EditableCandidateCard
          key={index}
          candidate={candidate}
          onUpdate={(updatedCandidate) =>
            handleUpdateCandidate(index, updatedCandidate)
          }
        />
      ))}
    </div>
  );
};

export default EditableCandidateList;
