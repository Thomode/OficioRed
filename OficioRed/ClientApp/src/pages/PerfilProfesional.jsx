import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Typography,
    Button,
    Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import imagendefault from "../assets/fotodefault.webp";

const buttonStyle = {
    margin: "0 8px",
};

const infoStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "20px",
};

const imageStyle = {
    width: "300px",
    height: "auto",
};

export function PerfilProfesional() {
    const [profesional, setProfesional] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/Profesional/${id}`)
            .then((response) => {
                setProfesional(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
    }, [id]);

    return (
        <Grid container spacing={2}>
            <Grid item container xs={12} direction="row" justifyContent="flex-start">
                <img
                    src={profesional.fotoPerfil ? profesional.fotoPerfil : imagendefault}
                    alt="profesional"
                    style={imageStyle}
                />
                <div style={infoStyle}>
                    <Typography variant="h4">
                        {`${profesional.nombre} ${profesional.apellido}`}
                    </Typography>
                    <Typography variant="body1">
                        Nombre: {profesional.nombre}
                    </Typography>
                    <Typography variant="body1">
                        Apellido: {profesional.apellido}
                    </Typography>
                    <Typography variant="body1">
                        Descripcion: {profesional.descripcion}
                    </Typography>
                    <Typography variant="body1">
                        Email: {profesional.email}
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        style={{ backgroundColor: "#1b325f", color: "white", marginTop: "20px" }}
                        sx={buttonStyle}
                    >
                        CONTACTAR
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        style={{ backgroundColor: "#f26c4f", color: "white", marginTop: "20px" }}
                        sx={buttonStyle}
                    >
                        AGREGAR A FAVORITOS
                        <FavoriteIcon />
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
}
