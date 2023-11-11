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
import imagendefault from "../../assets/fotodefault.webp";
import { contactoService } from "../../services/contacto.service";

const cardStyle = {
  maxWidth: 345,
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
};

const CardProfesional = ({ profesionales }) => {
  const navigate = useNavigate();
  const handleLeerMasClick = (id) => {
    navigate(`/${id}/PerfilProfesional`);
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
        // Puedes mostrar un mensaje de error o tomar alguna otra acci�n apropiada.
      }
    } catch (error) {
      console.error("Error al obtener el contacto:", error);
      // Puedes mostrar un mensaje de error o tomar alguna otra acci�n apropiada.
    }
  };

  return (
    <Grid container spacing={2} marginLeft={"8%"} marginRight={"2%"}>
      {profesionales.map((profesional, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              alt="profesional"
              height="240"
              src={
                profesional.fotoPerfil ? profesional.fotoPerfil : imagendefault
              }
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
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "#1b325f", color: "white" }}
                    sx={buttonStyle}
                    onClick={() => handleContactar(profesional.idContacto)}
                  >
                    CONTACTAR
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "#f26c4f", color: "white" }}
                    sx={buttonStyle}
                    onClick={() =>
                      handleLeerMasClick(profesional.idProfesional)
                    }
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
