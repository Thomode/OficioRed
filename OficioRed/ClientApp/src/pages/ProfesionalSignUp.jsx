import React, { useRef, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { profesionalService } from "../services/profesional.service";
import MultipleSelectCheckmarks from "../components/FiltroRubros";
import logo from "../assets/Logo1_Recorte.png";
import imagenDefault from "../assets/profile.png";

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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageRef = useRef(null);
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

  const onSubmit = async (data) => {
    const res = await profesionalService.registerProfesional(
      data.nombre,
      data.apellido,
      data.email,
      data.descripcion
    );
    const res2 = await profesionalService.imageUpload(selectedFile);
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
            <TextField
              fullWidth
              type="file"
              ref={imageRef}
              name="fotoPerfil"
              margin="normal"
              onChange={fileSelectedHandler}
            />
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

            <TextField
              fullWidth
              required
              name="descripcion"
              type={"text"}
              placeholder="Descripcion"
              autoComplete="off"
              label="Descripcion"
              margin="normal"
              {...register("descripcion", {
                required: true,
                minLength: 2,
                maxLength: 40,
              })}
              error={!!errors.descripcion}
              helperText={
                errors.descripcion?.type === "required"
                  ? "Campo obligatorio"
                  : errors.descripcion?.type === "minLength"
                  ? "Mínimo 2 caracteres"
                  : errors.descripcion?.type === "maxLength"
                  ? "Máximo 40 caracteres"
                  : ""
              }
            />

            <MultipleSelectCheckmarks />
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
