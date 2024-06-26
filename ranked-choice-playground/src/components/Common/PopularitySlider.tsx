import React from "react";
import { Box, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import palette from "../../styles/palette";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: palette.primary[500],
  },
  "& .MuiRating-iconHover": {
    color: palette.primary[600],
  },
  "& .MuiRating-icon": {
    padding: "0 1px",
  },
});

interface PopularitySliderProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number | null) => void;
}

const PopularitySlider: React.FC<PopularitySliderProps> = ({
  value,
  onChange,
}) => {
  const handleDecrease = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (value > 0) {
      onChange(event as any, value - 1);
    }
  };

  const handleIncrease = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (value < 3) {
      onChange(event as any, value + 1);
    }
  };

  return (
    <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
      <Tooltip title="Unpopular">
        <PersonIcon
          fontSize="small"
          sx={{ color: "#898989", cursor: "pointer" }}
          onClick={handleDecrease}
        />
      </Tooltip>
      <StyledRating
        size="small"
        value={value}
        onChange={(event, newValue) => {
          event.stopPropagation();
          onChange(event, newValue);
        }}
        max={3}
        icon={<AccountCircleIcon fontSize="inherit" />}
        emptyIcon={<AccountCircleOutlinedIcon fontSize="inherit" />}
      />
      <Tooltip title="Popular">
        <GroupIcon
          fontSize="small"
          sx={{ color: "#898989", ml: 0.5, cursor: "pointer" }}
          onClick={handleIncrease}
        />
      </Tooltip>
    </Box>
  );
};

export default PopularitySlider;
