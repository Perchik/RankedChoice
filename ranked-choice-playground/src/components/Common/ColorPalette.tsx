import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface ColorPaletteProps {
  colors: string[];
  onClick: (color: string) => void;
  size?: number;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  onClick,
  size = 20,
}) => {
  return (
    <Grid container spacing={1} wrap="wrap">
      {colors.map((color) => (
        <Grid item key={color}>
          <Box
            sx={{
              width: size,
              height: size,
              backgroundColor: color,
              cursor: "pointer",
              border: "1px solid #000",
            }}
            onClick={() => onClick(color)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorPalette;
