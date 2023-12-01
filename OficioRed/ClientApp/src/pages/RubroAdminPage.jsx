import { useEffect, useState } from "react";
import { TablaRubro } from "../components/Rubro/TablaRubro";
import { rubroService } from "../services/rubro.service";
import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Busqueda } from "../components/Busqueda";
import Swal from "sweetalert2";

const titleStyle2 = {
  fontSize: "70px",
  fontWeight: "bold",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  WebkitTextStroke: "2px white",
  MozTextStroke: "2px white",
};

export function RubroAdminPage() {
  const handleSearch = async () => {
    const data = await rubroService.getAll();
    console.log(data);
    const filteredRubros = data.filter((rubro) =>
      rubro.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );

    setRubros(filteredRubros);
  };
  const [rubros, setRubros] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  async function loadRubros() {
    const data = await rubroService.getAll();
    console.log(data);
    setRubros(data);
  }

  useEffect(() => {
    loadRubros();
  }, []);

  const crearRubro = async (nombreRubro) => {
    await Swal.fire({
      title: "Agregar Rubro",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValue: nombreRubro,
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async (nuevoNombre) => {
        try {
          await rubroService.create(nuevoNombre);
          loadRubros();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rubro creado con éxito",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data,
          });
        }
      },
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h2" sx={titleStyle2}>
            Administración Rubros
          </Typography>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              marginBottom: "10px",
            }}
          >
            <Grid item xs={6}>
              <Busqueda
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearch={handleSearch}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={() => crearRubro()}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <TablaRubro rubros={rubros} loadRubros={loadRubros}></TablaRubro>
        </CardContent>
      </Card>
    </>
  );
}
