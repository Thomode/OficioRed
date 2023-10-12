import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { AccountCircle, LockRounded } from "@mui/icons-material";

import imgOficioRed from "../assets/arregloHogar.jpeg";
import logo from "../assets/Logo1_Recorte.png";
import accesoService from "../services/acceso.service";
import { useUser } from "../auth/useUser";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLogged } = useUser();
  useEffect(() => {
    if (isLogged) navigate("/home");
  }, [isLogged, navigate]);

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
    const res = await accesoService.login(data.usuario, data.password);

    // Muestro el status de la respuesta y el token por consola
    console.log(res.status);
    console.log("Token: " + res.data);

    // Guardar token en el localStorage usando useLocalStorage
    window.localStorage.setItem("token", res.data);
    // Muestro que se guardo correctamente
    alert("Se guardo el token correctamente");
  };

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
              {/*--------------- IMAGEN LOGO ---------------*/}
              <Grid container justify="center">
                <img src={logo} width={350} alt="logo" />
              </Grid>

              {/*--------------- TÍTULO ---------------*/}
              <Typography variant="h4" padding={3} textAlign="center">
                Iniciar Sesión
              </Typography>

              {/*--------------- Campo USUARIO ---------------*/}
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

              {/*--------------- Campo CONTRASEÑA ---------------*/}
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

              {/*--------------- Checkbox para recordar credenciales ---------------*/}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Recordar credenciales"
              />

              <div style={{ height: 20 }} />

              {/*--------------- Botón Iniciar Sesión ---------------*/}
              <Button
                endIcon={<LoginOutlinedIcon />}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Iniciar Sesión
              </Button>

              <div style={{ height: 20 }} />

              {/*---------- Link si olvidó la contraseña ----------*/}
              <Typography marginBottom={2}>
                <Link href="#">Olvidaste tu contraseña?</Link>
              </Typography>

              {/*--------------- Botón Registrarse ---------------*/}
              <Button
                endIcon={<HowToRegOutlinedIcon />}
                color="primary"
                variant="outlined"
                // Redirigir a la pagina de registro
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Registrarse
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
