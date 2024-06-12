import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Slider,
  Grid,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import InteractivePartyGraph from "./InteractivePartyGraph";
import PartyBins from "./PartyBins";
import { PartyGraph } from "../../models/PartyGraph";
import { PartyStatus } from "../../models/Party";
import { Party } from "../../models/Party";
import { parties, partyOrder } from "../../constants/PartyData";

const PartyCustomization: React.FC<{
  preset: string | null;
  numberOfParties: number;
  setNumberOfParties: (count: number) => void;
}> = ({ preset, numberOfParties, setNumberOfParties }) => {
  const [partyGraph, setPartyGraph] = useState<PartyGraph | null>(null);
  const [majorParties, setMajorParties] = useState<Party[]>([]);
  const [minorParties, setMinorParties] = useState<Party[]>([]);
  const [fringeParties, setFringeParties] = useState<Party[]>([]);
  const [nodesToRemove, setNodesToRemove] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) {
      const pg = new PartyGraph();
      if (preset) {
        pg.loadFromConfig(preset);
      }
      setPartyGraph(pg);
      const allParties = pg.getParties();
      setMajorParties(
        allParties.filter((party) => party.status === PartyStatus.Major)
      );
      setMinorParties(
        allParties.filter((party) => party.status === PartyStatus.Minor)
      );
      setFringeParties(
        allParties.filter((party) => party.status === PartyStatus.Fringe)
      );
      setNumberOfParties(allParties.length);
      isLoaded.current = true;
    }
  }, [preset, setNumberOfParties]);

  const updateParties = (updatedParties: Party[]) => {
    if (partyGraph) {
      partyGraph.updateParties(updatedParties);
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
            partyGraph.addInteraction(newParty.id, newParty.id, 0);
            currentPartyIds.add(partyId);
          }
        }
      }
    } else {
      const partiesToRemove = updatedParties.splice(newPartyCount);
      setNodesToRemove(partiesToRemove.map((party) => party.id));
      partiesToRemove.forEach((party) => partyGraph.removeParty(party.id));
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
      partyGraph.updatePartyStatus(targetParty.id, status);
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
    partyGraph.removeParty(party.id);
    updateParties(updatedParties);
  };

  const handleNodeDeleted = (partyId: string) => {
    console.log("Node deleted:", partyId);
    // Perform additional cleanup or updates if necessary
    setNodesToRemove((prev) => prev.filter((id) => id !== partyId));
    if (partyGraph) {
      partyGraph.removeParty(partyId);
    }
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
              <PartyBins
                majorParties={majorParties}
                minorParties={minorParties}
                fringeParties={fringeParties}
                handleDrop={handleDrop}
                handleTrashDrop={handleTrashDrop}
              />
            </Grid>
            <Grid item xs={10}>
              {partyGraph && (
                <InteractivePartyGraph
                  partyGraph={partyGraph}
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
