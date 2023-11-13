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
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";

import { useEffect, useState } from "react";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import logo from "../assets/Logo1_Recorte.png";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { rolService } from "../services/rol.service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import accesoService from "../services/acceso.service";

import { useSnackbar } from "notistack";

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#1B325F",
  textAlign: "center",
  marginBottom: "20px",
};

export const SignupPage = ({ setAcceso }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState([]);

  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const cargarRoles = async () => {
    const data = await rolService.getAll();
    setRoles(data.data);
  };

  useEffect(() => {
    cargarRoles();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data) => {
    try {
      const res = await accesoService.register(
        data.user,
        data.password,
        data.idRol
      );

      if (res.status === 200) {
        const res2 = await accesoService.login(data.user, data.password);
        window.localStorage.setItem("acceso", JSON.stringify(res2.data));
        setAcceso(res2.data);

        if (res2.data.idRol === 3) {
          navigate("/profesionalSignup", { replace: true });
        }
        if (res2.data.idRol === 4) {
          navigate("/interesadoSignup", { replace: true });
        }
        enqueueSnackbar("Registro exitoso", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 2000,
        });
      }
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
    <>
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

                <Typography style={titleStyle}>Registrarse</Typography>

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

                <Box sx={{ width: "100%" }} marginBottom={2} marginTop={2}>
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
                      onChange={(e) => setSelectedRoleId(e.target.value)}
                    >
                      {roles
                        .filter((e) => e.idRol !== 2)
                        .map((e) => (
                          <MenuItem key={e.idRol} value={e.idRol}>
                            {e.nombre}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Box marginTop={2}>
                    {selectedRoleId === 3 && (
                      <Typography
                        style={{
                          fontStyle: "italic",
                          fontWeight: "bold",
                          marginTop: "10px",
                          color: "#1b325f",
                        }}
                      >
                        Como profesional usted tendrá que cargar una mayor
                        cantidad de datos como foto, número de teléfono, email,
                        redes sociales, descripción, rubros de servicios a los
                        que se dedica,etc. Dicha información va a ser visible
                        para el resto de las personas, quiénes podrán contactarte.
                        A su vez, usted será capaz de ver al resto de
                        profesionales.
                      </Typography>
                    )}
                    {selectedRoleId === 4 && (
                      <Typography
                        style={{
                          fontStyle: "italic",
                          fontWeight: "bold",
                          marginTop: "10px",
                          color: "#1b325f",
                        }}
                      >
                        Como interesado usted únicamente deberá ingresar nombre,
                        apellido, email y una foto. Será capaz de ver a
                        todos los profesionales cargados en el sistema y
                        realizar una búsqueda de acuerdo a sus necesidades.
                      </Typography>
                    )}
                  </Box>
                </Box>

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
      </div>
    </>
  );
};
