interface PartyData {
  name: string;
  color: string;
  ordinal: number;
}

const parties: { [key: string]: PartyData } = {
  red: { name: "Red Party", color: "#D00000", ordinal: 1 },
  scarlet: { name: "Scarlet Party", color: "#E34234", ordinal: 3 },
  orange: { name: "Orange Party", color: "#ff8800", ordinal: 2 },
  amber: { name: "Amber Party", color: "#FFBF00", ordinal: 3 },
  yellow: { name: "Yellow Party", color: "#ffff6b", ordinal: 1 },
  chartreuse: { name: "Chartreuse Party", color: "#9fff39", ordinal: 3 },
  green: { name: "Green Party", color: "#30a030", ordinal: 2 },
  teal: { name: "Teal Party", color: "#008080", ordinal: 3 },
  blue: { name: "Blue Party", color: "#0000FF", ordinal: 1 },
  violet: { name: "Violet Party", color: "#862cff", ordinal: 3 },
  purple: { name: "Purple Party", color: "#650065", ordinal: 2 },
  fuchsia: { name: "Fuchsia Party", color: "#d60a72", ordinal: 3 },
};

export const partyIds = Object.keys(parties);
export const partyNames = Object.values(parties).map((style) => style.name);
export const partyColors = Object.fromEntries(
  Object.entries(parties).map(([id, party]) => [id, party.color])
);

export { parties };
