import React from "react";
import HeadshotConfigurator from "../components/Headshot/HeadshotConfigurator";
import HeadshotList from "../components/Headshot/HeadshotList";
import { Divider } from "@mui/material";

const Headshots: React.FC = () => {
  return (
    <>
      <HeadshotConfigurator />
      <Divider />
      <HeadshotList />
    </>
  );
};

export default Headshots;
