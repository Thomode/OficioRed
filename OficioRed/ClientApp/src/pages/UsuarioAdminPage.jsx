import { useEffect, useState } from "react";
import { TablaUsuario } from "../components/Usuario/TablaUsuario";
import { usuarioService } from "../services/usuario.service";
import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { SearchBar } from "../components/SearchBar";

const titleStyle2 = {
  fontSize: "70px",
  fontWeight: "bold",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  WebkitTextStroke: "2px white",
  MozTextStroke: "2px white",
};

export function UsuarioAdminPage() {
  const [loading, setLoading] = useState(false);
  const [resetSearch, setResetSearch] = useState(false);

  const reloadUsuarios = async () => {
    setResetSearch(false);
    loadUsuarios();
  };

  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const data = await usuarioService.getAll();
    const filteredUsuarios = data.filter((usuario) =>
      usuario.user.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (filteredUsuarios.length === 0) {
      Swal.fire({
        icon: "warning",
        title: `No se encontró el usuario "${searchValue}"`,
        confirmButtonText: "OK",
        confirmButtonColor: "#1b325f",
      });
      reloadUsuarios();
      setResetSearch(true);
    } else {
      setResetSearch(false);
    }
    setUsuarios(filteredUsuarios);
  };
  const [usuarios, setUsuarios] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  async function loadUsuarios() {
    const data = await usuarioService.getAll();
    setUsuarios(data);
  }

  useEffect(() => {
    loadUsuarios();
  }, []);

  const crearUsuario = async () => {
    const roles = ["Interesado", "Profesional"];

    await Swal.fire({
      title: "Agregar Usuario",
      html:
        '<input id="user" class="swal2-input" placeholder="Nombre de Usuario" value="">' +
        '<input id="password" class="swal2-input" type="password" placeholder="Contraseña">' +
        '<select id="idRol" class="swal2-input swal2-select">' +
        roles.map((rol) => `<option value="${rol}">${rol}</option>`).join("") +
        "</select>",
      showCancelButton: true,
      confirmButtonColor: "#1b325f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const nuevoNombre = document.getElementById("user").value;
        const nuevaPassword = document.getElementById("password").value;
        const selectedRol = document.getElementById("idRol").value;
        const nuevoIdRol =
          selectedRol === "Profesional"
            ? 2
            : selectedRol === "Interesado"
            ? 3
            : null;

        if (nuevoIdRol === null) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Rol no válido",
          });
          return;
        }

        try {
          await usuarioService.create(nuevoNombre, nuevaPassword, nuevoIdRol);
          loadUsuarios();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario creado con éxito",
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
    <Card>
      <CardContent>
        <Typography variant="h2" sx={titleStyle2}>
          Administración Usuarios
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
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              loading={loading}
              handleSearch={handleSearch}
              resetSearch={resetSearch}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => crearUsuario()}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
        <TablaUsuario
          usuarios={usuarios}
          loadUsuarios={loadUsuarios}
        ></TablaUsuario>
      </CardContent>
    </Card>
  );
}
