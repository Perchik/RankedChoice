import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  generateJobTitle,
  generateOrganization,
} from "../../scripts/election_title";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  &:hover .hover-buttons {
    visibility: visib
  }
`;

const ElectionName = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2em;
  margin-bottom: 20px;
  padding: 10px;
`;

const HoverButtons = styled.div`
  position: absolute;
  right: -40px;
  visibility: hidden;
  display: flex;

  button {
    background-color: #007bff;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    font-size: 0.8em;
    margin-left: 5px;
    padding: 5px 10px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ToggleContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;

  label {
    font-size: 1.1em;
    margin-left: 10px;
  }
`;

const SeatsInput = styled.input`
  font-size: 1em;
  margin-left: 10px;
  padding: 5px;
  text-align: center;
  width: 50px;
`;

const SetupElection: React.FC = () => {
  const [electionName, setElectionName] = useState(generateJobTitle());
  const [singleSeat, setSingleSeat] = useState(true);
  const [numSeats, setNumSeats] = useState(1);

  useEffect(() => {
    // Generate new values when the component mounts
    setElectionName(generateJobTitle());
    //  setOrganization(generateOrganization());
  }, []);

  const handleToggleChange = () => {
    setSingleSeat(!singleSeat);
    if (singleSeat) {
      setNumSeats(1);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElectionName(e.target.value);
  };

  const handleReload = () => {
    if (singleSeat) {
      setElectionName(generateJobTitle());
    } else {
      setElectionName(generateOrganization());
    }
  };

  const handleEdit = () => {
    // Handle edit action (focus input, etc.)
  };

  return (
    <Container>
      <h2>Setup Election</h2>
      <NameContainer>
        <ElectionName value={electionName} onChange={handleNameChange} />
        <HoverButtons className="hover-buttons">
          <button onClick={handleReload}>Reload</button>
          <button onClick={handleEdit}>Edit</button>
        </HoverButtons>
      </NameContainer>
      <ToggleContainer>
        <input
          type="checkbox"
          checked={singleSeat}
          onChange={handleToggleChange}
        />
        <label>Single Seat Election</label>
      </ToggleContainer>
      {!singleSeat && (
        <div>
          <label>
            Number of Seats:
            <SeatsInput
              type="number"
              value={numSeats}
              onChange={(e) => setNumSeats(parseInt(e.target.value))}
              min={1}
            />
          </label>
        </div>
      )}
    </Container>
  );
};

export default SetupElection;
