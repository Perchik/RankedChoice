import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";
import { RootState } from "../../store";
import { PartyStatus } from "../../models/Party";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SetupSummary: React.FC = () => {
  const electionDetails = useSelector((state: RootState) => state.election);
  const parties = useSelector((state: RootState) => state.parties.parties);

  const sortedParties = [...parties].sort((a, b) => a.status - b.status);

  return (
    <Card
      sx={{
        p: 2,
        textAlign: "left",
      }}
    >
      <Typography variant="h6">Election Summary</Typography>
      <hr />
      <Typography variant="body1">
        {electionDetails.title}
        {electionDetails.numberOfSeats > 1 && electionDetails.title !== ""
          ? "(" + electionDetails.numberOfSeats + " seats)"
          : ""}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Political Parties:
      </Typography>
      {sortedParties.map((party, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{
            fontWeight: party.status === PartyStatus.Major ? "bold" : "normal",
            fontStyle: party.status === PartyStatus.Minor ? "italic" : "normal",
          }}
        >
          {capitalizeFirstLetter(party.name)}
        </Typography>
      ))}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Candidates:
      </Typography>
    </Card>
  );
};

export default SetupSummary;
