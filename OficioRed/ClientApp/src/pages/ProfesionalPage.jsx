import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import CardProfesional from '../components/ProfesionalesBusqueda/Card';
import MultipleSelectCheckmarks from "../components/FiltroRubros";
import Buscador from "../components/buscador";

export function ProfesionalPage() {
    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="white"
                borderRadius={10}
                p={2}
                mt={2}
                mb={4}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Buscador />
                    </Grid>
                    <Grid item xs={12}>
                        <MultipleSelectCheckmarks />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CardProfesional />
                </Grid>
            </Grid>
        </Container>
    );
}
