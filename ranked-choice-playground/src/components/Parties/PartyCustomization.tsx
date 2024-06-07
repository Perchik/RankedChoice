import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Grid,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import InteractivePartyGraph from "./InteractivePartyGraph";
import { PartyGraph } from "../../models/PartyGraph";
import { PartyStatus } from "../../constants/PartyStatus";
import { Party } from "../../models/Party";
import { parties, partyOrder } from "../../constants/PartyData";

const ItemTypes = {
  CIRCLE: "circle",
};

const Circle: React.FC<{ color: string; id: string }> = ({ color, id }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CIRCLE,
    item: { color, id },
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
        width: "100%",
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

const PartyCustomization: React.FC<{
  preset: string | null;
  numberOfParties: number;
  setNumberOfParties: (count: number) => void;
}> = ({ preset, numberOfParties, setNumberOfParties }) => {
  const [partyGraph, setPartyGraph] = useState<PartyGraph | null>(null);
  const [majorParties, setMajorParties] = useState<Party[]>([]);
  const [minorParties, setMinorParties] = useState<Party[]>([]);
  const [fringeParties, setFringeParties] = useState<Party[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Use this to trigger re-render
  const [nodesToRemove, setNodesToRemove] = useState<string[]>([]); // Track nodes to remove
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  const updateParties = (updatedParties: Party[]) => {
    if (partyGraph) {
      partyGraph.updateParties(updatedParties);
      setUpdateTrigger((prev) => prev + 1); // Trigger a re-render
      setMajorParties(
        updatedParties.filter((party) => party.status === PartyStatus.Major)
      );
      setMinorParties(
        updatedParties.filter((party) => party.status === PartyStatus.Minor)
      );
      setFringeParties(
        updatedParties.filter((party) => party.status === PartyStatus.Fringe)
      );
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (!partyGraph) return;

    const newPartyCount = newValue as number;
    const currentPartyCount = numberOfParties;
    const updatedParties = [...partyGraph.getParties()];

    const currentPartyIds = new Set(updatedParties.map((party) => party.id));

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
              partyData.fontColor,
              status
            );
            updatedParties.push(newParty);
            currentPartyIds.add(partyId);
          }
        }
      }
    } else {
      const partiesToRemove = updatedParties.splice(newPartyCount);
      setNodesToRemove(partiesToRemove.map((party) => party.id));
    }

    setNumberOfParties(newPartyCount);
    updateParties(updatedParties);
  };

  const handleDrop = (party: any, status: PartyStatus) => {
    if (!partyGraph) return;

    const updatedParties = [...partyGraph.getParties()];
    const targetParty = updatedParties.find((p) => p.id === party.id);
    if (targetParty) {
      targetParty.status = status;
    }
    updateParties(updatedParties);
  };

  const handleTrashDrop = (party: any) => {
    if (!partyGraph) return;

    if (partyGraph.getParties().length === 1) {
      setOpenSnackbar(true);
      return;
    }

    const updatedParties = [...partyGraph.getParties()].filter(
      (p) => p.id !== party.id
    );
    setNumberOfParties(updatedParties.length);
    setNodesToRemove([party.id]); // Track node to remove
    updateParties(updatedParties);
  };

  const handleNodeAdded = (party: any) => {
    console.log("Node added:", party);
  };

  const handleNodeDeleted = (partyId: string) => {
    console.log("Node deleted:", partyId);
    // Perform additional cleanup or updates if necessary
    setNodesToRemove((prev) => prev.filter((id) => id !== partyId));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
                    <Circle key={party.id} color={party.color} id={party.id} />
                  ))}
                </Bin>
                <Bin
                  label="Minor Parties"
                  onDrop={(item) => handleDrop(item, PartyStatus.Minor)}
                >
                  {minorParties.map((party) => (
                    <Circle key={party.id} color={party.color} id={party.id} />
                  ))}
                </Bin>
                <Bin
                  label="Fringe Parties"
                  onDrop={(item) => handleDrop(item, PartyStatus.Fringe)}
                >
                  {fringeParties.map((party) => (
                    <Circle key={party.id} color={party.color} id={party.id} />
                  ))}
                </Bin>
                <Bin label="Trash" onDrop={(item) => handleTrashDrop(item)}>
                  <Typography variant="body1">
                    Drag a party here to remove it from the scenario.
                  </Typography>
                </Bin>
              </Box>
            </Grid>
            <Grid item xs={10}>
              {partyGraph && (
                <InteractivePartyGraph
                  partyGraph={partyGraph}
                  onNodeAdded={handleNodeAdded}
                  onNodeDeleted={handleNodeDeleted}
                  nodesToRemove={nodesToRemove}
                />
              )}
            </Grid>
          </Grid>
        </DndProvider>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            You cannot delete the last remaining party.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default PartyCustomization;
