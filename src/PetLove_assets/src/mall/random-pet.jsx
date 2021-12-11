import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ResponsiveAppBar from "../components/app-bar";
import ReplayIcon from '@mui/icons-material/Replay';
import GreenButton from "../components/green-button";

const RandomPetContent = () => {
  return (
    <Grid container mt={10}>
      <Grid item xs={12} md={6}>
        <div>
          <img src="http://placekitten.com/500/600"/>
          &nbsp;
          <Stack spacing={2} direction="row" justifyContent="center">
            <GreenButton>
                <ReplayIcon /> &nbsp;See Other Pets
            </GreenButton>
          </Stack>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2} direction="row" justifyContent="center">
          <GreenButton>Adopt</GreenButton>
        </Stack>
      </Grid>
    </Grid>
    
  );
}

const RandomPet = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <RandomPetContent />
    </div>
  );
}

export default RandomPet;