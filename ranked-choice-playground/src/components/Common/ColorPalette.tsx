import React from "react";
import { Row, Col } from "react-bootstrap";

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
    <Row className="d-flex flex-wrap g-1">
      {colors.map((color) => (
        <Col
          key={color}
          xs="auto"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            cursor: "pointer",
            border: "1px solid #000",
          }}
          onClick={() => onClick(color)}
        />
      ))}
    </Row>
  );
};

export default ColorPalette;
