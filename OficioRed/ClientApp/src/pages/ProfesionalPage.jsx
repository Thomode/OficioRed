import React from "react";
import { Container, Grid, Box } from "@mui/material";
import CardProfesional from "../components/ProfesionalesBusqueda/Card";
import { FiltroRubros } from "../components/FiltroRubros";
import Buscador from "../components/buscador";
export function ProfesionalPage() {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        p={2}
        mt={0}
        mb={4}
        style={{ border: "5px solid #1b325f" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Buscador />
          </Grid>
          <Grid item xs={12}>
            <FiltroRubros />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid>
          <CardProfesional />
        </Grid>
      </Grid>
    </Container>
  );
}
