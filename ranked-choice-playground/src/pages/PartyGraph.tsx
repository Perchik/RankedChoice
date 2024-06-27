import React from "react";
import { Box, Typography } from "@mui/material";
import OldPartySetup from "../components/Parties/OldPartySetup";

const PartyGraphPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h2">Old Party Setup </Typography>
      <Typography variant="body1">
        This is the old party setup page. In the future we'll revive this to let
        you edit parties. Adding here so we can see it.
      </Typography>

      <OldPartySetup />
    </Box>
  );
};

export default PartyGraphPage;
