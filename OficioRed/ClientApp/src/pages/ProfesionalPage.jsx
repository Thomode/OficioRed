import React from "react";
import { Container, Grid, Box } from "@mui/material";
import CardProfesional from "../components/ProfesionalesBusqueda/Card";
import { FiltroRubros } from "../components/FiltroRubros";
import Buscador from "../components/buscador";
import { profesionalService } from "../services/profesional.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import imagenFondo from "../assets/armarios-formas-geometricas.jpg"

export function ProfesionalPage() {
    const [rubros, setRubros] = useState([]);
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
        <Container style={{ backgroundImage: `url(${imagenFondo})`, backgroundSize: "cover", minHeight: "100vh" }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor='rgba(255, 255, 255, 0.3)'
                p={2}
                mt={0}
                borderBottom="2px solid #1b325f"
                borderRadius="50px"

            >
                <Grid>
                    <Grid item xs={12} mt={2}>
                        <Buscador
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            handleSearch={handleSearch}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FiltroRubros
                            rubros={rubros}
                            setRubros={setRubros} />
                    </Grid>
                </Grid>
            </Box>
            <Grid container justifyContent="center" alignItems="center" spacing={2} mt={2}>
                {profesionales.length > 0 ? (
                    <CardProfesional profesionales={profesionales} />
                ) : (
                    <Alert severity="error">
                        <AlertTitle>Ups!</AlertTitle>
                        No hay profesionales disponibles.
                    </Alert>
                )}
            </Grid>
        </Container>
    );
}
