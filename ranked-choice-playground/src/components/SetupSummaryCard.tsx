import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material";
import { RootState } from "../app/store";

const SetupSummary: React.FC = () => {
  const electionDetails = useSelector((state: RootState) => state.election);

  return (
    <Card
      sx={{
        width: "250px",
        p: 2,
        ml: 2,
        textAlign: "left",
      }}
    >
      <Typography variant="h6">Election Summary</Typography>
      <hr />
      <Typography variant="body1">
        {" "}
        {electionDetails.title}
        {electionDetails.numberOfSeats > 1 && electionDetails.title !== ""
          ? "(" + electionDetails.numberOfSeats + " seats)"
          : ""}
      </Typography>
      <Typography variant="body2"></Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Political Parties:
      </Typography>
      {/* {setupDetails.parties.map((party, index) => (
        <Typography variant="body2" key={index}>{party.name}</Typography>
      ))} */}
      <Typography variant="body2"> Candidates: </Typography>
    </Card>
  );
};

export default SetupSummary;
