import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usuarioService } from "../../services/usuario.service";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const styles = {
  card: {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    padding: "1rem",
  },
  title: {
    background: "#f0f0f0",
  },
};

const UsuarioForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [usuario, setUsuario] = useState({
    user: "",
    password: "",
    idRol: 3,
  });
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadUsuario = async () => {
      if (params.id) {
        try {
          const data = await handleGet(params.id);
          if (data) {
            setUsuario(data);
            setEditing(true);
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      }
    };
    loadUsuario();
    loadRoles();
  }, [params.id]);

  const handleGet = async (id) => {
    try {
      const response = await usuarioService.get(Number(id));
      return response.data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  };

  const loadRoles = async () => {
    try {
      const response = await axios.get("/api/Rol");
      setRoles(response.data);
    } catch (error) {
      console.error("Error al cargar los roles:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (editing) {
        await usuarioService.update(
          params.id,
          usuario.user,
          usuario.password,
          usuario.idRol
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario actualizado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await usuarioService.create(
          usuario.user,
          usuario.password,
          usuario.idRol
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/admin/usuarios");
    } catch (error) {
      setErrorMessage("Error al guardar el usuario");
      console.error("Error al guardar el usuario:", error);
    }
  };

  const handleCancelar = () => {
    navigate("/admin/usuarios");
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={5} sx={styles.card}>
          <Typography
            variant="h4"
            align="center"
            color="#1b325f"
            gutterBottom
            sx={styles.title}
          >
            {editing ? "Editar Usuario" : "Registrar Usuario"}
          </Typography>
          <CardContent>
            <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  label="Usuario"
                  fullWidth
                  margin="normal"
                  name="user"
                  value={usuario.user}
                  onChange={handleChange}
                  required
                />

                <TextField
                  variant="outlined"
                  label="Password"
                  fullWidth
                  margin="normal"
                  type="password"
                  name="password"
                  value={usuario.password}
                  onChange={handleChange}
                  required
                />

                <TextField
                  id="outlined-select-rol"
                  select
                  label="Rol"
                  fullWidth
                  margin="normal"
                  value={usuario.idRol}
                  onChange={handleChange}
                  name="idRol"
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role.idRol} value={role.idRol}>
                      {role.nombre}
                    </MenuItem>
                  ))}
                </TextField>

                <Box display="flex" justifyContent="center" marginTop="20px">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginRight: "10px" }}
                  >
                    {editing ? "Actualizar" : "Agregar"}
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </Button>
                </Box>

                {errorMessage && (
                  <Typography
                    variant="body2"
                    color="error"
                    style={{ marginTop: "10px" }}
                  >
                    {errorMessage}
                  </Typography>
                )}

                {successMessage && (
                  <Typography
                    variant="body2"
                    color="success"
                    style={{ marginTop: "10px" }}
                  >
                    {successMessage}
                  </Typography>
                )}
              </form>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UsuarioForm;
