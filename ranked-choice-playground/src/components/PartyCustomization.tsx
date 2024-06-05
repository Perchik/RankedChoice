import React, { useEffect, useState } from "react";
import { Box, Typography, Slider, Grid, Container } from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import InteractivePartyGraph from "./InteractivePartyGraph";
import { PartyGraph } from "../models/PartyGraph";
import { PartyStatus } from "../constants/PartyStatus";
import { Party } from "../models/Party";
import { parties, partyOrder } from "../constants/PartyData";

// Define item types
const ItemTypes = {
  CIRCLE: "circle",
};

// Circle Component: Represents a draggable circle
const Circle: React.FC<{ color: string }> = ({ color }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CIRCLE,
    item: { color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: color,
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        margin: "2px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
};

// Bin Component: Represents a drop zone for circles
const Bin: React.FC<{
  label: string;
  onDrop: (item: any) => void;
  children?: React.ReactNode;
}> = ({ label, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CIRCLE,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed gray",
        padding: "10px",
        margin: "4px",
        textAlign: "center",
        backgroundColor: isOver ? "lightyellow" : "white",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "start",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6" style={{ width: "100%" }}>
        {label}
      </Typography>
      {children}
    </div>
  );
};

// PartyCustomization Component: Main component for customizing party configurations
const PartyCustomization: React.FC<{
  preset: string | null;
  numberOfParties: number;
  setNumberOfParties: (count: number) => void;
}> = ({ preset, numberOfParties, setNumberOfParties }) => {
  const [partyGraph, setPartyGraph] = useState<PartyGraph | null>(null);
  const [majorParties, setMajorParties] = useState<Party[]>([]);
  const [minorParties, setMinorParties] = useState<Party[]>([]);
  const [fringeParties, setFringeParties] = useState<Party[]>([]);

  // Initialize the party graph and set initial party states based on the preset
  useEffect(() => {
    const pg = new PartyGraph();
    if (preset) {
      pg.loadFromConfig(preset);
    }
    setPartyGraph(pg);
    setMajorParties(
      pg.getParties().filter((party) => party.status === PartyStatus.Major)
    );
    setMinorParties(
      pg.getParties().filter((party) => party.status === PartyStatus.Minor)
    );
    setFringeParties(
      pg.getParties().filter((party) => party.status === PartyStatus.Fringe)
    );
    setNumberOfParties(pg.getParties().length);
  }, [preset, setNumberOfParties]);

  // Update the party states and refresh the party graph
  const updateParties = (updatedParties: Party[]) => {
    partyGraph!.updateParties(updatedParties);
    setPartyGraph(partyGraph!);
    setMajorParties(
      updatedParties.filter((party) => party.status === PartyStatus.Major)
    );
    setMinorParties(
      updatedParties.filter((party) => party.status === PartyStatus.Minor)
    );
    setFringeParties(
      updatedParties.filter((party) => party.status === PartyStatus.Fringe)
    );
  };
  // Handle changes in the slider for the number of parties
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const newPartyCount = newValue as number;
    const currentPartyCount = numberOfParties;
    const updatedParties = [...partyGraph!.getParties()];

    const currentPartyIds = new Set(updatedParties.map((party) => party.id));

    // Add new parties if the new count is higher
    if (newPartyCount > currentPartyCount) {
      for (let i = 0; i < partyOrder.length; i++) {
        if (currentPartyIds.size >= newPartyCount) break;
        const partyId = partyOrder[i];
        if (!currentPartyIds.has(partyId)) {
          const partyData = parties[partyId];
          if (partyData) {
            const status =
              partyData.ordinal === 1
                ? PartyStatus.Major
                : partyData.ordinal === 2
                  ? PartyStatus.Minor
                  : PartyStatus.Fringe;
            const newParty = new Party(
              partyId,
              partyData.name,
              partyData.color,
              status
            );
            updatedParties.push(newParty);
            currentPartyIds.add(partyId);
          }
        }
      }
    } else {
      updatedParties.splice(newPartyCount);
    }

    setNumberOfParties(newPartyCount);
    updateParties(updatedParties);
  };

  // Handle dropping a party into a bin
  const handleDrop = (party: any, status: PartyStatus) => {
    const updatedParties = [...partyGraph!.getParties()];
    const targetParty = updatedParties.find((p) => p.color === party.color);
    if (targetParty) {
      targetParty.status = status;
    }
    updateParties(updatedParties);
  };

  // Handle dropping a party into the trash bin
  const handleTrashDrop = (party: any) => {
    const updatedParties = [...partyGraph!.getParties()].filter(
      (p) => p.color !== party.color
    );
    setNumberOfParties(updatedParties.length);
    updateParties(updatedParties);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Customize your scenario
        </Typography>
        <Slider
          value={numberOfParties}
          min={1}
          max={partyOrder.length}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          sx={{ mb: 4 }}
        />
        <DndProvider backend={HTML5Backend}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  gap: 2,
                }}
              >
                <Bin
                  label="Major Parties"
                  onDrop={(item) => handleDrop(item, PartyStatus.Major)}
                >
                  {majorParties.map((party) => (
                    <Circle key={party.id} color={party.color} />
                  ))}
                </Bin>
                <Bin
                  label="Minor Parties"
                  onDrop={(item) => handleDrop(item, PartyStatus.Minor)}
                >
                  {minorParties.map((party) => (
                    <Circle key={party.id} color={party.color} />
                  ))}
                </Bin>
                <Bin
                  label="Fringe Parties"
                  onDrop={(item) => handleDrop(item, PartyStatus.Fringe)}
                >
                  {fringeParties.map((party) => (
                    <Circle key={party.id} color={party.color} />
                  ))}
                </Bin>
                <Bin label="Trash" onDrop={handleTrashDrop}>
                  <Typography variant="body1">
                    Drag a party here to remove it from the scenario.
                  </Typography>
                </Bin>
              </Box>
            </Grid>
            <Grid item xs={10}>
              graph
            </Grid>
          </Grid>
        </DndProvider>
      </Box>
    </Container>
  );
};

export default PartyCustomization;
