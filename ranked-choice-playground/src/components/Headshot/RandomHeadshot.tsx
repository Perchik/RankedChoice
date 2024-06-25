import React, { useState, useRef, useEffect, useCallback } from "react";
import { ComplexionConfiguration, OutfitConfiguration } from "./types";
import Headshot, { HeadshotHandle } from "./Headshot";
import ComplexionConfigurations from "./config/complexion-colors.json";
import outfitConfigurations from "./config/outfit-configurations.json";
import { getRandomElement, getRandomInt } from "../../utils/randomHelpers";

const complexionOptions: ComplexionConfiguration[] =
  ComplexionConfigurations.map(([skinColor, hairColor, description]) => ({
    skinColor,
    hairColor,
    description,
  }));

const outfits: OutfitConfiguration[] =
  outfitConfigurations as OutfitConfiguration[];

interface RandomHeadshotProps {
  accessoryColor?: string;
  outfitId?: string;
  forceSequential?: boolean; // Whether to sequentially go through the arrays of outfits.
}

// If forceSequential is enabled, we incrementally go through the arrays for Hair and Outfit, instead of randomly.
let lastUsedHair = 0;
let lastUsedOutfit = 0;

const getNextHairId = (hairCount: number, forceSequential: boolean): number => {
  if (hairCount === 0) return 0;
  if (forceSequential) {
    lastUsedHair = ++lastUsedHair % hairCount;
    return lastUsedHair;
  } else {
    return getRandomInt(0, hairCount);
  }
};

const getNextOutfit = (
  outfitId: string | undefined,
  forceSequential: boolean
): OutfitConfiguration => {
  if (outfitId) {
    return outfits.find((v) => v.id === outfitId) || getRandomElement(outfits);
  } else if (forceSequential) {
    lastUsedOutfit = (lastUsedOutfit + 1) % outfits.length;
    return outfits[lastUsedOutfit];
  } else {
    return getRandomElement(outfits);
  }
};

const RandomHeadshot: React.FC<RandomHeadshotProps> = ({
  outfitId,
  accessoryColor,
  forceSequential = false,
  ...svgProps
}) => {
  const headshotRef = useRef<HeadshotHandle>(null);
  const [hairCount, setHairCount] = useState<number>(0);
  const [hairId, setHairId] = useState<number>(
    getNextHairId(hairCount, forceSequential)
  );
  const [complexion, setComplexion] = useState<ComplexionConfiguration>(() =>
    getRandomElement(complexionOptions)
  );

  const [outfit, setOutfit] = useState<OutfitConfiguration>(() => {
    const initialOutfit = getNextOutfit(outfitId, forceSequential);
    return {
      ...initialOutfit,
      accessoryColor: accessoryColor || "#FFF",
    } as OutfitConfiguration;
  });

  useEffect(() => {
    if (headshotRef.current) {
      const count = headshotRef.current.getNumberOfHairElements();
      setHairCount(count);
    }
  }, []);

  useEffect(() => {
    setHairId(getNextHairId(hairCount, forceSequential));
  }, [hairCount, forceSequential]);

  const regenerateHeadshot = useCallback(
    (reloadHead: boolean = true, reloadBody: boolean = true) => {
      if (reloadHead) {
        setComplexion(getRandomElement(complexionOptions));
        if (hairCount > 0) {
          setHairId(getNextHairId(hairCount, forceSequential));
        }
      }
      if (reloadBody) {
        const newOutfit = getNextOutfit(outfitId, forceSequential);
        setOutfit({
          ...newOutfit,
          accessoryColor: accessoryColor || "#FFF",
        });
      }
    },
    [hairCount, outfitId, forceSequential, accessoryColor]
  );

  return (
    <Headshot
      ref={headshotRef}
      complexion={complexion}
      outfit={outfit}
      accessoryColor={accessoryColor || "#FFF"}
      hairId={hairId}
      {...svgProps}
    />
  );
};

export default RandomHeadshot;
