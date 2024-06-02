import React, { useState, useEffect } from "react";
import EditablePoliticianCard from "./EditablePoliticianCard";
import { Politician } from "./../../types/types";
import { generateRandomPolitician } from "../../services/politicianService";
const EditablePoliticianList: React.FC<{ numberOfPoliticians: number }> = ({
  numberOfPoliticians,
}) => {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticians = async () => {
      setLoading(true);
      const promises = Array.from({ length: numberOfPoliticians }, () =>
        generateRandomPolitician()
      );
      const results = await Promise.all(promises);
      setPoliticians(results);
      setLoading(false);
    };

    fetchPoliticians();
  }, [numberOfPoliticians]);

  const handleUpdatePolitician = (
    index: number,
    updatedPolitician: Politician
  ) => {
    const newPoliticians = [...politicians];
    newPoliticians[index] = updatedPolitician;
    setPoliticians(newPoliticians);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="politician-list">
      {politicians.map((politician, index) => (
        <EditablePoliticianCard
          key={index}
          politician={politician}
          onUpdate={(updatedPolitician) =>
            handleUpdatePolitician(index, updatedPolitician)
          }
        />
      ))}
    </div>
  );
};

export default EditablePoliticianList;
