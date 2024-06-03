declare module "graphlib-dot" {
  import { Graph } from "graphlib";

  export function parse(dot: string): Graph;
  export function write(graph: Graph): string;
}
