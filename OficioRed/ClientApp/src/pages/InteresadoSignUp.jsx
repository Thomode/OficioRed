import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";
import logo from "../assets/Logo1_Recorte.png";

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#1B325F",
  textAlign: "center",
  marginBottom: "20px",
};

export const InteresadoSignUp = ({ setAcceso }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    const res = await interesadoService.registerInteresado(
      data.nombre,
      data.apellido,
      data.email
    );

    const res2 = await interesadoService.imageUpload(selectedFile);

    navigate("/home");
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
            <Grid container justify="center">
              <img src={logo} width={350} alt="logo" />
            </Grid>
            <Typography style={titleStyle}>Registro como Interesado</Typography>
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
              type="file"
              name="fotoPerfil"
              label="Foto de Perfil"
              margin="normal"
              onChange={fileSelectedHandler}
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
