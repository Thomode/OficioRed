import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import imgOficioRed from "../assets/arregloHogar.jpeg";
import logo from "../assets/Logo1_Recorte.png";
import { AccountCircle, LockRounded } from "@mui/icons-material";

import { set, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import accesoService from "../services/acceso.service";

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await accesoService.register(data.usuario, data.password);
    // Muestro el status de la respuesta y el token por consola
    console.log(res.status);
    console.log("Token: " + res.data);

    // Guardar token en el localStorage usando useLocalStorage
    window.localStorage.setItem("token", res.data);
    // Muestro que se guardo correctamente
    alert("Se guardo el token correctamente");
  };

  const navigate = useNavigate();

  return (
    <>
      <Grid container style={{ height: "85vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src={imgOficioRed}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="ImagenOficioRed"
          />
        </Grid>
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

              <Typography variant="h4" padding={3} textAlign="center">
                Registrarse
              </Typography>

              <TextField
                fullWidth
                required
                name="usuario"
                type={"text"}
                placeholder="Usuario"
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
                {...register("usuario", { required: true })}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
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
                {...register("password", { required: true })}
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

              <div style={{ height: 20 }} />

              <Button
                endIcon={<LoginOutlinedIcon />}
                color="primary"
                variant="outlined"
                // Redirigir a la pagina de login
                onClick={() => {
                  navigate("/");
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
