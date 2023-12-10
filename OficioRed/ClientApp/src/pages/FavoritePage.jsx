import { useState, useEffect } from "react";
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
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import imagendefault from "../assets/fotodefault.webp";
import imagenFondo from "../assets/fondo.jpg";
import imagenwsp from "../assets/whatsapp.png";
import { contactoService } from "../services/contacto.service";
import { profesionalService } from "../services/profesional.service";
import { SearchBar } from "../components/SearchBar";
import { FiltroRubros } from "../components/FiltroRubroProfesional";
import Swal from "sweetalert2";
import { CardProfesional } from "../components/ProfesionalesBusqueda/Card";

const cardStyle = {
  maxWidth: "345px",
  minHeight: "480px",
  borderRadius: 10,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  margin: "20px",
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

const titleStyle2 = {
  fontSize: "70px",
  fontWeight: "bold",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  WebkitTextStroke: "2px white",
  MozTextStroke: "2px white",
  marginBottom: "0px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  padding: "10px",
};

export function FavoritePage() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [rubros, setRubros] = useState([]);
  const [resetSearch, setResetSearch] = useState(false);
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const reloadProfesionales = async () => {
    setResetSearch(false);
    loadProfesionales();
  };

  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    const filteredProfesionales = favoritos.filter((profesional) => {
      const nombreEnMinusculas = profesional.nombre.toLowerCase();
      const apellidoEnMinusculas = profesional.apellido.toLowerCase();
      const searchValueEnMinusculas = searchValue.toLowerCase();
      return (
        nombreEnMinusculas.includes(searchValueEnMinusculas) ||
        apellidoEnMinusculas.includes(searchValueEnMinusculas) ||
        (nombreEnMinusculas + " " + apellidoEnMinusculas).includes(
          searchValueEnMinusculas
        )
      );
    });

    if (filteredProfesionales.length === 0) {
      Swal.fire({
        icon: "warning",
        title: `No se encontró ningún profesional en favoritos con el nombre "${searchValue}"`,
        confirmButtonText: "OK",
        confirmButtonColor: "#1b325f",
      });
      reloadProfesionales();
      setResetSearch(true);
    } else {
      setResetSearch(false);
    }
    setProfesionalesFiltrados(filteredProfesionales);
  };
  async function loadProfesionales() {
    const storedFavoritos = localStorage.getItem("favoritos");
    if (storedFavoritos) {
      const favoritosData = JSON.parse(storedFavoritos);
      setProfesionales(favoritosData);
      setProfesionalesFiltrados(favoritosData);
    } else {
      setProfesionales([]);
      setProfesionalesFiltrados([]);
    }
  }

  useEffect(() => {
    loadProfesionales();
  }, []);

  useEffect(() => {
    const rubrosSeleccionados = rubros
      .filter((r) => r.seleccionado)
      .map((r) => r.idRubro);
    const profFiltrados = profesionales.filter((p) =>
      p.rubros.some((r) => rubrosSeleccionados.includes(r.idRubro))
    );
    setProfesionalesFiltrados(profFiltrados);
  }, [rubros, profesionales]);

  useEffect(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    if (storedFavoritos) {
      setFavoritos(JSON.parse(storedFavoritos));
    }
  }, []);

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
      }
    } catch (error) {
      console.error("Error al obtener el contacto:", error);
    }
  };

  const handleAgregarFavorito = (profesional) => {
    setFavoritos((prevFavoritos) => {
      const isInFavoritos = prevFavoritos.some(
        (fav) => fav.idProfesional === profesional.idProfesional
      );
      let nuevosFavoritos;
      if (!isInFavoritos) {
        nuevosFavoritos = [...prevFavoritos, profesional];
      } else {
        nuevosFavoritos = prevFavoritos.filter(
          (fav) => fav.idProfesional !== profesional.idProfesional
        );
      }
      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      setProfesionalesFiltrados(nuevosFavoritos);
      return nuevosFavoritos;
    });
  };

  return (
    <Grid
      container
      style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h2" sx={titleStyle2}>
          Favoritos
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(255, 255, 255, 0.6)"
          p={2}
          mt={0}
          borderBottom="2px solid #1b325f"
          borderRadius="0px 0px 50px 50px"
        >
          <Grid item xs={12}>
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              loading={loading}
              handleSearch={handleSearch}
              resetSearch={resetSearch}
            />
            <FiltroRubros rubros={rubros} setRubros={setRubros} />
          </Grid>
        </Box>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={2}
      >
        {favoritos.length > 0 && rubros.some((rubro) => rubro.seleccionado) ? (
          profesionalesFiltrados.length > 0 ? (
            profesionalesFiltrados.map((profesional, index) => (
              <Grid item key={index} sm={6} md={4} lg={4}>
                <Card sx={cardStyle}>
                  <CardMedia
                    component="img"
                    alt="profesional"
                    height="240px"
                    src={
                      profesional.fotoPerfil
                        ? profesional.fotoPerfil
                        : imagendefault
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
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
                          style={{ backgroundColor: "#2E8B57", color: "white" }}
                          sx={buttonStyle}
                          startIcon={
                            <img
                              src={imagenwsp}
                              alt="WhatsApp"
                              style={{ height: "20px", marginRight: "5px" }}
                            />
                          }
                          onClick={() =>
                            handleContactar(profesional.idContacto)
                          }
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
                        <IconButton
                          aria-label="Agregar a favoritos"
                          onClick={() => handleAgregarFavorito(profesional)}
                        >
                          <FavoriteIcon
                            color={
                              favoritos.some(
                                (fav) =>
                                  fav.idProfesional ===
                                  profesional.idProfesional
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
            ))
          ) : (
            <CircularProgress style={{ position: "absolute", top: "50%" }} />
          )
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{
              position: "absolute",
              top: "50%",
              fontWeight: "bold",
              fontSize: "24px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            Por favor, seleccione algún rubro
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
