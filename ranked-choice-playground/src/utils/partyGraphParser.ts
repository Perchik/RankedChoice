import { PartyStatus } from "../models/Party";
import { PartyGraph } from "../models/PartyGraph";

// Get non-empty lines from the text data.
export function getNonEmptyLines(textData: string): string[] {
  return textData
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
}

// Parse parties from a line and add them to the graph
export function parseParties(
  line: string,
  status: PartyStatus,
  partyGraph: PartyGraph
) {
  const parts = line.split(":");
  if (parts.length !== 2) return;

  const partyIds = parts[1].split(",").map((id) => id.trim());
  partyIds.forEach((id) => partyGraph.addParty(id, status));
}

// Parse an interaction from a line and add it to the graph
export function parseInteraction(line: string, partyGraph: PartyGraph) {
  const parts = line.split("->");
  if (parts.length !== 2) return;

  const from = parts[0].trim();
  const [to, weight] = parts[1].trim().split(" ");
  partyGraph.addInteraction(
    from,
    to.trim(),
    parseFloat(weight),
    line.includes("opposition")
  );
}

// Parse the entire configuration
export function parseConfig(textData: string, partyGraph: PartyGraph) {
  const lines = getNonEmptyLines(textData);

  lines.forEach((line) => {
    if (line.startsWith("major:")) {
      parseParties(line, PartyStatus.Major, partyGraph);
    } else if (line.startsWith("minor:")) {
      parseParties(line, PartyStatus.Minor, partyGraph);
    } else if (line.startsWith("fringe:")) {
      parseParties(line, PartyStatus.Fringe, partyGraph);
    } else if (line.includes("->")) {
      parseInteraction(line, partyGraph);
    }
  });
}
