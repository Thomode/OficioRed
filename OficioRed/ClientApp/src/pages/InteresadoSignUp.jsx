import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";

export const InteresadoSignUp = ({ setAcceso }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Convierte la imagen de perfil a base64 si se ha seleccionado
    if (data.fotoPerfil) {
      data.fotoPerfil = await convertImageToBase64(data.fotoPerfil[0]);
    }

    const res = await interesadoService.registerInteresado(
      data.nombre,
      data.apellido,
      data.email
      //data.fotoPerfil,
    );
    navigate("/home");
  };

  const handleImageChange = (e) => {
    // Este código maneja la selección de la imagen y la muestra (opcional)
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log("Imagen seleccionada:", reader.result);
      };
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Grid container style={{ height: "85vh", justifyContent: "center" }}>
      <Grid
        container
        item
        xs={12}
        md={6}
        sm={3}
        alignItems="center"
        direction="column"
        justifyContent="space-between"
        style={{ padding: 10 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
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
            <Typography variant="h4" padding={3} textAlign="center">
              Registro como Interesado
            </Typography>
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
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
  );
};
