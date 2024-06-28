interface PartyData {
  name: string;
  color: string;
  ordinal: number;
  fontColor: string;
  alternateColors: string[];
}
const parties: { [key: string]: PartyData } = {
  red: {
    name: "Red",
    color: "#7c0000",
    ordinal: 1,
    fontColor: "#FFFFFF",
    alternateColors: [
      "#b06666",
      "#9d4040",
      "#902626",
      "#7c0000",
      "#760000",
      "#630000",
      "#510000",
      "#d40303",
    ],
  },
  scarlet: {
    name: "Scarlet",
    color: "#FF2400",
    ordinal: 3,
    fontColor: "#FFFFFF",
    alternateColors: [
      "#ff8773",
      "#ff664d",
      "#ff5033",
      "#ff3a19",
      "#ff2f0d",
      "#ff2400",
    ],
  },
  orange: {
    name: "Orange",
    color: "#FF7100",
    ordinal: 2,
    fontColor: "#000000",
    alternateColors: [
      "#ffb173",
      "#ff9540",
      "#ff8626",
      "#ff7f19",
      "#ff780d",
      "#ff7100",
      "#e66600",
      "#d96000",
    ],
  },
  amber: {
    name: "Amber",
    color: "#FFae42",
    ordinal: 3,
    fontColor: "#000000",
    alternateColors: [
      "#ffd297",
      "#ffca84",
      "#ffc271",
      "#ffbe68",
      "#ffb655",
      "#ffb24b",
      "#f2a53f",
      "#e69d3b",
      "#cc8b35",
      "#bf8332",
    ],
  },
  yellow: {
    name: "Yellow",
    color: "#FFDD55",
    ordinal: 1,
    fontColor: "#000000",
    alternateColors: [
      "#ffe991",
      "#ffe680",
      "#ffe26f",
      "#ffe066",
      "#ffdd55",
      "#f2d251",
      "#e6c74d",
    ],
  },
  chartreuse: {
    name: "Chartreuse",
    color: "#9fff39",
    ordinal: 3,
    fontColor: "#000000",
    alternateColors: [
      "#c1ff7e",
      "#b7ff6b",
      "#b2ff61",
      "#a9ff4d",
      "#a4ff43",
      "#8fe633",
      "#87d930",
    ],
  },
  green: {
    name: "Green",
    color: "#30a030",
    ordinal: 2,
    fontColor: "#FFFFFF",
    alternateColors: [
      "#83c683",
      "#6ebd6e",
      "#64b864",
      "#59b359",
      "#4fae4f",
      "#45aa45",
      "#3aa53a",
      "#30a030",
      "#2e982e",
      "#2b902b",
      "#268026",
      "#227022",
      
      "#1d601d",
      "#1a581a",
    ],
  },
  teal: {
    name: "Teal",
    color: "#008080",
    ordinal: 3,
    fontColor: "#FFFFFF",
    alternateColors: [
      "#66b3b3",
      "#4da6a6",
      "#40a0a0",
      "#269393",
      "#198d8d",
      "#0d8686",
      "#007a7a",
      "#006d6d",
      "#006060",
    ],
  },
  blue: {
    name: "Blue",
    color: "#094067",
    ordinal: 1,
    fontColor: "#FFFFFF",
    alternateColors: [
      "#6b8ca4",
      "#5f839c",
      "#537995",
      "#47708d",
      "#3a6685",
      "#2e5d7e",
      "#225376",
      "#154a6f",
      "#094067",
      "#093d62",
      "#083a5d",
      "#083658",
      "#073352",
      "#07304d",
      "#062d48",
      "#062a43",
      "#05263e",
      "#052339",
      "#052034",
    ],
  },
  violet: {
    name: "Violet",
    color: "#862cff",
    ordinal: 3,
    fontColor: "#000000",
    alternateColors: [
      "#bc8bff",
      "#b076ff",
      "#aa6bff",
      "#9e56ff",
      "#984cff",
      "#8c37ff",
      "#862cff",
      "#7f2af2",
    ],
  },
  purple: {
    name: "Purple",
    color: "#652265",
    ordinal: 2,
    fontColor: "#FFFFFF",
    alternateColors: [
      "#8c598c",
      "#844e84",
      "#7c437c",
      "#743874",
      "#6d2d6d",
      "#652265",
      "#602060",
      "#5b1f5b",
      "#561d56",
      "#511b51",
      "#4c1a4c",
      "#471847",
      "#421642",
      "#3d143d",
      "#381338",
      "#331133",
    ],
  },
  fuchsia: {
    name: "Fuchsia",
    color: "#d60a72",
    ordinal: 3,
    fontColor: "#000000",
    alternateColors: [
      "#e66caa",
      "#e460a3",
      "#e2549c",
      "#e04795",
      "#de3b8e",
      "#dc2f87",
      "#da2280",
      "#d81679",
      "#d60a72",
      "#cb0a6c",
      "#c10967",
      "#b60961",
      "#ab085b",
      "#a10856",
      "#960750",
      "#8b074a",
      "#800644",
      "#76063f",
    ],
  },
};
export function getPartyName(partyId?: string): string {
  if (!partyId) {
    return "Independent";
  }
  return parties[partyId]?.name + " Party" || "Independent";
}

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
export const partyNames = Object.values(parties).map((party) => party.name);
export const partyColors = Object.fromEntries(
  Object.entries(parties).map(([id, party]) => [id, party.color])
);
export const partyColorsList = Object.values(parties).map(
  (party) => party.color
);

export const partyAlternateColors = Object.fromEntries(
  Object.entries(parties).map(([id, party]) => [id, party.alternateColors])
);
export { parties };
