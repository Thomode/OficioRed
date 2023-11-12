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
import axios from "axios";
import imagendefault from "../assets/fotodefault.webp";
import { contactoService } from "../services/contacto.service";
import imagenFondo from "../assets/fondo.jpg";
import fotofb from "../assets/facebook.png";
import fotoig from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import Rating from '@mui/material/Rating';

const buttonStyle = {
    margin: "0 8px",
    posittion: "bottom",
};


const PerfilProfesional = () => {
  const [value, setValue] = React.useState(2);
  const [profesional, setProfesional] = useState({});
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telefono, setTelefono] = useState("");
  const { id } = useParams();
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
  }, [id]);

  const handleClick = () => {
    navigate(`/profesionales`);
  };
  const handleClickComments = (id) => {
    navigate(`/${id}/PerfilProfesional/Comentarios`);
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
      }}
    >
        <Grid container justifyContent="center" xs={12}>
        <Grid item xs={12} md={8}>
          <Card
            style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            borderRadius="50px"
          >
            <Box p={2} border="2px solid #1b325f">
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                mb={2}
              >
                <Button
                  variant="text"
                  style={{
                    color: "white",
                    marginRight: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#1b325f"
                                  }}
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => handleClick()}
                >
                  Volver
                </Button>
              </Box>
              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    alt="profesional"
                    height="560"
                    image={profesional.fotoPerfil || imagendefault}
                    style={{
                      border: "2px solid #1b325f",
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt={2}>
                    <Button
                        variant="contained"
                        position="bottom"
                        size="small"
                        style={{ backgroundColor: "#e9f2f9", color: "#1b325f", fontWeight: "bold" }}
                        sx={buttonStyle}
                        startIcon={<img src={whatsapp} alt="WhatsApp" style={{ height: '20px', marginRight: '5px' }} />}
                        onClick={() => handleClickWpp(profesional.idContacto)}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        CONTACTAR
                    </Button>
                    <Button
                        variant="contained"
                        position="bottom"
                        size="small"
                        style={{ backgroundColor: "#e9f2f9", color: "#1b325f", fontWeight: "bold" }}
                        sx={buttonStyle}
                        startIcon={<img src={fotofb} alt="facebook" style={{ height: '20px', marginRight: '5px' }} />}
                        onClick={() => handleClickFb(profesional.idContacto)}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        CONTACTAR
                    </Button>
                    <Button
                        variant="contained"
                        position="bottom"
                        size="small"
                        style={{ backgroundColor: "#e9f2f9", color: "#1b325f", fontWeight: "bold" }}
                        sx={buttonStyle}
                        startIcon={<img src={fotoig} alt="instagram" style={{ height: '20px', marginRight: '5px' }} />}
                        onClick={() => handleClickIg(profesional.idContacto)}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        CONTACTAR
                    </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Box
                      bgcolor="#21406e"
                      color="white"
                      p={2}
                      borderRadius="20px 20px 0 0"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="h4" style={{ textAlign: "center" }}>
                        {`${profesional.nombre} ${profesional.apellido}`}
                      </Typography>
                    </Box>
                    <Box bgcolor="#1b325f" color="white" p={2}>
                      <Typography variant="subtitle1">
                        <strong>Nombre: </strong> {profesional.nombre}
                      </Typography>
                    </Box>
                    <Box bgcolor="#21406e" color="white" p={2}>
                      <Typography variant="subtitle1">
                        <strong>Apellido: </strong> {profesional.apellido}
                      </Typography>
                    </Box>
                    <Box bgcolor="#1b325f" color="white" p={2}>
                      <Typography variant="subtitle1">
                        <strong>Descripcion: </strong> {profesional.descripcion}
                      </Typography>
                    </Box>
                    <Box bgcolor="#21406e" color="white" p={2}>
                      <Typography variant="subtitle1">
                        <strong>Email: </strong> {profesional.email}
                      </Typography>
                    </Box>
                    <Box bgcolor="#1b325f" color="white" p={2}>
                      <Typography variant="subtitle1">
                        <strong>Teléfono: </strong>
                        {telefono || "No disponible"}
                      </Typography>
                    </Box>
                    <Box bgcolor="#21406e" color="white" p={2}>
                      <Typography variant="subtitle1">
                        <strong>Instagram: </strong>
                        {instagram || "No disponible"}
                      </Typography>
                    </Box>
                    <Box
                      bgcolor="#1b325f"
                      color="white"
                      p={2}
                      borderRadius="0px 0px 20px 20px"
                    >
                      <Typography variant="subtitle1">
                        <strong>Facebook: </strong>
                        {facebook || "No disponible"}
                      </Typography>
                    </Box>
                  </CardContent>
                    <CardActions style={{ textAlign: "center" }}>
                        <Box marginLeft="auto" display="flex" alignItems="center">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                                  margin: '5px', 
                                                  backgroundColor: "#e9f2f9",
                                                  borderRadius: '5px',
                                                  color: "#1b325f"
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                                  }}
                                    size="large"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#e9f2f9",
                                    color: "#1b325f",
                                    margin: "5px",
                                    fontWeight: "bold",
                                }}
                                size="small"
                                endIcon={<FavoriteIcon />}
                            >
                                Agregar a Favoritos
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#e9f2f9",
                                    color: "#1b325f",
                                    margin: "5px",
                                    fontWeight: "bold",
                                }}
                                size="small"
                                endIcon={<CommentIcon />}
                                onClick={() => handleClickComments(id)}
                            >
                                Comentarios
                            </Button>
                        </Box>
                    </CardActions>

                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerfilProfesional;
