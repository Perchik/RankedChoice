import React, { ReactNode } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled, keyframes } from "@mui/system";
import palette from "../../styles/palette";

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ theme, selected }) => ({
  border: selected
    ? `2px solid ${theme.palette.primary.main}`
    : "1px solid grey",
  backgroundColor: selected
    ? palette.primary[50]
    : theme.palette.background.paper,
  boxShadow: selected
    ? "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px"
    : "none",
  transition: "background-color 0.3s, border 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: selected
      ? theme.palette.action.hover
      : palette.primary[200],
  },
  padding: theme.spacing(2),
  width: 200,
  cursor: "pointer",
  position: "relative",
  animation: selected ? `${scaleUp} 0.3s ease-in-out forwards` : "none",
  transformOrigin: "center",
}));

interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  children?: ReactNode;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  selected,
  onClick,
  icon,
  title,
  children,
}) => {
  return (
    <StyledCard selected={selected} variant="outlined" onClick={onClick}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {title}
        </Typography>
        {children}
        {selected && (
          <CheckCircleIcon
            color="primary"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          />
        )}
      </CardContent>
    </StyledCard>
  );
};

export default SelectableCard;
