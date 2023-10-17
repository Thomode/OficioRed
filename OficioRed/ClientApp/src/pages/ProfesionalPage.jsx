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
                p={2}
                mt={0}
                mb={4}
                style={{ border: '5px solid #1b325f' }}
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={item}>
                        <CardProfesional />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
