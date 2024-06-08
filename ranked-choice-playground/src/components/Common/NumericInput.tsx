import React from "react";
import { TextField, IconButton, InputAdornment, SxProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Theme } from "@mui/system";

interface NumericInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  increment?: number;
  sx?: SxProps<Theme>;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  increment = 1,
  sx,
}) => {
  const handleIncrement = () => {
    if (value + increment <= max) {
      onChange(value + increment);
    }
  };

  const handleDecrement = () => {
    if (value - increment >= min) {
      onChange(value - increment);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              onClick={handleDecrement}
              size="small"
              disabled={value - increment < min}
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleIncrement}
              size="small"
              disabled={value + increment > max}
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: {
          style: { textAlign: "center" },
          min,
          max,
        },
      }}
      sx={{ width: 120, ...sx }}
    />
  );
};

export default NumericInput;
