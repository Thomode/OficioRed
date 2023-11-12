import { Container, Grid, Box } from "@mui/material";
import { FiltroRubros } from "../components/FiltroRubroProfesional";
import Buscador from "../components/buscador";
import { profesionalService } from "../services/profesional.service";
import { useEffect, useState } from "react";
import imagenFondo from "../assets/fondo.jpg";
import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const CardProfesional = lazy(() =>
  import("../components/ProfesionalesBusqueda/Card")
);

export function ProfesionalPage() {
  const [rubros, setRubros] = useState([]);
  const handleSearch = async () => {
    const data = await profesionalService.getAll();
    console.log(data);
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

    setProfesionales(filteredProfesionales);
  };
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  async function loadProfesionales() {
    const data = await profesionalService.getAll();
    console.log(data);
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
    <Suspense fallback={<h1>Cargando...</h1>}>
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
          <Grid>
            <Grid item xs={12} mt={2}>
              <Buscador
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
              />
            </Grid>
            <Grid item xs={12}>
              <FiltroRubros rubros={rubros} setRubros={setRubros} />
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mt={2}
        >
          <CardProfesional profesionales={profesionalesFiltrados} />
        </Grid>
      </Container>
    </Suspense>
  );
}
