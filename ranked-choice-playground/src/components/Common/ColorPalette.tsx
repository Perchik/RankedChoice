import React from "react";
import { Box } from "@mui/material";

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
    <Box display="flex" flexWrap="wrap" gap={1}>
      {colors.map((color) => (
        <Box
          key={color}
          width={size}
          height={size}
          bgcolor={color}
          onClick={() => onClick(color)}
          sx={{ cursor: "pointer", border: "1px solid #000" }}
        />
      ))}
    </Box>
  );
};

export default ColorPalette;
