import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Box,
  Typography,
} from "@mui/material";

interface PartySelectProps {
  label: string;
  value: string | undefined;
  onChange: (event: SelectChangeEvent) => void;
  options: string[];
}

export const PartySelect: React.FC<PartySelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select value={value || ""} onChange={onChange} label={label}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

interface PopularitySliderProps {
  value: number;
  onChange: (event: Event, newValue: number | number[]) => void;
}

export const PopularitySlider: React.FC<PopularitySliderProps> = ({
  value,
  onChange,
}) => (
  <Box my={2}>
    <Typography gutterBottom>Popularity: {value}</Typography>
    <Slider
      value={value}
      onChange={onChange}
      min={0}
      max={100}
      step={1}
      valueLabelDisplay="auto"
    />
  </Box>
);
