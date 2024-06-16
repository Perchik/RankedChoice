import React from "react";
import { Slider, Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import styles from "./PopularitySlider.module.css";

interface PopularitySliderProps {
  value: number;
  onChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => void;
}

const marks = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

const PopularitySlider: React.FC<PopularitySliderProps> = ({
  value,
  onChange,
}) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(new Event("input"), value - 1, 0);
    }
  };

  const handleIncrease = () => {
    if (value < 5) {
      onChange(new Event("input"), value + 1, 0);
    }
  };

  return (
    <Box className={styles.popularitySlider}>
      <IconButton size="small" onClick={handleDecrease}>
        <PersonIcon fontSize="small" />
      </IconButton>
      <Box className={styles.sliderContainer}>
        <Slider
          value={value}
          onChange={onChange}
          step={1}
          marks={marks}
          min={1}
          max={5}
          sx={{
            width: "100%",
            "& .MuiSlider-thumb": {
              display: "none",
            },
            "& .MuiSlider-track": {
              display: "none",
            },
            "& .MuiSlider-rail": {
              display: "none",
            },
            "& .MuiSlider-mark": {
              display: "none",
            },
            "& .MuiSlider-markLabel": {
              display: "none",
            },
          }}
        />
        <Box className={styles.maskLayer}>
          {marks.map((mark) => (
            <span
              key={mark.value}
              className={
                value >= mark.value
                  ? styles.filledCircle
                  : styles.outlinedCircle
              }
            ></span>
          ))}
        </Box>
      </Box>
      <IconButton size="small" onClick={handleIncrease}>
        <GroupIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default PopularitySlider;
