import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Headshot from "./Headshot";
import outfitConfigurations from "./config/outfit-configurations.json";

import { partyColorsList } from "../../constants/PartyData";

const HeadshotList: React.FC = () => {
  return (
    <Box padding="20px">
      <Typography variant="h4" mb={3} align="center">
        Headshot List
      </Typography>
      <Grid container spacing={1}>
        {outfitConfigurations.map((_, index) => (
          <Grid item xs={1} spacing={1} key={index}>
            <Typography>
              {partyColorsList[index % partyColorsList.length]}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Headshot
                accessoryColor={partyColorsList[index % partyColorsList.length]}
                forceSequential={true}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeadshotList;
