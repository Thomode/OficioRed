import React from 'react';
import { Container, Grid } from '@mui/material';
import CardProfesional from '../components/Card';

export function ProfesionalPage() {
    return (
        <Container>

            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardProfesional />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardProfesional />
                </Grid>
            </Grid>
        </Container>
    );
}