import React from "react";
import { Container, Typography, Box } from "@mui/material";

const CoalitionPotentialExplanation: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Coalition Potential
        </Typography>
        <Typography variant="body1" paragraph>
          Coalition potential refers to the likelihood or ability of different
          political parties to form alliances or coalitions. In multi-party
          systems, where no single party has an outright majority, parties often
          need to collaborate to form a stable government. Coalition potential
          is influenced by ideological proximity, strategic interests, and
          historical relationships. In our simulation, coalition potential is
          used to describe different political landscapes and control voter
          behavior to allow dynamic simulation of multi-party electoral systems.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Implementation in the Ranked Choice Voting Simulator
        </Typography>
        <Typography variant="body1" paragraph>
          In our ranked choice voting simulator, coalition potential plays a
          critical role in shaping voter behavior and election outcomes. Here's
          how it is implemented:
        </Typography>
        <Typography variant="h6" gutterBottom>
          Party Relationships
        </Typography>
        <Typography variant="body1" paragraph>
          Each party in the simulation can form coalitions or be in opposition
          to other parties. These relationships are defined based on ideological
          similarities and historical alliances. Major parties often have higher
          coalition potential with minor parties that share similar values. For
          instance, in the United States, the Green Party and the Democratic
          Party might form a coalition on environmental issues.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Cascade Logic
        </Typography>
        <Typography variant="body1" paragraph>
          Votes can cascade from one party to another based on coalition
          potential. If a voter's preferred candidate is eliminated, their vote
          may transfer to a candidate from an allied party. For example, if a
          voter's first choice is a Green Party candidate and the candidate is
          eliminated, their vote might transfer to a Democratic Party candidate
          if there is a strong coalition potential between the two parties.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Weighting
        </Typography>
        <Typography variant="body1" paragraph>
          Coalition potential is quantified using weights that represent the
          strength of the alliance. Higher weights indicate stronger alliances
          and a higher likelihood of vote transfer. These weights are used to
          adjust the probability of votes cascading between parties. A strong
          coalition (high weight) means votes are more likely to transfer to
          allied parties.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Oppositions
        </Typography>
        <Typography variant="body1" paragraph>
          Parties can also be in opposition, which negatively affects coalition
          potential. Votes are less likely to transfer between parties that are
          in opposition. For example, the Republican Party and the Democratic
          Party in the U.S. are often in opposition on many policy issues,
          resulting in a low coalition potential between them.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Example Scenario
        </Typography>
        <Typography variant="body1" paragraph>
          Imagine a simulation with the following parties: Red (Major), Blue
          (Major), Green (Minor), and Orange (Minor). Red and Blue are in
          opposition, while Green has a coalition with Red, and Orange has a
          coalition with Blue. Voter preferences are influenced by these
          relationships. A voter preferring Green may rank Red candidates higher
          due to the coalition, while avoiding Blue candidates due to the
          opposition.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1" paragraph>
          Coalition potential is a vital aspect of our ranked choice voting
          simulator. By defining and adjusting the relationships between
          parties, users can explore how different political landscapes and
          alliances impact voter behavior and election results. This feature
          allows for a realistic and dynamic simulation of multi-party electoral
          systems.
        </Typography>
      </Box>
    </Container>
  );
};

export default CoalitionPotentialExplanation;
