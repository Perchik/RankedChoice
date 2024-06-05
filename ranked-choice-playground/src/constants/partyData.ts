interface PartyData {
  name: string;
  color: string;
  ordinal: number;
}

const parties: { [key: string]: PartyData } = {
  red: { name: "Red Party", color: "#C31600", ordinal: 1 },
  scarlet: { name: "Scarlet Party", color: "#FF2400", ordinal: 3 },
  orange: { name: "Orange Party", color: "#FF7100", ordinal: 2 },
  amber: { name: "Amber Party", color: "#FFae42", ordinal: 3 },
  yellow: { name: "Yellow Party", color: "#FFDD55", ordinal: 1 },
  chartreuse: { name: "Chartreuse Party", color: "#9fff39", ordinal: 3 },
  green: { name: "Green Party", color: "#30a030", ordinal: 2 },
  teal: { name: "Teal Party", color: "#008080", ordinal: 3 },
  blue: { name: "Blue Party", color: "#094067", ordinal: 1 },
  violet: { name: "Violet Party", color: "#862cff", ordinal: 3 },
  purple: { name: "Purple Party", color: "#652265", ordinal: 2 },
  fuchsia: { name: "Fuchsia Party", color: "#d60a72", ordinal: 3 },
};

export const partyIds = Object.keys(parties);
export const partyNames = Object.values(parties).map((style) => style.name);
export const partyColors = Object.fromEntries(
  Object.entries(parties).map(([id, party]) => [id, party.color])
);

export { parties };
