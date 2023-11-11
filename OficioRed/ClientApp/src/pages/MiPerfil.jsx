import React, { useState, useRef } from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";
import { useSnackbar } from "notistack";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
import logo from "../assets/Logo1_Recorte.png";
import imagenDefault from "../assets/profile.png";

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { AccountCircle, LockRounded } from "@mui/icons-material";

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#1B325F",
  textAlign: "center",
  marginBottom: "20px",
};

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #1b325f",
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "93vh",
  overFlow: "hidden",
};

export const MiPerfil = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const imageRef = useRef(null);
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await interesadoService.registerInteresado(
        data.nombre,
        data.apellido,
        data.email
      );
      const res2 = await interesadoService.imageUpload(selectedFile);

      navigate("/home");
      enqueueSnackbar("Registro exitoso", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 2000,
      });
    } catch (error) {
      enqueueSnackbar(error.response.data, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div style={backgroundStyle}>
      <Grid container style={{ justifyContent: "center" }}>
        <Grid
          container
          item
          xs={12}
          md={6}
          sm={3}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={800}
              minWidth={300}
              alignItems="center"
              justifyContent={"center"}
              padding={3}
              borderRadius={5}
              boxShadow={"5px 5px 10px #ccc"}
              sx={{
                ":hover": {
                  boxShadow: "10px 10px 20px #ccc",
                },
                backgroundColor: "white",
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid container justify="center">
                  <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                    <img src={logo} width={350} alt="logo" />
                  </Grid>
                </Grid>
                <Typography style={titleStyle}>Editar mi perfil</Typography>
                {image ? (
                  <img
                    src={image}
                    alt="Vista previa de la imagen"
                    style={imageStyle}
                  />
                ) : (
                  <img
                    src={imagenDefault}
                    alt="Imagen por defecto"
                    style={imageStyle}
                  />
                )}
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  style={{ marginTop: "10px" }}
                >
                  Cambiar Foto de Perfil
                  <input
                    type="file"
                    style={{ display: "none", color: "black" }}
                    onChange={fileSelectedHandler}
                    name="fotoPerfil"
                  />
                </Button>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name="nombre"
                    type={"text"}
                    placeholder="Nombre"
                    autoComplete="off"
                    label="Nombre"
                    margin="normal"
                    {...register("nombre", {
                      required: true,
                      minLength: 2,
                      maxLength: 15,
                      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
                    })}
                    error={!!errors.nombre}
                    helperText={
                      errors.nombre?.type === "required"
                        ? "Campo obligatorio"
                        : errors.nombre?.type === "minLength"
                        ? "Mínimo 2 caracteres"
                        : errors.nombre?.type === "maxLength"
                        ? "Máximo 15 caracteres"
                        : errors.apellido?.type === "pattern"
                        ? "Solo se permiten letras y espacios"
                        : ""
                    }
                  />
                  <TextField
                    fullWidth
                    required
                    name="apellido"
                    type={"text"}
                    placeholder="Apellido"
                    autoComplete="off"
                    label="Apellido"
                    margin="normal"
                    {...register("apellido", {
                      required: true,
                      minLength: 2,
                      maxLength: 15,
                      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
                    })}
                    error={!!errors.apellido}
                    helperText={
                      errors.apellido?.type === "required"
                        ? "Campo obligatorio"
                        : errors.apellido?.type === "minLength"
                        ? "Mínimo 2 caracteres"
                        : errors.apellido?.type === "maxLength"
                        ? "Máximo 15 caracteres"
                        : errors.apellido?.type === "pattern"
                        ? "Solo se permiten letras y espacios"
                        : ""
                    }
                  />
                  <TextField
                    fullWidth
                    required
                    name="email"
                    type={"email"}
                    placeholder="example@email.com"
                    autoComplete="off"
                    label="Email"
                    margin="normal"
                    {...register("email", {
                      required: true,
                      pattern: /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
                    })}
                    error={!!errors.email}
                    helperText={
                      errors.email?.type === "required"
                        ? "Campo obligatorio"
                        : errors.email?.type === "pattern"
                        ? "Coloque un email válido"
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    name="user"
                    type={"text"}
                    placeholder="Nombre de Usuario"
                    autoComplete="off"
                    label="Usuario"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    {...register("user", {
                      required: true,
                      minLength: 2,
                      maxLength: 15,
                    })}
                    error={!!errors.usuario}
                    helperText={
                      errors.usuario?.type === "required"
                        ? "Campo obligatorio"
                        : errors.usuario?.type === "minLength"
                        ? "Mínimo 2 caracteres"
                        : errors.usuario?.type === "maxLength"
                        ? "Máximo 15 caracteres"
                        : ""
                    }
                  />

                  <TextField
                    fullWidth
                    required
                    name="password"
                    placeholder="Contraseña Actual"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    label="Contraseña Actual"
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
                  />
                  <TextField
                    fullWidth
                    required
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
                  <TextField
                    fullWidth
                    required
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    label="Confirmar Contraseña"
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
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === watch("password"),
                    })}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword?.type === "required"
                        ? "Campo obligatorio"
                        : errors.confirmPassword?.type === "validate"
                        ? "Las contraseñas no coinciden"
                        : ""
                    }
                  />
                </Grid>
              </Grid>

              <Button
                margin="normal"
                endIcon={<HowToRegOutlinedIcon />}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Guardar cambios
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
