import React from "react";
import { PartyStatus } from "../../models/Party";

interface PartyDisplayProps {
  id: string;
  name: string;
  color: string;
  status: PartyStatus;
  onStatusChange: (id: string, newStatus: PartyStatus) => void;
}

const PartyDisplay: React.FC<PartyDisplayProps> = ({
  id,
  name,
  color,
  status,
  onStatusChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(id, event.target.value as unknown as PartyStatus);
  };

  const getSizeFromStatus = (status: PartyStatus): number => {
    switch (status) {
      case PartyStatus.Major:
        return 100;
      case PartyStatus.Minor:
        return 70;
      case PartyStatus.Fringe:
        return 50;
      case PartyStatus.Independent:
        return 60;
      default:
        return 50;
    }
  };

  const size = getSizeFromStatus(status);

  return (
    <div
      style={{
        backgroundColor: color,
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        textAlign: "center",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <h3 style={{ color }}>{name}</h3>
      <select value={status} onChange={handleStatusChange}>
        <option value={PartyStatus.Major}>Major</option>
        <option value={PartyStatus.Minor}>Minor</option>
        <option value={PartyStatus.Fringe}>Fringe</option>
        <option value={PartyStatus.Independent}>Independent</option>
      </select>
    </div>
  );
};

export default PartyDisplay;
