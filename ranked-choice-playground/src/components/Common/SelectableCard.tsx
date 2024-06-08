import React, { ReactNode } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
    <Card
      variant="outlined"
      sx={{
        width: 200,
        padding: 2,
        cursor: "pointer",
        borderColor: selected ? "purple" : "grey.300",
        backgroundColor: selected ? "purple.50" : "white",
        position: "relative",
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {icon}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {title}
        </Typography>
        {children}
        {selected && (
          <CheckCircleIcon
            sx={{
              color: "purple",
              position: "absolute",
              top: 8,
              right: 8,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SelectableCard;
