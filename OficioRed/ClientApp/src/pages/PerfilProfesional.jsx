import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Box,
    IconButton,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import axios from "axios";
import imagendefault from "../assets/fotodefault.webp";
import { contactoService } from "../services/contacto.service";
import imagenFondo from "../assets/fondo.jpg";
import fotofb from "../assets/facebook.png";
import fotoig from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from '@mui/material/Rating';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import clipboardCopy from 'clipboard-copy'; 

const buttonStyle = {
    margin: "0 8px",
    position: "bottom",
};

const titleStyle2 = {
    fontSize: '45px',
    fontWeight: 'bold',
    color: '#1b325f',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    WebkitTextStroke: '2px white',
    MozTextStroke: '2px white',
    margin: '0px',
    padding: '0px',
};


const PerfilProfesional = () => {
    const [favoritos, setFavoritos] = useState(() => {
        const storedFavoritos = localStorage.getItem("favoritos");
        return storedFavoritos ? JSON.parse(storedFavoritos) : [];
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [profesional, setProfesional] = useState({});
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [telefono, setTelefono] = useState("");
    const { id } = useParams();
    const idActual = location.pathname.split('/')[1];
    const [value, setValue] = React.useState(2);

    useEffect(() => {
        axios
            .get(`/api/Profesional/${id}`)
            .then((response) => {
                setProfesional(response.data);

                const idContacto = response.data.idContacto;
                if (idContacto) {
                    contactoService
                        .getById(idContacto)
                        .then((contactoResponse) => {
                            setFacebook(contactoResponse.data.facebook || "");
                            setInstagram(contactoResponse.data.instagram || "");
                            setTelefono(contactoResponse.data.telefono || "");
                        })
                        .catch((error) => {
                            console.error("Error fetching contacto data", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
    }, [id]);

    const handleClick = () => {
        const nuevaUrl = `/profesionales`;
        navigate(nuevaUrl);
    };

    const handleClickAntes = () => {
        const nuevoId = Math.max(idActual - 1, 1);
        const nuevaUrl = `/${nuevoId}/PerfilProfesional`;
        navigate(nuevaUrl);
    };

    const handleClickSiguiente = () => {
        const nuevoId = parseInt(idActual, 10) + 1;
        const nuevaUrl = `/${nuevoId}/PerfilProfesional`;
        navigate(nuevaUrl);
    };

    const handleClickFb = async (idContacto) => {
        try {
            const res = await contactoService.getById(idContacto);
            console.log(res.data);

            if (res.data.facebook) {
                const url = `https://www.facebook.com/${res.data.facebook}`;
                window.open(url, "_blank");
            } else {
                console.error("Facebook no esta definido en el objeto de contacto.");
            }
        } catch (error) {
            console.error("Error al obtener el contacto:", error);
        }
    };

    const handleClickIg = async (idContacto) => {
        try {
            const res = await contactoService.getById(idContacto);
            console.log(res.data);

            if (res.data.instagram) {
                const url = `https://www.instagram.com/${res.data.instagram}`;
                window.open(url, "_blank");
            } else {
                console.error("Instagram no esta definido en el objeto de contacto.");
            }
        } catch (error) {
            console.error("Error al obtener el contacto:", error);
        }
    };

    const handleClickWpp = async (idContacto) => {
        try {
            const res = await contactoService.getById(idContacto);
            console.log(res.data);

            if (res.data.telefono) {
                const url = `https://wa.me/+549${res.data.telefono}`;
                window.open(url, "_blank");
            } else {
                console.error("Telefono no esta definido en el objeto de contacto.");
            }
        } catch (error) {
            console.error("Error al obtener el contacto:", error);
        }
    };

    const handleAgregarFavorito = (profesional) => {
        const isInFavoritos = favoritos.some(
            (fav) => fav.idProfesional === profesional.idProfesional
        );

        const nuevosFavoritos = isInFavoritos
            ? favoritos.filter(
                (fav) => fav.idProfesional !== profesional.idProfesional
            )
            : [...favoritos, profesional];

        setFavoritos(nuevosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    };

    const handleClickComments = (id) => {
        navigate(`/${id}/PerfilProfesional/Comentarios`);
    };

    const handleClickCopy = () => {
        const url = `${window.location.origin}/${id}/PerfilProfesional`; 
        clipboardCopy(url); 
    };

    return (
        <Box
            minHeight="100vh"
            p={5}
            style={{
                backgroundImage: `url(${imagenFondo})`,
                backgroundSize: "cover",
                position: "relative"
            }}>
            <Grid xs={12} sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "20px 20px 0px 0px", padding: "5px" }}>
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Button
                        variant="text"
                        style={{
                            color: "#1b325f",
                            margin: "20px",
                            fontWeight: "bold",
                        }}
                        fontSize="large"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => handleClickAntes()}
                    >
                    Anterior
                    </Button>
                    <Typography variant="h2" sx={titleStyle2}>
                        Detalle de Perfil
                    </Typography>
                    <Button
                        variant="text"
                        style={{
                            color: "#1b325f",
                            margin: "20px",
                            fontWeight: "bold",
                        }}
                        fontSize="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => handleClickSiguiente()}
                    >
                    Siguiente
                     
                    </Button>
                </Box>
            </Grid>
            <Grid container justifyContent="center" spacing={0} sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "0px 0px 0px 0px" }}>
                <Grid item xs={12} md={4} style={{ padding: 10 }}>
                    <CardMedia
                        component="img"
                        alt="profesional"
                        height="560"
                        image={profesional.fotoPerfil || imagendefault}
                        style={{
                            border: "2px solid #1b325f",
                            borderRadius: "20px 20px 0 0"
                        }}
                    />
                    <Box
                        color="white"
                        bgcolor="#1b325f"
                        p={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius= "0px 0px 20px 20px"
                    >
                        <Typography variant="h4" style={{ textAlign: "center", fontSize: "2.5rem" }}>
                            {`${profesional.nombre} ${profesional.apellido}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} style={{ padding: 0 }}>
                    <CardContent>
                        <Box color="#1b325f" p={2}>
                            <Typography variant="subtitle1" style={{fontSize: "1.2rem" }}>
                                <strong>Nombre: </strong> {profesional.nombre}
                            </Typography>
                        </Box>
                        <Box color="#1b325f" p={2}>
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem" }}>
                                <strong>Apellido: </strong> {profesional.apellido}
                            </Typography>
                        </Box>
                        <Box color="#1b325f" p={2} borderRadius="0px 0px 20px 20px">
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem" }}>
                                <strong>Descripcion: </strong> {profesional.descripcion}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={4} style={{ padding: 0 }}>
                    <CardContent>
                        <Box
                            color="#1b325f"
                            p={2}
                            borderRadius="20px 20px 0 0"
                        >
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem" }}>
                                <strong>Rubros: </strong>
                                {profesional.rubros &&
                                    profesional.rubros.map((rubro, index) => (
                                        <Chip
                                            key={index}
                                            variant="elevated"
                                            label={`${rubro.nombre} `}
                                            style={{
                                                backgroundColor: "#1b325f",
                                                color: "white",
                                                margin: "2px",
                                                fontSize: "1.2rem" 
                                            }}
                                        />
                                    ))}
                            </Typography>
                        </Box>
                        <Box color="#1b325f" p={2}>
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem" }}>
                                <strong>Email: </strong> {profesional.email}
                            </Typography>
                        </Box>
                        <Box color="#1b325f" p={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem", flex: 1 }}>
                                <strong>Teléfono: </strong>
                                {telefono || "No disponible"}
                            </Typography>
                            <Button
                                variant="contained"
                                position="bottom"
                                size="small"
                                style={{
                                    backgroundColor: "#e9f2f9",
                                    color: "#1b325f",
                                    fontWeight: "bold",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                                sx={buttonStyle}
                                startIcon={<img src={whatsapp} alt="WhatsApp" style={{ height: '20px', marginRight: '5px' }} />}
                                onClick={() => handleClickWpp(profesional.idContacto)}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.1)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.transform = "scale(1)")
                                }
                            >
                                CONTACTAR
                            </Button>
                        </Box>

                        <Box color="#1b325f" p={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem", flex: 1 }}>
                                <strong>Instagram: </strong>
                                {instagram || "No disponible"}
                            </Typography>
                            <Button
                                variant="contained"
                                position="bottom"
                                size="small"
                                style={{
                                    backgroundColor: "#e9f2f9",
                                    color: "#1b325f",
                                    fontWeight: "bold",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                                sx={buttonStyle}
                                startIcon={<img src={fotoig} alt="instagram" style={{ height: '20px', marginRight: '5px' }} />}
                                onClick={() => handleClickIg(profesional.idContacto)}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.1)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.transform = "scale(1)")
                                }
                            >
                                CONTACTAR
                            </Button>
                        </Box>

                        <Box color="#1b325f" p={2} borderRadius="0px 0px 20px 20px" style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem", flex: 1 }}>
                                <strong>Facebook: </strong>
                                {facebook || "No disponible"}
                            </Typography>
                            <Button
                                variant="contained"
                                position="bottom"
                                size="small"
                                style={{
                                    backgroundColor: "#e9f2f9",
                                    color: "#1b325f",
                                    fontWeight: "bold",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                                sx={buttonStyle}
                                startIcon={<img src={fotofb} alt="facebook" style={{ height: '20px', marginRight: '5px' }} />}
                                onClick={() => handleClickFb(profesional.idContacto)}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.1)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.transform = "scale(1)")
                                }
                            >
                                CONTACTAR
                            </Button>
                        </Box>
                        <Box color="#1b325f" p={2} borderRadius="0px 0px 20px 20px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" style={{ fontSize: "1.2rem", marginRight: "10px" }}>
                                <strong>Valoración:</strong>
                            </Typography>
                            <Box>
                                <Typography variant="subtitle1" style={{ fontSize: "2rem", flex: 1, color: "black" }}>
                                    <strong>4.5 <Rating name="read-only" value={value} readOnly size="large" /></strong>
                                    
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
            <Grid xs={12} sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "0px 0px 20px 20px", padding: "0px" }}>
                <Box color="#1b325f" p={0} borderRadius="0px 0px 20px 20px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Button
                    variant="text"
                    style={{
                        color: "white",
                        backgroundColor: "#1b325f",
                        margin: "20px",
                        fontWeight: "bold",
                        fontSize: '15px',
                    }}
                    size="small"
                    startIcon={<SearchIcon />}
                    onClick={() => handleClick()}
                >
                    Seguir buscando profesionales
                </Button>
                <Button
                    aria-label="Agregar a favoritos"
                    onClick={() => handleAgregarFavorito(profesional)}
                    style={{
                        color: "white",
                        backgroundColor: "#1b325f",
                        margin: "20px",
                        fontWeight: "bold",
                        fontSize: '15px',
                    }}
                >
                     <FavoriteIcon
                        style={{ fontSize: '20px' }}
                        color={
                        favoritos.some(
                            (fav) => fav.idProfesional === profesional.idProfesional
                        )
                            ? "error"
                            : "default"
                        }
                    />
                            <Typography variant="h2" style={{ fontSize: 'small', fontWeight: 'bold' }}>
                                {favoritos.some(
                                    (fav) => fav.idProfesional === profesional.idProfesional
                                )
                                    ? "Sacar favorito"
                                    : "Agregar favorito"}
                            </Typography>
                </Button>
                </Box>
                <Box>
                <Button
                    variant="text"
                    style={{
                        color: "white",
                        backgroundColor: "#1b325f",
                        margin: "20px",
                        fontWeight: "bold",
                        fontSize: '15px',
                    }}
                    size="small"
                    startIcon={<StarHalfIcon />}
                    onClick={() => handleClickComments()}
                >
                    Dejar valoración
                </Button>
                <Button
                    variant="text"
                    style={{
                        color: "white",
                        backgroundColor: "#1b325f",
                        margin: "20px",
                        fontWeight: "bold",
                        fontSize: '15px',
                    }}
                    size="small"
                    startIcon={<FileCopyIcon />}
                    onClick={() => handleClickCopy()}
                >
                    Copiar link del profesional
                    </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};

export default PerfilProfesional;