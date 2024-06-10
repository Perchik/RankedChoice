// src/icons/MyCustomIcon.tsx

import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
// import { ReactComponent as podiumIcon } from "./icon_podium.svg";
import { ReactComponent as SinglePersonSVG } from "./icon_person.svg";

export const PodiumIcon = createSvgIcon(
  <svg
    width="8.4666653mm"
    height="8.4666672mm"
    viewBox="0 0 8.4666653 8.4666672"
    version="1.1"
    id="svg5"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs id="defs2" />
    <g id="layer1" transform="translate(-99.908213,-87.08176)">
      <path
        id="path4150"
        d="m 104.14181,88.140094 a 0.68898242,0.68898242 0 0 0 -0.68936,0.689363 0.68898242,0.68898242 0 0 0 0.68936,0.688847 0.68898242,0.68898242 0 0 0 0.68833,-0.688847 0.68898242,0.68898242 0 0 0 -0.68833,-0.689363 z m -0.66921,1.648478 c -0.31894,0 -0.57516,0.256739 -0.57516,0.575675 v 0.956531 h 2.48822 v -0.956531 c 0,-0.318936 -0.25674,-0.575675 -0.57567,-0.575675 h -0.10181 l -0.56689,0.56689 -0.56689,-0.56689 z m -1.53789,1.793172 c -0.0764,0 -0.13798,0.06156 -0.13798,0.137976 0,0.07641 0.0616,0.137976 0.13798,0.137976 h 0.27233 v 2.465483 c 0,0.09269 0.0753,0.166915 0.16795,0.166915 h 3.53312 c 0.0927,0 0.16743,-0.07422 0.16743,-0.166915 v -2.465483 h 0.27285 c 0.0764,0 0.13798,-0.06157 0.13798,-0.137976 0,-0.07641 -0.0616,-0.137976 -0.13798,-0.137976 z"
      />
    </g>
  </svg>,
  "PodiumIcon"
);

export const SinglePersonIcon = createSvgIcon(
  <SinglePersonSVG />,
  "Single Person"
);
// export const PodiumIcon = createSvgIcon(podiumIcon, "Podium Icon");