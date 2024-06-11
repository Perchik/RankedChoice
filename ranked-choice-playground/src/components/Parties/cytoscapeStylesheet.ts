import { Stylesheet } from "cytoscape";

const cytoscapeStylesheet: Stylesheet[] = [
  {
    selector: "node",
    style: {
      "background-color": "data(color)",
      label: "data(label)",
      width: "data(size)",
      height: "data(size)",
      "text-valign": "center",
      color: "data(fontColor)",
      "font-size": "data(fontSize)",
    },
  },
  {
    selector: "edge",
    style: {
      width: "data(weight)",
      "line-color": "#000",
      "target-arrow-color": "#000",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      label: "data(label)",
      "font-size": 10,
      color: "#000",
      "text-margin-x": 10,
      "text-margin-y": 10,
      "text-background-opacity": 1,
      "text-background-color": "#ffffff",
      "text-background-shape": "roundrectangle",
    },
  },
  {
    selector: "edge[opposition = 'true']",
    style: {
      "line-color": "#F00",
      "target-arrow-color": "#F00",
      "text-background-color": "#ffffff",
      color: "#F00",
      label: "X",
      "text-margin-y": 0,
      "text-margin-x": 0,
      "text-background-padding": "5",
      "line-style": "dashed",
      "line-dash-pattern": [6, 3],
    },
  },
];

export default cytoscapeStylesheet;
