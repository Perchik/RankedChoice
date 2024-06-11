import React, { useState } from "react";
import { Tabs, Tab, Paper, Box } from "@mui/material";
import { SetupWizardStepProps } from "../../interfaces/SetupWizardStep";
import TabPanel from "../Common/TabPanel";
import PartySetupOverview from "./PartySetupOverview";
import PartySetup from "../Parties/PartySetup";
import theme from "../../styles/theme";
interface SetupPartiesProps extends SetupWizardStepProps {}

const SetupPoliticalParties: React.FC<SetupPartiesProps> = ({
  setFormComplete,
}) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box borderBottom="solid thin grey">
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          indicatorColor="secondary"
        >
          <Tab label="Overview" />
          <Tab label="Simple Mode" />
          <Tab label="Advanced Mode" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PartySetupOverview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Setup parties in simple mode
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PartySetup />
      </TabPanel>
    </>
  );
};

export default SetupPoliticalParties;
