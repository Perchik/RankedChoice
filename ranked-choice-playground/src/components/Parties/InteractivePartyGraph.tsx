import React, { useEffect, useRef, useState, useCallback } from "react";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import CytoscapeComponent from "react-cytoscapejs";
import gridGuide from "cytoscape-grid-guide";
import { PartyGraph } from "../../models/PartyGraph";
import { PartyStatus } from "../../models/Party";
import {
  Button,
  Checkbox,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import cytoscapeStylesheet from "./cytoscapeStylesheet";

Cytoscape.use(fcose);
Cytoscape.use(gridGuide as any);

const LAYOUT = "fcose";

interface InteractivePartyGraphProps {
  partyGraph: PartyGraph;
  onNodeDeleted: (partyId: string) => void;
  nodesToRemove: string[]; // List of nodes to be removed
  updateTrigger: number; // Add this to trigger updates
}

const InteractivePartyGraph: React.FC<InteractivePartyGraphProps> = ({
  partyGraph,
  onNodeDeleted,
  nodesToRemove,
  updateTrigger, // Add this to trigger updates
}) => {
  const cyRef = useRef<cytoscape.Core | undefined>(undefined);
  const [sourceNode, setSourceNode] = useState<string>("");
  const [targetNode, setTargetNode] = useState<string>("");
  const [isOpposition, setIsOpposition] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(0.5);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const layoutOptions = useCallback(
    () => ({
      name: LAYOUT,
      fit: true,
    }),
    []
  );

  const addElementsToCytoscape = useCallback(
    (cy: cytoscape.Core) => {
      const existingNodes = new Set(cy.nodes().map((node) => node.id()));
      const newNodes: cytoscape.ElementDefinition[] = partyGraph
        .getParties()
        .filter((party) => !existingNodes.has(party.id))
        .map((party) => ({
          group: "nodes" as cytoscape.ElementGroup,
          data: {
            id: party.id,
            label: party.name,
            color: party.color,
            size:
              party.status === PartyStatus.Major
                ? 80
                : party.status === PartyStatus.Minor
                  ? 40
                  : 20,
            fontColor: party.fontColor,
            fontSize:
              party.status === PartyStatus.Major
                ? 20
                : party.status === PartyStatus.Minor
                  ? 10
                  : 5,
          },
        }));

      const existingEdges = new Set(
        cy
          .edges()
          .map((edge) => `${edge.data("source")}-${edge.data("target")}`)
      );
      const newEdges: cytoscape.ElementDefinition[] = [];
      partyGraph.getParties().forEach((party) => {
        party.interactions.forEach((interaction) => {
          const edgeId = `${party.id}-${interaction.toPartyId}`;
          if (!existingEdges.has(edgeId)) {
            newEdges.push({
              group: "edges" as cytoscape.ElementGroup,
              data: {
                source: party.id,
                target: interaction.toPartyId,
                weight: interaction.weight * 16,
                opposition: interaction.opposition ? "true" : "false",
                label: interaction.weight.toString(),
              },
            });
            existingEdges.add(edgeId);
          }
        });
      });

      cy.add([...newNodes, ...newEdges]);

      // Only run layout if new nodes or edges were added
      if (newNodes.length > 0 || newEdges.length > 0) {
        setTimeout(() => {
          if (!cy.destroyed()) {
            cy.layout(layoutOptions()).run();
          }
        }, 100); // Adding a small delay before the initial layout
      }
    },
    [partyGraph, layoutOptions]
  );

  const updateNodeSize = useCallback(
    (cy: cytoscape.Core) => {
      partyGraph.getParties().forEach((party) => {
        const node = cy.getElementById(party.id);
        if (node) {
          const newSize =
            party.status === PartyStatus.Major
              ? 80
              : party.status === PartyStatus.Minor
                ? 40
                : 20;
          node.data("size", newSize);
          const newFontSize =
            party.status === PartyStatus.Major
              ? 20
              : party.status === PartyStatus.Minor
                ? 10
                : 5;
          node.data("fontSize", newFontSize);
        }
      });

      cy.style().update();
    },
    [partyGraph]
  );

  useEffect(() => {
    if (cyRef.current) {
      addElementsToCytoscape(cyRef.current);
    }
  }, [partyGraph, addElementsToCytoscape]);

  useEffect(() => {
    if (cyRef.current && nodesToRemove.length > 0) {
      const cy = cyRef.current;

      nodesToRemove.forEach((nodeId) => {
        const connectedEdges = cy.getElementById(nodeId).connectedEdges();
        cy.remove(connectedEdges);
        cy.getElementById(nodeId).remove();
        onNodeDeleted(nodeId);
      });

      // Only run layout if nodes were removed
      if (nodesToRemove.length > 0) {
        cy.layout(layoutOptions()).run();
      }
    }
  }, [nodesToRemove, onNodeDeleted, layoutOptions]);

  useEffect(() => {
    if (cyRef.current) {
      updateNodeSize(cyRef.current);
    }
  }, [updateTrigger, updateNodeSize]); // Add updateNodeSize as dependency to update node sizes

  const handleAddEdge = () => {
    if (cyRef.current) {
      const cy = cyRef.current;

      cy.add({
        group: "edges" as cytoscape.ElementGroup,
        data: {
          source: sourceNode,
          target: targetNode,
          weight: weight * 16,
          opposition: isOpposition ? "true" : "false",
          label: weight.toString(),
        },
      });

      partyGraph.addInteraction(sourceNode, targetNode, weight, isOpposition);
      cy.layout(layoutOptions()).run();
      setOpenDialog(false);
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setWeight(newValue as number);
  };

  const availableTargets = partyGraph
    .getParties()
    .filter(
      (party) => sourceNode && !partyGraph.hasInteraction(sourceNode, party.id)
    )
    .map((party) => (
      <MenuItem key={party.id} value={party.id}>
        {party.name}
      </MenuItem>
    ));

  return (
    <Box>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "600px",
        }}
      >
        <CytoscapeComponent
          elements={[]} // Provide an empty array as the initial value
          style={{ width: "100%", height: "100%", position: "absolute" }}
          layout={{ name: LAYOUT }}
          cy={(cy: cytoscape.Core) => {
            cyRef.current = cy;
            (cy as any).gridGuide({
              snapToGridOnRelease: true,
              snapToAlignmentLocationOnRelease: true,
              gridColor: "#ADD8e6",
            });
            addElementsToCytoscape(cy);
          }}
          stylesheet={cytoscapeStylesheet}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ mt: 2 }}
      >
        Add Edge
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Edge</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Source Node</InputLabel>
            <Select
              value={sourceNode}
              onChange={(e) => setSourceNode(e.target.value as string)}
            >
              {partyGraph.getParties().map((party) => (
                <MenuItem key={party.id} value={party.id}>
                  {party.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Target Node</InputLabel>
            <Select
              value={targetNode}
              onChange={(e) => setTargetNode(e.target.value as string)}
              disabled={!sourceNode}
            >
              {availableTargets}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOpposition}
                onChange={(e) => setIsOpposition(e.target.checked)}
              />
            }
            label="Opposition"
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>Weight</Typography>
          <Slider
            value={weight}
            min={0}
            max={1}
            step={0.1}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEdge} color="primary">
            Add Edge
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InteractivePartyGraph;
