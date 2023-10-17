import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { oficioService } from "../../services/oficio.service";
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

export function OficioForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [oficio, setOficio] = useState({
    nombre: "",
  });
  const loadOficio = async () => {
    if (params.id) {
      try {
        const data = await hadleGet(params.id);
        setOficio(data); // Actualiza el estado "usuario" con los datos del usuario existente
        setEditing(true); // Establece la bandera de edici�n en true
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
  };
  useEffect(() => {
    loadOficio();
  }, [params.id]);

  const hadleGet = async (id) => {
    try {
      const res = await oficioService.get(Number(id));
      return res.data;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (editing) {
        // Si estamos editando, llama a la funci�n de edici�n en lugar de creaci�n
        const response = await oficioService.update(params.id, oficio.nombre);
        setSuccessMessage("Usuario actualizado con Éxito");
      } else {
        const response = await oficioService.create(oficio.nombre);
        setSuccessMessage("Usuario creado con Éxito");
      }
      navigate("/admin/oficios");
    } catch (error) {
      setErrorMessage("Error al guardar el usuario");
      console.error(error);
    }
  };

  const handleCancelar = () => {
    navigate("/oficios");
  };

  const handleChange = (e) => {
    setOficio({ ...oficio, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={5} sx={{ backgroundColor: "white", padding: "1rem" }}>
          <Typography variant="h4" align="center" color="black" gutterBottom>
            {editing ? "Editar Oficio" : "Crear Oficio"}
          </Typography>
          <CardContent>
            <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  label="nombre"
                  fullWidth
                  margin="normal"
                  type="nombre"
                  name="nombre"
                  value={oficio.password}
                  onChange={handleChange}
                  InputProps={{ style: { color: "black", fontSize: "1.2rem" } }}
                  InputLabelProps={{
                    style: { color: "black", fontSize: "1.2rem" },
                  }}
                  required
                />

                <Box display="flex" justifyContent="center" marginTop="20px">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginRight: "10px", fontSize: "1.2rem" }}
                  >
                    {editing ? "Actualizar" : "Agregar"}
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={handleCancelar}
                    style={{ fontSize: "1.2rem" }}
                  >
                    Cancelar
                  </Button>
                </Box>

                {errorMessage && (
                  <Typography
                    variant="body2"
                    color="error"
                    style={{ marginTop: "10px", fontSize: "1.2rem" }}
                  >
                    {errorMessage}
                  </Typography>
                )}

                {successMessage && (
                  <Typography
                    variant="body2"
                    color="success"
                    style={{ marginTop: "10px", fontSize: "1.2rem" }}
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
}
