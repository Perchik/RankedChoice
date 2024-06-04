import React, { useState } from "react";
import PartyDisplay from "./PartyDisplay";
import { PartyGraph } from "../models/PartyGraph";
import PartyPresetSelector from "./PartyPresetSelector";
import { PartyStatus } from "../constants/PartyStatus";
import { Party } from "../models/Party";

const PartySetup: React.FC = () => {
  const [partyGraph, setPartyGraph] = useState(new PartyGraph());
  const [numberOfParties, setNumberOfParties] = useState(
    partyGraph.getParties().length
  );

  const handlePresetSelect = (fileContent: string) => {
    const newPartyGraph = new PartyGraph();
    newPartyGraph.loadFromSimplifiedFormat(fileContent);
    setPartyGraph(newPartyGraph);
    setNumberOfParties(newPartyGraph.getParties().length);
  };

  const handleNumberOfPartiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfParties(Number(event.target.value));
  };

  const handleStatusChange = (id: string, newStatus: PartyStatus) => {
    setPartyGraph((prevGraph) => {
      const newGraph = new PartyGraph();
      newGraph.parties = prevGraph.getParties().map((party) => {
        if (party.id === id) {
          return new Party(party.id, party.name, party.color, newStatus);
        }
        return party;
      });
      newGraph.interactions = prevGraph.interactions;
      return newGraph;
    });
  };

  const parties = partyGraph.getParties().slice(0, numberOfParties);

  return (
    <div>
      <h2>Party Setup</h2>
      <PartyPresetSelector onPresetSelect={handlePresetSelect} />
      <div>
        <label>Number of Parties: {numberOfParties}</label>
        <input
          type="range"
          min="1"
          max={partyGraph.getParties().length}
          value={numberOfParties}
          onChange={handleNumberOfPartiesChange}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {parties.map((party) => (
          <PartyDisplay
            key={party.id}
            id={party.id}
            name={party.name}
            color={party.color}
            status={party.status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
      <div>
        <h3>Interactions</h3>
        <ul>
          {partyGraph.interactions.map((interaction, index) => (
            <li key={index}>
              {interaction.from} -&gt; {interaction.to} (Weight:{" "}
              {interaction.weight})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartySetup;
