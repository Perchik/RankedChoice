import { PartyState, PartyStatus, PartyInteraction } from "../models/Party";

// Get non-empty lines from the text data.
export function getNonEmptyLines(textData: string): string[] {
  return textData
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
}

// Parse parties from a line and add them to the graph
export function parseParties(line: string, status: PartyStatus): PartyState[] {
  const parts = line.split(":");
  if (parts.length !== 2) return [];

  const partyIds = parts[1].split(",").map((id) => id.trim());
  return partyIds.map((id) => ({
    id,
    name: id, // Or replace with a lookup if names are available
    color: "#000000", // Replace with actual color if available
    fontColor: "#FFFFFF", // Replace with actual font color if available
    status,
    interactions: {},
  }));
}

// Parse an interaction from a line and add it to the graph
export function parseInteraction(line: string, parties: PartyState[]): void {
  const parts = line.split("->");
  if (parts.length !== 2) return;

  const from = parts[0].trim();
  const [to, weight] = parts[1].trim().split(" ");
  const fromParty = parties.find((p) => p.id === from);
  if (fromParty) {
    fromParty.interactions[to] = {
      toPartyId: to,
      weight: parseFloat(weight),
      opposition: line.includes("opposition"),
    };
  }
}

// Parse the entire configuration
export function parseConfig(textData: string): PartyState[] {
  const lines = getNonEmptyLines(textData);
  let parties: PartyState[] = [];

  lines.forEach((line) => {
    if (line.startsWith("major:")) {
      parties = parties.concat(parseParties(line, PartyStatus.Major));
    } else if (line.startsWith("minor:")) {
      parties = parties.concat(parseParties(line, PartyStatus.Minor));
    } else if (line.startsWith("fringe:")) {
      parties = parties.concat(parseParties(line, PartyStatus.Fringe));
    } else if (line.includes("->")) {
      parseInteraction(line, parties);
    }
  });

  return parties;
}
