import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bodySvgs, hairSvgs } from "../../utils/loadSvgs";
import skinHairCombinations from "../../../public/SkinHairCombinations.json";

const HEX_CODES = [
  "#f94144",
  "#f3722c",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#277da1",
  "#5d4f92",
  "#ff91af",
  "#c0c0c0",
  "#111111",
];

const generateRandomHeadshot = (accessoryColor: string) => {
  const skinHairCombo =
    skinHairCombinations[
      Math.floor(Math.random() * skinHairCombinations.length)
    ];
  const [skinColor, hairColor, description] = skinHairCombo;
  const BodySVG = bodySvgs[Math.floor(Math.random() * bodySvgs.length)];
  const HairSVG = hairSvgs[Math.floor(Math.random() * hairSvgs.length)];
  return {
    BodySVG,
    HairSVG,
    colors: { skinColor, hairColor, accessoryColor },
    description,
  };
};

const HeadshotContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const HeadshotGenerator: React.FC = () => {
  const [headshot, setHeadshot] = useState(() =>
    generateRandomHeadshot(
      HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)]
    )
  );

  const handleGenerate = () => {
    setHeadshot(
      generateRandomHeadshot(
        HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)]
      )
    );
  };

  return (
    <div>
      <HeadshotContainer>
        <headshot.BodySVG
          css={css`
            #Head {
              fill: ${headshot.colors.skinColor};
            }
            #Tie,
            #TieKnot,
            #Bowtie {
              fill: ${headshot.colors.accessoryColor};
            }
          `}
        />
        <headshot.HairSVG
          css={css`
            #hair {
              fill: ${headshot.colors.hairColor};
            }
            #accessory {
              fill: ${headshot.colors.accessoryColor};
            }
          `}
        />
      </HeadshotContainer>
      <button onClick={handleGenerate}>Generate New Headshot</button>
    </div>
  );
};

export default HeadshotGenerator;
