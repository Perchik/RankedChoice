import React from "react";
import { Box, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import palette from "../../styles/palette";

const StyledRating = styled(Rating)<{ disabled?: boolean }>(({ disabled }) => ({
  "& .MuiRating-iconFilled": {
    color: disabled ? "#c0c0c0" : palette.primary[500],
  },
  "& .MuiRating-iconHover": {
    color: disabled ? "#c0c0c0" : palette.primary[600],
  },
  "& .MuiRating-icon": {
    padding: "0 1px",
  },
}));

interface PopularitySliderProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number | null) => void;
  disabled?: boolean;
}

const PopularitySlider: React.FC<PopularitySliderProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const handleDecrease = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (!disabled && value > 0) {
      onChange(event as any, value - 1);
    }
  };

  const handleIncrease = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (!disabled && value < 3) {
      onChange(event as any, value + 1);
    }
  };

  return (
    <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
      <Tooltip title="Unpopular" disableHoverListener={disabled}>
        <PersonIcon
          fontSize="small"
          sx={{
            color: disabled ? "#c0c0c0" : "#898989",
            cursor: disabled ? "default" : "pointer",
          }}
          onClick={handleDecrease}
        />
      </Tooltip>
      <StyledRating
        size="small"
        value={value}
        onChange={(event, newValue) => {
          if (!disabled) {
            event.stopPropagation();
            onChange(event, newValue);
          }
        }}
        max={5}
        icon={<AccountCircleIcon fontSize="inherit" />}
        emptyIcon={<AccountCircleOutlinedIcon fontSize="inherit" />}
        readOnly={disabled}
        disabled={disabled}
      />
      <Tooltip title="Popular" disableHoverListener={disabled}>
        <GroupIcon
          fontSize="small"
          sx={{
            color: disabled ? "#c0c0c0" : "#898989",
            ml: 0.5,
            cursor: disabled ? "default" : "pointer",
          }}
          onClick={handleIncrease}
        />
      </Tooltip>
    </Box>
  );
};

export default PopularitySlider;
