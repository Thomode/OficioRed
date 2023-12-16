import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import imagenFondo from "../assets/fondo.jpg";
import { SearchBar } from "../components/SearchBar";
import { FiltroRubros } from "../components/FiltroRubroProfesional";
import Swal from "sweetalert2";
import { favoritoService } from "../services/favorito.service";
import { profesionalService } from "../services/profesional.service";
import { CardProfesional } from "../components/ProfesionalesBusqueda/Card";

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
    try {
      const favoritosData = await favoritoService.get();

      if (favoritosData.length > 0) {
        const profesionalesData = await Promise.all(
          favoritosData.map(async (favorito) => {
            const profesionalData = await profesionalService.getById(
              favorito.idProfesional
            );
            return profesionalData.data;
          })
        );
        setProfesionales(profesionalesData);
        setProfesionalesFiltrados(profesionalesData);
      } else {
        setProfesionales([]);
        setProfesionalesFiltrados([]);
      }
    } catch (error) {
      console.error("Error al cargar los profesionales:", error);
    }
  }

  useEffect(() => {
    loadProfesionales();
  }, []);

  useEffect(() => {
    if (profesionales && profesionales.length > 0) {
      const rubrosSeleccionados = rubros
        .filter((r) => r.seleccionado)
        .map((r) => r.idRubro);

      const profFiltrados = profesionales.filter(
        (p) =>
          p.rubros &&
          p.rubros.some((r) => rubrosSeleccionados.includes(r.idRubro))
      );

      setProfesionalesFiltrados(profFiltrados);
    }
  }, [rubros, profesionales]);

  return (
    <Container
      style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Grid xs={12}>
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
          <Grid item xs={10}>
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
        {rubros.some((rubro) => rubro.seleccionado) ? (
          <>
            {profesionalesFiltrados.length > 0 ? (
              <CardProfesional
                profesionales={profesionalesFiltrados}
                loadProfesionales={loadProfesionales}
              />
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
                No hay profesionales favoritos
              </Typography>
            )}
          </>
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
    </Container>
  );
}
