import React, { useEffect, useState } from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";
import { useSnackbar } from "notistack";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
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
import { LockRounded } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usuarioService } from "../services/usuario.service";
import { FiltroRubros } from "../components/FiltroRubrosSignUp";

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

export const MiPerfilProfesional = () => {
  const [rubros, setRubros] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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

  const handleClick = () => {
    navigate(`/profesionales`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = usuarioService.getId();
        const userData = await usuarioService.get(userId);

        // Actualizo los campos de usuario con los datos obtenidos
        Object.keys(userData).forEach((key) => {
          setValue(key, userData[key]);
        });

        const interesadoData = await interesadoService.getById(userId);

        // Actualizo los campos de interesado con los datos obtenidos
        Object.keys(interesadoData).forEach((key) => {
          setValue(key, interesadoData[key]);
        });

        if (interesadoData?.fotoPerfil) {
          setImage(interesadoData.fotoPerfil);
        }
      } catch (error) {
        console.log(
          "Error al obtener los datos del usuario e interesado",
          error
        );
      }
    };
    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await interesadoService.updateInteresado(
        data.nombre,
        data.apellido,
        data.email,
        selectedFile
      );
      await usuarioService.updateUser(data.id, data.user, data.password);

      navigate("/home");
      enqueueSnackbar("Actualización exitosa", {
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
                <Button
                  variant="text"
                  style={{
                    color: "#1b325f",
                    marginRight: "8px",
                    fontWeight: "bold",
                  }}
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => handleClick()}
                >
                  Volver
                </Button>

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
                <Grid item xs={6}>
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
                      maxLength: 20,
                      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
                    })}
                    error={!!errors.nombre}
                    helperText={
                      errors.nombre?.type === "required"
                        ? "Campo obligatorio"
                        : errors.nombre?.type === "minLength"
                        ? "Mínimo 2 caracteres"
                        : errors.nombre?.type === "maxLength"
                        ? "Máximo 20 caracteres"
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    name="telefono"
                    type="tel"
                    placeholder="Teléfono"
                    autoComplete="off"
                    label="Teléfono"
                    margin="normal"
                    {...register("telefono", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                    error={!!errors.telefono}
                    helperText={
                      errors.telefono?.type === "required"
                        ? "Campo obligatorio"
                        : errors.telefono?.type === "pattern"
                        ? "Ingrese un número de teléfono válido"
                        : ""
                    }
                  />
                  <TextField
                    fullWidth
                    name="instagram"
                    type="text"
                    placeholder="Instagram"
                    autoComplete="off"
                    label="Instagram"
                    margin="normal"
                    {...register("instagram")}
                  />
                  <TextField
                    fullWidth
                    name="facebook"
                    type="text"
                    placeholder="Facebook"
                    autoComplete="off"
                    label="Facebook"
                    margin="normal"
                    {...register("facebook")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FiltroRubros
                    label="Rubros"
                    sx={{ width: "100%" }}
                    rubros={rubros}
                    setRubros={setRubros}
                    seleccionado={false}
                  />
                  <TextField
                    fullWidth
                    required
                    name="descripcion"
                    type={"text"}
                    placeholder="Descripcion"
                    autoComplete="off"
                    label="Descripcion"
                    multiline
                    rows={3}
                    margin="normal"
                    {...register("descripcion", {
                      required: true,
                      minLength: 2,
                      maxLength: 700,
                    })}
                    error={!!errors.descripcion}
                    helperText={
                      errors.descripcion?.type === "required"
                        ? "Campo obligatorio"
                        : errors.descripcion?.type === "minLength"
                        ? "Mínimo 2 caracteres"
                        : errors.descripcion?.type === "maxLength"
                        ? "Máximo 700 caracteres"
                        : ""
                    }
                  />
                </Grid>
              </Grid>
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
                      <IconButton onClick={togglePasswordVisibility} edge="end">
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
                      <IconButton onClick={togglePasswordVisibility} edge="end">
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
