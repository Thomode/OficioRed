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

const PerfilProfesional = () => {
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
  const handleContactar = async (idContacto) => {
    try {
      const res = await contactoService.getById(idContacto);
      console.log(res.data);

      if (res.data.telefono) {
        const url = `https://wa.me/+549${res.data.telefono}`;
        window.open(url, "_blank");
      } else {
        console.error(
          "El numero de telefono no esta definido en el objeto de contacto."
        );
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
      <Grid container justifyContent="center" spacing={2}>
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
                    color: "#1b325f",
                    marginRight: "8px",
                    fontWeight: "bold",
                  }}
                  size="small"
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
                    height="400"
                    image={profesional.fotoPerfil || imagendefault}
                    style={{
                      borderRadius: "20px",
                      border: "2px solid #1b325f",
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt={2}
                  >
                    <img
                      src={fotofb}
                      alt="facebook"
                      style={{
                        width: "60px",
                      }}
                    />
                    <img
                      src={fotoig}
                      alt="instagram"
                      style={{
                        width: "60px",
                      }}
                    />
                    <img
                      src={whatsapp}
                      alt="whatsapp"
                      style={{
                        width: "60px",
                      }}
                    />
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
                        <strong>Facebook: </strong>{" "}
                        {facebook || "No disponible"}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Box marginLeft="65px">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#1b325f",
                          color: "white",
                          margin: "5px",
                        }}
                        size="small"
                        onClick={() => handleContactar(profesional.idContacto)}
                      >
                        Contactar
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#f26c4f",
                          color: "white",
                          margin: "5px",
                        }}
                        size="small"
                        endIcon={<FavoriteIcon />}
                      >
                        Agregar a Favoritos
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#1b325f",
                          color: "white",
                          margin: "5px",
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
