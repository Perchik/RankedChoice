interface PartyData {
  name: string;
  color: string;
  ordinal: number;
  fontColor: string;
}
const parties: { [key: string]: PartyData } = {
  red: {
    name: "Red Party",
    color: "#C31600",
    ordinal: 1,
    fontColor: "#FFFFFF",
  },
  scarlet: {
    name: "Scarlet Party",
    color: "#FF2400",
    ordinal: 3,
    fontColor: "#FFFFFF",
  },
  orange: {
    name: "Orange Party",
    color: "#FF7100",
    ordinal: 2,
    fontColor: "#FFFFFF",
  },
  amber: {
    name: "Amber Party",
    color: "#FFae42",
    ordinal: 3,
    fontColor: "#000000",
  },
  yellow: {
    name: "Yellow Party",
    color: "#FFDD55",
    ordinal: 1,
    fontColor: "#000000",
  },
  chartreuse: {
    name: "Chartreuse Party",
    color: "#9fff39",
    ordinal: 3,
    fontColor: "#000000",
  },
  green: {
    name: "Green Party",
    color: "#30a030",
    ordinal: 2,
    fontColor: "#FFFFFF",
  },
  teal: {
    name: "Teal Party",
    color: "#008080",
    ordinal: 3,
    fontColor: "#FFFFFF",
  },
  blue: {
    name: "Blue Party",
    color: "#094067",
    ordinal: 1,
    fontColor: "#FFFFFF",
  },
  violet: {
    name: "Violet Party",
    color: "#862cff",
    ordinal: 3,
    fontColor: "#FFFFFF",
  },
  purple: {
    name: "Purple Party",
    color: "#652265",
    ordinal: 2,
    fontColor: "#FFFFFF",
  },
  fuchsia: {
    name: "Fuchsia Party",
    color: "#d60a72",
    ordinal: 3,
    fontColor: "#FFFFFF",
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
