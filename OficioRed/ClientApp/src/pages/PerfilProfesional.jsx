import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import axios from "axios";
import imagendefault from "../assets/fotodefault.webp";
import { contactoService } from "../services/contacto.service";
import imagenFondo from "../assets/fondo.jpg";
import fotofb from "../assets/facebook.png";
import fotoig from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import Rating from '@mui/material/Rating';
import { profesionalService } from "../services/profesional.service";
import SpeedDialTooltipOpen from "../components/SpeedDial";

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
    const [value, setValue] = React.useState(2);
    const [profesional, setProfesional] = useState({});
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [telefono, setTelefono] = useState("");
    const { id } = useParams();
    const [rubros, setRubros] = useState([]);
    const navigate = useNavigate();

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
        profesionalService.getAll()
            .then((profesionales) => {
                const profesionalActual = profesionales.find((prof) => prof.idProfesional === parseInt(id, 10));
                if (profesionalActual) {
                    setRubros(profesionalActual.rubros || []);
                }
            })
            .catch((error) => {
                console.error("Error fetching profesionales data", error);
            });
    }, [id]);

    const handleClick = () => {
        navigate(-1);
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
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant="h2" sx={titleStyle2}>
                        Detalle de Perfil
                    </Typography>
                    <Button
                        variant="text"
                        style={{
                            color: "#1b325f",
                            margin: "20px",
                            fontWeight: "bold",
                            fontSize: '15px',
                        }}
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => handleClick()}
                    >
                        Seguir buscando
                    </Button>
                </Box>
            </Grid>
            <Grid container justifyContent="center" spacing={0} sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", borderRadius: "0px 0px 20px 20px" }}>
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
                                {rubros &&
                                    rubros.map((rubro, index) => (
                                        <Chip
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
                        <SpeedDialTooltipOpen></SpeedDialTooltipOpen>
                    </CardContent>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PerfilProfesional;