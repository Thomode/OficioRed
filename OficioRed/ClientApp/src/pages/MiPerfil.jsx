import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usuarioService } from "../services/usuario.service";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LockRounded } from "@mui/icons-material";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

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

export const MiPerfil = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();
  const [usuario, setUsuario] = useState({
    user: "",
    password: "",
  });
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
  }, [params.id]);

  const handleGet = async () => {
    const id = usuarioService.getId();
    try {
      const response = await usuarioService.get(Number(id));
      return response.data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const id = usuarioService.getId();
      console.log("Actualizando usuario:", usuario);
      await usuarioService.updateUser(id, usuario.user, usuario.password);
      console.log("Usuario actualizado con éxito");
      setSuccessMessage("Usuario actualizado con éxito");

      navigate("/home");
    } catch (error) {
      setErrorMessage("Error al guardar el usuario");
      console.error("Error al guardar el usuario:", error);
    }
  };

  const handleCancelar = () => {
    navigate("/home");
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
            {editing ? "Editar Usuario" : "Mi Perfil"}
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
                  fullWidth
                  required
                  name="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  label="Contraseña"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <LockRounded />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <RemoveRedEyeRoundedIcon fontSize="small" />
                          ) : (
                            <VisibilityOffRoundedIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: true,
                    minLength: 2,
                    maxLength: 15,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$.-_,@$!%*?&])[A-Za-z\d$.-_,@$!%*?&]{4,15}$/,
                  })}
                  error={!!errors.password}
                  helperText={
                    errors.password?.type === "required"
                      ? "Campo obligatorio"
                      : errors.password?.type === "minLength"
                      ? "Mínimo 2 caracteres"
                      : errors.password?.type === "maxLength"
                      ? "Máximo 15 caracteres"
                      : errors.password?.type === "pattern"
                      ? "Debe contener entre 4 y 15 caracteres y al menos una letra mayúscula, una minúscula, un número y un caracter especial"
                      : ""
                  }
                />

                <Box display="flex" justifyContent="center" marginTop="20px">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginRight: "10px" }}
                  >
                    {editing ? "Actualizar" : "Guardar"}
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
