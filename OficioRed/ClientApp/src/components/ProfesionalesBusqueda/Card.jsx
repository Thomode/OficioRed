import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    IconButton,
    Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import imagendefault from "../../assets/fotodefault.webp";

const cardStyle = {
    maxWidth: 345,
    borderRadius: 10,
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    marginBottom: "20px",
    marginLeft: "100px",
    marginRight: "50px",
    "&:hover": {
        transform: "scale(1.05)",
    },
};

const buttonStyle = {
    margin: "0 8px",
};

const CardProfesional = () => {
    const navigate = useNavigate(); // Use useNavigate to access the navigation function
    const [profesionales, setProfesionales] = useState([]);

    useEffect(() => {
        axios
            .get("/api/Profesional")
            .then((response) => {
                setProfesionales(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
    }, []);

    const handleLeerMasClick = (id) => {
        navigate(`/${id}/PerfilProfesional`); // Use navigate to redirect to the route
    };

    return (
        <Grid container spacing={2}>
            {profesionales.map((profesional, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                    <Card sx={cardStyle}>
                        <CardMedia
                            component="img"
                            alt="profesional"
                            height="240"
                            src={profesional.fotoPerfil ? profesional.fotoPerfil : imagendefault}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {`${profesional.nombre} ${profesional.apellido}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {profesional.email}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        style={{ backgroundColor: "#1b325f", color: "white" }}
                                        sx={buttonStyle}
                                    >
                                        CONTACTAR
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        style={{ backgroundColor: "#f26c4f", color: "white" }}
                                        sx={buttonStyle}
                                        onClick={() => handleLeerMasClick(profesional.idProfesional)}
                                    >
                                        Leer más
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <IconButton aria-label="Agregar a favoritos">
                                        <FavoriteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton aria-label="Compartir">
                                        <ShareIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardProfesional;
