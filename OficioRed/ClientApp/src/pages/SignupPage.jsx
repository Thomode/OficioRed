import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import logo from "../assets/Logo1_Recorte.png";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { rolService } from "../services/rol.service";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import accesoService from "../services/acceso.service";

const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1B325F',
    textAlign: 'center',
    marginBottom: '20px',
};

export const SignupPage = ({ setAcceso }) => {
  const [showPassword, setShowPassword] = useState(false);

  // useEffect para guardar los estados
  const [roles, setRoles] = useState([]);

  // Hook para obtener los roles
  const cargarRoles = async () => {
    const data = await rolService.getAll();
    setRoles(data.data);
  };

  // Hook useEffect para cargar los roles
  useEffect(() => {
    cargarRoles();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();
  // Hook useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await accesoService.register(
      data.user,
      data.password,
      data.idRol
    );

    if (res.status === 200) {
      const res2 = await accesoService.login(data.user, data.password);
      window.localStorage.setItem("acceso", JSON.stringify(res2.data));
      setAcceso(res2.data);

      console.log(res2.data.idRol);
      if (res2.data.idRol === 3) {
        navigate("/profesionalSignup", { replace: true });
      }
      if (res2.data.idRol === 4) {
        navigate("/interesadoSignup", { replace: true });
      }
    }
  };

  return (
    <>
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
                    Registrarse
                </Typography>

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
                error={!!errors.password} // Agregar la propiedad 'error' para resaltar el campo en caso de error
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

              <Box sx={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Usuario
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Tipo de Usuario"
                    name="idRol"
                    {...register("idRol", {
                      required: true,
                    })}
                  >
                    {roles
                      .filter((e) => e.idRol !== 2)
                      .map((e) => (
                        <MenuItem value={e.idRol}>{e.nombre}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>

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
                  navigate("/login");
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
