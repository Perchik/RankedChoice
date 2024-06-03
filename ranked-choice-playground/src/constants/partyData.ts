interface PartyData {
  name: string;
  color: string;
  ordinal: number;
}

const parties: { [key: string]: PartyData } = {
  red: { name: "Red Party", color: "#FF0000", ordinal: 1 },
  scarlet: { name: "Scarlet Party", color: "#E34234", ordinal: 3 },
  orange: { name: "Orange Party", color: "#ff8800", ordinal: 2 },
  amber: { name: "Amber Party", color: "#FFBF00", ordinal: 3 },
  yellow: { name: "Yellow Party", color: "#ffff6b", ordinal: 1 },
  chartreuse: { name: "Chartreuse Party", color: "#bbff00", ordinal: 3 },
  green: { name: "Green Party", color: "#0a770a", ordinal: 2 },
  teal: { name: "Teal Party", color: "#008080", ordinal: 3 },
  blue: { name: "Blue Party", color: "#0000FF", ordinal: 1 },
  violet: { name: "Violet Party", color: "#8B00FF", ordinal: 3 },
  purple: { name: "Purple Party", color: "#800080", ordinal: 2 },
  magenta: { name: "Magenta Party", color: "#FF00FF", ordinal: 3 },
};

export const partyIds = Object.keys(parties);
export const partyNames = Object.values(parties).map((style) => style.name);
export const partyColors = Object.values(parties).map((style) => style.color);
export { parties };
