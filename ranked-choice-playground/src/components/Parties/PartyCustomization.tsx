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
import InteractivePartyGraph from "./InteractivePartyGraph";
import PartyBins from "./PartyBins";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addPartyToStore,
  removePartyFromStore,
  updatePartyStatusInStore,
} from "../../utils/partyUtils";
import { parseConfig } from "../../utils/partyGraphParser";
import { PartyStatus, PartyState } from "../../models/Party";
import { parties, partyOrder } from "../../constants/PartyData";

const PartyCustomization: React.FC<{
  preset: string | null;
  numberOfParties: number;
  setNumberOfParties: (count: number) => void;
}> = ({ preset, numberOfParties, setNumberOfParties }) => {
  const dispatch = useDispatch();
  const partyStates = useSelector((state: RootState) => state.parties.parties);
  const [majorParties, setMajorParties] = useState<PartyState[]>([]);
  const [minorParties, setMinorParties] = useState<PartyState[]>([]);
  const [fringeParties, setFringeParties] = useState<PartyState[]>([]);
  const [nodesToRemove, setNodesToRemove] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current && preset !== null) {
      if (preset) {
        parseConfig(preset);
      }
      isLoaded.current = true;
    }
  }, [preset]);

  useEffect(() => {
    setMajorParties(
      partyStates.filter((party) => party.status === PartyStatus.Major)
    );
    setMinorParties(
      partyStates.filter((party) => party.status === PartyStatus.Minor)
    );
    setFringeParties(
      partyStates.filter((party) => party.status === PartyStatus.Fringe)
    );
    setNumberOfParties(partyStates.length);
  }, [partyStates, setNumberOfParties]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const newPartyCount = newValue as number;
    const currentPartyCount = numberOfParties;

    if (newPartyCount > currentPartyCount) {
      const currentPartyIds = new Set(partyStates.map((party) => party.id));

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
            try {
              const action = addPartyToStore(partyId, status);
              dispatch(action);
              currentPartyIds.add(partyId);
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    } else {
      const partiesToRemove = partyStates.slice(newPartyCount);
      setNodesToRemove(partiesToRemove.map((party) => party.id));
      partiesToRemove.forEach((party) => {
        dispatch(removePartyFromStore(party.id));
      });
    }

    setNumberOfParties(newPartyCount);
    setUpdateTrigger((prev) => prev + 1); // Trigger a re-render
  };

  const handleDrop = (party: PartyState, status: PartyStatus) => {
    dispatch(updatePartyStatusInStore(party.id, status));
    setUpdateTrigger((prev) => prev + 1); // Trigger a re-render
  };

  const handleTrashDrop = (party: PartyState) => {
    if (partyStates.length === 1) {
      setOpenSnackbar(true);
      return;
    }

    dispatch(removePartyFromStore(party.id));
    setNodesToRemove([party.id]); // Track node to remove
    setUpdateTrigger((prev) => prev + 1); // Trigger a re-render
  };

  const handleNodeDeleted = (partyId: string) => {
    console.log("Node deleted:", partyId);
    setNodesToRemove((prev) => prev.filter((id) => id !== partyId));
    dispatch(removePartyFromStore(partyId));
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
            <InteractivePartyGraph
              onNodeDeleted={handleNodeDeleted}
              nodesToRemove={nodesToRemove}
              updateTrigger={updateTrigger}
            />
          </Grid>
        </Grid>
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
