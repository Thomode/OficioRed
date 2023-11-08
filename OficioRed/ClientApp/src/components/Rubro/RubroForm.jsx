import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rubroService } from "../../services/rubro.service";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
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

export function RubroForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [rubro, setRubro] = useState({
    nombre: "",
  });

  const loadRubro = async () => {
    if (params.id) {
      try {
        const data = await handleGet(params.id);
        setRubro(data);
        setEditing(true);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
  };

  useEffect(() => {
    loadRubro();
  }, [params.id]);

  const handleGet = async (id) => {
    try {
      const response = await rubroService.get(Number(id));
      return response.data;
    } catch (error) {
      console.error("Error", error);
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
        await rubroService.update(params.id, rubro.nombre);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Rubro actualizado con Éxito",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await rubroService.create(rubro.nombre);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Rubro creado con Éxito",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/admin/rubros");
    } catch (error) {
      setErrorMessage("Error al guardar el rubro");
      console.error(error);
    }
  };

  const handleCancelar = () => {
    navigate("/admin/rubros");
  };

  const handleChange = (e) => {
    setRubro({ ...rubro, [e.target.name]: e.target.value });
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
            {editing ? "Editar Rubro" : "Crear Rubro"}
          </Typography>
          <CardContent>
            <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  label="nombre"
                  fullWidth
                  margin="normal"
                  name="nombre"
                  value={rubro.nombre}
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
