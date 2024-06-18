import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Headshot from "./Headshot";
import bodyVariants from "../../config/body-variants.json";
import skinHairColors from "../../config/skin-hair-colors.json";
import { partyColors, partyIds } from "../../constants/PartyData";

interface BodyVariant {
  id: string;
  suitColor: string;
  shirtColor: string;
  lapelColor: string;
  collarColor?: string;
  tieType: string;
  pocketSquareType: string;
}

interface SkinHairColor {
  skinColor: string;
  hairColor: string;
  description: string;
}

const getRandomElement = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const HeadshotList: React.FC = () => {
  const variants: BodyVariant[] = bodyVariants as BodyVariant[];
  const skinHairOptions: SkinHairColor[] = skinHairColors.map(
    ([skinColor, hairColor, description]) => ({
      skinColor,
      hairColor,
      description,
    })
  );

  return (
    <Box padding="20px">
      <Typography variant="h4" mb={3} align="center">
        Headshot List
      </Typography>
      <Grid container spacing={1}>
        {variants.map((variant) => {
          const { skinColor, hairColor } = getRandomElement(skinHairOptions);
          const accessoryColor = partyColors[getRandomElement(partyIds)];

          return (
            <Grid item xs={1} spacing={1} key={variant.id}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Headshot
                  variantId={variant.id}
                  suitColor={variant.suitColor}
                  shirtColor={variant.shirtColor}
                  lapelColor={variant.lapelColor}
                  collarColor={variant.collarColor || "#ffffff"}
                  tieType={variant.tieType}
                  pocketSquareType={variant.pocketSquareType}
                  accessoryColor={accessoryColor}
                  skinColor={skinColor}
                  width="100px"
                  height="160px"
                />
                <Typography variant="caption">{variant.id}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HeadshotList;
