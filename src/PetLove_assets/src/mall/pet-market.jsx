import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LeftMenu from "./left-menu";
import ResponsiveAppBar from "../components/app-bar";


const PetMarketRight = () => {
  return (
    <div>
      <p>Pet Market Placeholder</p>
    </div>
  );
}

const PetMarket = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item md={4}>
          <LeftMenu />
        </Grid>
        <Grid item md={8}>
          <PetMarketRight />
        </Grid>
      </Grid>
    </div>
  );
}

export default PetMarket;