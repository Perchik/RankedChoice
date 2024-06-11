import React, { useEffect, useRef, useState } from "react";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import gridGuide from "cytoscape-grid-guide";
import { PartyGraph } from "../../models/PartyGraph";
import { PartyStatus } from "../../models/Party";
import {
  Button,
  Checkbox,
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

// Register the fcose layout and grid-guide extension
Cytoscape.use(fcose);
Cytoscape.use(gridGuide as any);

interface InteractivePartyGraphProps {
  partyGraph: PartyGraph;
  onNodeAdded: (party: any) => void;
  onNodeDeleted: (partyId: string) => void;
  nodesToRemove: string[]; // List of nodes to be removed
}

const InteractivePartyGraph: React.FC<InteractivePartyGraphProps> = ({
  partyGraph,
  onNodeAdded,
  onNodeDeleted,
  nodesToRemove,
}) => {
  const cyRef = useRef<HTMLDivElement>(null);
  const cyInstance = useRef<Cytoscape.Core | null>(null);

  const [sourceNode, setSourceNode] = useState<string>("");
  const [targetNode, setTargetNode] = useState<string>("");
  const [isOpposition, setIsOpposition] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(0.5);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (cyRef.current) {
      const cy = Cytoscape({
        container: cyRef.current,
        style: [
          {
            selector: "node",
            style: {
              "background-color": "data(color)",
              label: "data(label)",
              width: "data(size)",
              height: "data(size)",
              "text-valign": "center",
              color: "data(fontColor)",
              "font-size": "data(fontSize)",
            },
          },
          {
            selector: "edge",
            style: {
              width: "data(weight)",
              "line-color": "#000",
              "target-arrow-color": "#000",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
              label: "data(label)",
              "font-size": 10,
              color: "#000",
              "text-margin-x": 10,
              "text-margin-y": 10,
              "text-background-opacity": 1,
              "text-background-color": "#ffffff",
              "text-background-shape": "roundrectangle",
            },
          },
          {
            selector: "edge[opposition = 'true']",
            style: {
              "line-color": "#F00",
              "target-arrow-color": "#F00",
              "text-background-color": "#ffffff",
              color: "#F00",
              label: "X",
              "text-margin-y": 0,
              "text-margin-x": 0,
              "text-background-padding": "5",
              "line-style": "dashed",
              "line-dash-pattern": [6, 3],
            },
          },
        ],
        layout: {
          name: "fcose",
        },
      });

      // Initialize and configure the grid-guide plugin
      (cy as any).gridGuide({
        snapToGridOnRelease: true,
        snapToAlignmentLocationOnRelease: true,
        guidelines: true,
        guidelinesTolerance: 2.0,
        guidelinesStyle: {
          strokeStyle: "#8b7d6b",
          horizontalDistColor: "#ff0000",
          verticalDistColor: "#00ff00",
          initPosAlignmentColor: "#0000ff",
          lineDash: [0, 0],
        },
      });

      // Store the Cytoscape instance
      cyInstance.current = cy;

      // Enable dragging nodes around
      cy.userPanningEnabled(true);
      cy.nodes().grabify();
    }

    return () => {
      if (cyInstance.current) {
        cyInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (cyInstance.current) {
      const cy = cyInstance.current;

      // Add new nodes
      const existingNodes = new Set(cy.nodes().map((node) => node.id()));

      const newNodes = partyGraph
        .getParties()
        .filter((party) => !existingNodes.has(party.id));

      newNodes.forEach((party) => {
        cy.add({
          group: "nodes",
          data: {
            id: party.id,
            label: party.name,
            color: party.color,
            size:
              party.status === PartyStatus.Major
                ? 100
                : party.status === PartyStatus.Minor
                  ? 50
                  : 20,
            fontColor: party.fontColor,
            fontSize:
              party.status === PartyStatus.Major
                ? 20
                : party.status === PartyStatus.Minor
                  ? 10
                  : 5,
          },
        });
        onNodeAdded(party);
      });

      // Add new edges
      const newEdges = partyGraph.interactions.filter(
        (interaction) =>
          cy.getElementById(interaction.from).length > 0 &&
          cy.getElementById(interaction.to).length > 0 &&
          !cy
            .edges()
            .some(
              (edge) =>
                edge.data("source") === interaction.from &&
                edge.data("target") === interaction.to
            )
      );

      newEdges.forEach((interaction) => {
        cy.add({
          group: "edges",
          data: {
            source: interaction.from,
            target: interaction.to,
            weight: interaction.weight * 16,
            opposition: interaction.opposition ? "true" : "false",
            label: interaction.weight.toString(),
          },
        });
      });

      cy.layout({ name: "fcose" }).run();
    }
  }, [partyGraph, onNodeAdded]);

  useEffect(() => {
    if (cyInstance.current && nodesToRemove.length > 0) {
      const cy = cyInstance.current;

      nodesToRemove.forEach((nodeId) => {
        // Remove all edges connected to the node
        const connectedEdges = cy.getElementById(nodeId).connectedEdges();
        cy.remove(connectedEdges);

        // Remove the node itself
        cy.getElementById(nodeId).remove();
        onNodeDeleted(nodeId);
      });

      // Run layout after nodes and edges have been removed
      cy.layout({ name: "fcose" }).run();
    }
  }, [nodesToRemove, onNodeDeleted]);

  const handleAddEdge = () => {
    if (cyInstance.current) {
      const cy = cyInstance.current;

      cy.add({
        group: "edges",
        data: {
          source: sourceNode,
          target: targetNode,
          weight: weight * 16,
          opposition: isOpposition ? "true" : "false",
          label: weight.toString(),
        },
      });

      cy.layout({ name: "fcose" }).run();
      setOpenDialog(false);
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setWeight(newValue as number);
  };

  return (
    <div style={{ backgroundColor: "pink" }}>
      <div style={{ position: "relative", width: "100%", height: "600px" }}>
        <div
          ref={cyRef}
          style={{ width: "100%", height: "100%", position: "absolute" }}
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
            >
              {partyGraph.getParties().map((party) => (
                <MenuItem key={party.id} value={party.id}>
                  {party.name}
                </MenuItem>
              ))}
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
    </div>
  );
};

export default InteractivePartyGraph;
