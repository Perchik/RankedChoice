import React from "react";
import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

interface PartySelectProps {
  label: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export const PartySelect: React.FC<PartySelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <FormGroup>
    <FormLabel>{label}</FormLabel>
    <FormControl
      as="select"
      value={value || ""}
      onChange={(event) =>
        onChange(event as unknown as React.ChangeEvent<HTMLSelectElement>)
      }
    >
      <option value="">
        <em>None</em>
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </FormControl>
  </FormGroup>
);

interface PopularitySliderProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PopularitySlider: React.FC<PopularitySliderProps> = ({
  value,
  onChange,
}) => (
  <FormGroup>
    <FormLabel>Popularity: {value}</FormLabel>
    <FormControl
      type="range"
      value={value}
      onChange={(event) =>
        onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
      }
      min="0"
      max="100"
      step="1"
    />
  </FormGroup>
);
