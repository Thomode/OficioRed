import React, { Component } from 'react';
import { Container, Grid } from '@mui/material';
import CardProfesional from '../Card';
import { Buscador } from '../Buscador';

class Inicio extends Component {
    render() {
        return (
            <Container>

                <Buscador datosBusqueda={this.datosBusqueda} />

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
}

export { Inicio };