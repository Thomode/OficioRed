import React from "react";
import { Container, Grid, Box } from "@mui/material";
import CardProfesional from "../components/ProfesionalesBusqueda/Card";
import { FiltroRubros } from "../components/FiltroRubros";
import Buscador from "../components/buscador";
import { profesionalService } from "../services/profesional.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export function ProfesionalPage() {
    const handleSearch = async () => {
        const data = await profesionalService.getAll(); // Obtén todos los usuarios
        console.log(data);
        const filteredProfesionales = data.filter((profesional) => {
            const nombreEnMinusculas = profesional.nombre.toLowerCase();
            const apellidoEnMinusculas = profesional.apellido.toLowerCase();
            const searchValueEnMinusculas = searchValue.toLowerCase();

            return (
                nombreEnMinusculas.includes(searchValueEnMinusculas) ||
                apellidoEnMinusculas.includes(searchValueEnMinusculas) ||
                (nombreEnMinusculas + " " + apellidoEnMinusculas).includes(searchValueEnMinusculas)
            );
        }); // Filtra los usuarios basados en el texto de búsqueda

        setProfesionales(filteredProfesionales); // Actualiza la lista de usuarios con el resultado de la búsqueda
    };
    const [profesionales, setProfesionales] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    async function loadProfesionales() {
        const data = await profesionalService.getAll();
        console.log(data);

        setProfesionales(data);
    }

    useEffect(() => {
        loadProfesionales();
    }, []);
    return (
        <Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="white"
                p={2}
                mt={0}
            >
                <Grid>
                    <Grid item xs={12}>
                        <Buscador
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            handleSearch={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FiltroRubros />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item container spacing={2}>
                    {profesionales.length > 0 ? (
                        <CardProfesional profesionales={profesionales} />
                    ) : (
                        <p>No hay profesionales disponibles</p>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}
