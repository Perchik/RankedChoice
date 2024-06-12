import React from "react";
import { Box, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { Party, PartyStatus } from "../../models/Party";

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

interface PartyBinsProps {
  majorParties: Party[];
  minorParties: Party[];
  fringeParties: Party[];
  handleDrop: (party: any, status: PartyStatus) => void;
  handleTrashDrop: (party: any) => void;
}

const PartyBins: React.FC<PartyBinsProps> = ({
  majorParties,
  minorParties,
  fringeParties,
  handleDrop,
  handleTrashDrop,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 2,
      }}
    >
      <Bin label="Major Parties" onDrop={(item) => handleDrop(item, PartyStatus.Major)}>
        {majorParties.map((party) => (
          <Circle key={party.id} color={party.color} id={party.id} />
        ))}
      </Bin>
      <Bin label="Minor Parties" onDrop={(item) => handleDrop(item, PartyStatus.Minor)}>
        {minorParties.map((party) => (
          <Circle key={party.id} color={party.color} id={party.id} />
        ))}
      </Bin>
      <Bin label="Fringe Parties" onDrop={(item) => handleDrop(item, PartyStatus.Fringe)}>
        {fringeParties.map((party) => (
          <Circle key={party.id} color={party.color} id={party.id} />
        ))}
      </Bin>
      <Bin label="Trash" onDrop={handleTrashDrop}>
        <Typography variant="body1">Drag a party here to remove it from the scenario.</Typography>
      </Bin>
    </Box>
  );
};

export default PartyBins;
