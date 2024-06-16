import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import theme from "../../styles/theme";
import PartyPresetSelector from "../Parties/PartyPresetSelector";

const SetupPoliticalParties: React.FC = () => {
  return (
    <>
      <PartyPresetSelector
        onPresetSelect={() => {}}
        onCreateCustomScenario={() => {}}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>More Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Typography variant="h6" gutterBottom>
              Detailed Information
            </Typography>
            <Typography variant="h5" gutterBottom>
              Understanding Coalitions and Relationships
            </Typography>
            <Typography variant="body1" paragraph>
              In ranked choice voting (RCV), voters rank candidates in order of
              preference. Since RCV requires multiple choices, party coalitions
              and relationships play a critical role in guiding how a voter
              might make their choices. These relationships help simulate
              realistic voting behavior by influencing the order in which voters
              rank candidates, especially in scenarios where their preferred
              candidate is eliminated.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Coalitions</strong>: Represent alliances where parties
              support each other, influencing voters to rank candidates from
              allied parties higher.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Oppositions</strong>: Represent adversarial relationships
              where parties oppose each other, leading voters to rank candidates
              from opposing parties lower or not at all.
            </Typography>
          </Container>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SetupPoliticalParties;
