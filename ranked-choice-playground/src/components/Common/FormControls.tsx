import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  SelectChangeEvent,
} from "@mui/material";

interface PartySelectProps {
  label: string;
  value: string | undefined;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: string[];
}

export const PartySelect: React.FC<PartySelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select value={value || ""} onChange={onChange}>
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
  <div className="popularity-section">
    <p>Popularity: {value}</p>
    <Slider
      value={value}
      onChange={onChange}
      aria-labelledby="popularity-slider"
      valueLabelDisplay="auto"
      step={1}
      min={0}
      max={100}
    />
  </div>
);
