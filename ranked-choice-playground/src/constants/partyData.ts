interface PartyData {
  name: string;
  color: string;
  ordinal: number;
  fontColor: string;
}
const parties: { [key: string]: PartyData } = {
  red: {
    name: "Red",
    color: "#C31600",
    ordinal: 1,
    fontColor: "#FFFFFF",
  },
  scarlet: {
    name: "Scarlet",
    color: "#FF2400",
    ordinal: 3,
    fontColor: "#FFFFFF",
  },
  orange: {
    name: "Orange",
    color: "#FF7100",
    ordinal: 2,
    fontColor: "#000",
  },
  amber: {
    name: "Amber",
    color: "#FFae42",
    ordinal: 3,
    fontColor: "#000000",
  },
  yellow: {
    name: "Yellow",
    color: "#FFDD55",
    ordinal: 1,
    fontColor: "#000000",
  },
  chartreuse: {
    name: "Chartreuse",
    color: "#9fff39",
    ordinal: 3,
    fontColor: "#000000",
  },
  green: {
    name: "Green",
    color: "#30a030",
    ordinal: 2,
    fontColor: "#FFFFFF",
  },
  teal: {
    name: "Teal",
    color: "#008080",
    ordinal: 3,
    fontColor: "#FFFFFF",
  },
  blue: {
    name: "Blue",
    color: "#094067",
    ordinal: 1,
    fontColor: "#FFFFFF",
  },
  violet: {
    name: "Violet",
    color: "#862cff",
    ordinal: 3,
    fontColor: "#000",
  },
  purple: {
    name: "Purple",
    color: "#652265",
    ordinal: 2,
    fontColor: "#FFFFFF",
  },
  fuchsia: {
    name: "Fuchsia",
    color: "#d60a72",
    ordinal: 3,
    fontColor: "#000",
  },
};

export const partyOrder: string[] = [
  "red",
  "scarlet",
  "orange",
  "amber",
  "yellow",
  "chartreuse",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "fuchsia",
];

export const partyIds = Object.keys(parties);
export const partyNames = Object.values(parties).map((style) => style.name);
export const partyColors = Object.fromEntries(
  Object.entries(parties).map(([id, party]) => [id, party.color])
);

export { parties };
