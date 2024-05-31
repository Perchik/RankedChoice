// src/components/PartyDiagram.tsx
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PartyDiagram: React.FC<{ numberOfParties: number }> = ({
  numberOfParties,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous elements

      const width = 600;
      const height = 600;
      const radius = 100;

      // Define colors for parties
      const colors = ["red", "yellow", "blue", "cyan", "magenta", "lime"];

      // Define positions for the circles based on the number of parties
      const positions = [
        { x: width / 2, y: height / 2 },
        { x: width / 2 - radius, y: height / 2 },
        { x: width / 2 + radius, y: height / 2 },
        { x: width / 2, y: height / 2 - radius },
        { x: width / 2 - radius / 2, y: height / 2 + radius / 2 },
        { x: width / 2 + radius / 2, y: height / 2 + radius / 2 },
      ];

      // Add circles for each party
      positions.slice(0, numberOfParties).forEach((position, i) => {
        svg
          .append("circle")
          .attr("cx", position.x)
          .attr("cy", position.y)
          .attr("r", radius)
          .attr("fill", colors[i])
          .attr("fill-opacity", 0.5)
          .attr("stroke", "black")
          .attr("stroke-width", 2);
      });
    }
  }, [numberOfParties]);

  return <svg ref={svgRef} width={600} height={600}></svg>;
};

export default PartyDiagram;
