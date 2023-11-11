import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { profesionalService } from "../services/profesional.service";
import { FiltroRubros } from "../components/FiltroRubros";
import logo from "../assets/Logo1_Recorte.png";
import imagenDefault from "../assets/profile.png";
import { useSnackbar } from "notistack";

import backgroundImage from "../assets/armarios-formas-geometricas.jpg";

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

export const ProfesionalSignUp = ({ setAcceso }) => {
  const [rubros, setRubros] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");

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

  const [selectedFile, setSelectedFile] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    try {
      const res = await profesionalService.registerProfesional(
        data.nombre,
        data.apellido,
        data.email,
        data.descripcion
      );
      const resContact = await profesionalService.registerContacto(
        data.telefono,
        data.email,
        data.instagram,
        data.facebook
      );
      const res2 = await profesionalService.imageUpload(selectedFile);

      rubros.forEach(async (rubro) => {
        if (rubro.seleccionado) {
          const res3 = await profesionalService.asociarRubro(rubro.idRubro);
        }
      });

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

  useEffect(() => {
    console.log("Rubros actualizados:", rubros);
  }, [rubros]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={backgroundStyle}>
      <Grid
        container
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          alignItems="center"
          justifyContent="center"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={800}
              minWidth={300}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={5}
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
              <Grid container justify="center" justifyContent="center">
                <img src={logo} width={350} alt="logo" />
              </Grid>
              <Typography style={titleStyle}>
                Registro como Profesional
              </Typography>

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
                Elegir Foto de Perfil
                <input
                  type="file"
                  style={{ display: "none", color: "black" }}
                  onChange={fileSelectedHandler}
                  name="fotoPerfil"
                />
              </Button>
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
                      pattern: /^[0-9]{10}$/, // Asumiendo que el teléfono tiene 10 dígitos
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

              <div style={{ height: 20 }} />
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Registrarse
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
