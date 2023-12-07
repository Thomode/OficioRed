import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { contactoService } from "../../services/contacto.service";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  Grid,
  Chip,
} from "@mui/material";
import imagendefault from "../../assets/fotodefault.webp";
import imagenwsp from "../../assets/whatsapp.png";
import FavoriteIcon from "@mui/icons-material/Favorite";

const cardStyle = {
  maxWidth: "345px",
  minHeight: "480px",
  borderRadius: 10,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  marginBottom: "20px",
  border: "2px solid #1b325f",
  "&:hover": {
    transform: "scale(1.05)",
    border: "",
  },
};

const buttonStyle = {
  margin: "0 8px",
  posittion: "bottom",
};

export function CardProfesional({ profesionales }) {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });

  const handleLeerMasClick = (id) => {
    navigate(`/${id}/PerfilProfesional`);
  };

  const handleContactar = async (idContacto) => {
    try {
      const res = await contactoService.getById(idContacto);
      if (res.data.telefono) {
        const url = `https://wa.me/+549${res.data.telefono}`;
        window.open(url, "_blank");
      } else {
        console.error("El numero de telefono no esta definido.");
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

  return (
    <Grid container spacing={2} marginLeft={"8%"} marginRight={"2%"}>
      {profesionales.map((profesional) => (
        <Grid item key={profesional.idProfesional} sm={6} md={4} lg={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              alt="profesional"
              height="240px"
              src={
                profesional.fotoPerfil ? profesional.fotoPerfil : imagendefault
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {`${profesional.nombre} ${profesional.apellido}`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                minHeight="100px"
              >
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
                      }}
                    />
                  ))}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    position="bottom"
                    size="small"
                    style={{
                      backgroundColor: "#2E8B57",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    sx={buttonStyle}
                    startIcon={
                      <img
                        src={imagenwsp}
                        alt="WhatsApp"
                        style={{ height: "20px", marginRight: "5px" }}
                      />
                    }
                    onClick={() => handleContactar(profesional.idContacto)}
                  >
                    CONTACTAR
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      backgroundColor: "#f26c4f",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    sx={buttonStyle}
                    onClick={() =>
                      handleLeerMasClick(profesional.idProfesional)
                    }
                  >
                    Leer más
                  </Button>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="Agregar a favoritos"
                    onClick={() => handleAgregarFavorito(profesional)}
                  >
                    <FavoriteIcon
                      color={
                        favoritos.some(
                          (fav) =>
                            fav.idProfesional === profesional.idProfesional
                        )
                          ? "error"
                          : "default"
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
