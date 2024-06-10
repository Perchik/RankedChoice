import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import { ReactComponent as PodiumIconSVG } from "./icon_podium.svg";
import { ReactComponent as SinglePersonSVG } from "./icon_person.svg";
import { ReactComponent as MultiplePeopleSVG } from "./icon_group.svg";

export const PodiumIcon = createSvgIcon(<PodiumIconSVG />, "Podium Icon");

export const SinglePersonIcon = createSvgIcon(
  <SinglePersonSVG />,
  "Single Person"
);

export const MultiplePeopleIcon = createSvgIcon(
  <MultiplePeopleSVG />,
  "Group of People"
);
