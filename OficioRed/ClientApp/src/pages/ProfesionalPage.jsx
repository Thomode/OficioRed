import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FiltroRubros } from "../components/FiltroRubroProfesional";
import { profesionalService } from "../services/profesional.service";
import imagenFondo from "../assets/fondo.jpg";
import { SearchBar } from "../components/SearchBar";
import Swal from "sweetalert2";
import CardProfesional from "../components/ProfesionalesBusqueda/Card";

export function ProfesionalPage() {
  const [loading, setLoading] = useState(false);
  const [rubros, setRubros] = useState([]);
  const [resetSearch, setResetSearch] = useState(false);

  const reloadProfesionales = async () => {
    setResetSearch(false);
    loadProfesionales();
  };
  
  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    const data = await profesionalService.getAll();
    const filteredProfesionales = data.filter((profesional) => {
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
        title: `No se encontró el profesional "${searchValue}"`,
        confirmButtonText: "OK",
        confirmButtonColor: "#1b325f",
      });
      reloadProfesionales();
      setResetSearch(true);
    } else {
      setResetSearch(false);
    }
    setProfesionales(filteredProfesionales);
  };

  const [profesionales, setProfesionales] = useState([]);
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  async function loadProfesionales() {
    const data = await profesionalService.getAll();
    setProfesionales(data);
    setProfesionalesFiltrados(data);
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

  const { idRubro } = useParams();

  useEffect(() => {
    if (idRubro) {
      setRubros((prevRubros) =>
        prevRubros.map((r) => ({
          ...r,
          seleccionado: r.idRubro === idRubro,
        }))
      );
    }
  }, [idRubro]);

  return (
    <Container
      style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={2}
      >
        {rubros.some((rubro) => rubro.seleccionado) ? (
          profesionalesFiltrados.length > 0 ? (
            <CardProfesional profesionales={profesionalesFiltrados} />
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
    </Container>
  );
}
