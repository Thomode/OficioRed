import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-oficiored.png";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { accesoService } from "../services/acceso.service";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  minHeight: "100vh",
};

export const LoginPage = ({ setAcceso }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickSignUp = () => {
    setLoadingSignUp(true);
    setTimeout(() => {
      setLoadingSignUp(false);
    }, 1500);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      const res = await accesoService.login(data.usuario, data.password);
      setUsuarioEncontrado(true);

      window.localStorage.setItem("acceso", JSON.stringify(res.data));
      setAcceso(res.data);

      if (res.data.idRol === 1) {
        navigate("/admin/home", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
      enqueueSnackbar("Bienvenido a OficioRed!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 2000,
      });
    } catch (error) {
      setUsuarioEncontrado(false);
      console.log(error.response.data);
      enqueueSnackbar(error.response.data, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        autoHideDuration: 4000,
      });
    }
  };

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
              padding: "20px",
              maxWidth: "600px",
              borderRadius: "20px",
            }}
          >
            <img src={logo} width={250} alt="logo-app" />
            <Typography
              style={{
                fontSize: "2.3rem",
                fontWeight: "bold",
                color: "#1B325F",
                marginBottom: "20px",
              }}
            >
              Iniciar Sesión
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                placeItems: "center",
                gap: "15px",
                minWidth: "350px",
              }}
            >
              <TextField
                fullWidth
                required
                name="usuario"
                label="Ingresa tu usuario"
                variant="outlined"
                autoComplete="none"
                {...register("usuario", {
                  required: true,
                  minLength: 2,
                  maxLength: 15,
                  usuarioEncontrado: false,
                })}
                error={!!errors.usuario}
                helperText={
                  errors.usuario?.type === "required" ? (
                    "Campo obligatorio"
                  ) : errors.usuario?.type === "minLength" ? (
                    "Mínimo 2 caracteres"
                  ) : errors.usuario?.type === "maxLength" ? (
                    "Máximo 15 caracteres"
                  ) : usuarioEncontrado ? (
                    <span style={{ color: "red" }}>Usuario no encontrado</span>
                  ) : (
                    ""
                  )
                }
              />
              <TextField
                fullWidth
                required
                name="password"
                label="Ingresa tu contraseña"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                InputProps={{
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
                  minLength: 4,
                  maxLength: 15,
                })}
                error={!!errors.password}
                helperText={
                  errors.password?.type === "required"
                    ? "Campo obligatorio"
                    : errors.password?.type === "minLength"
                    ? "Mínimo 4 caracteres"
                    : errors.password?.type === "maxLength"
                    ? "Máximo 15 caracteres"
                    : ""
                }
              />
              <LoadingButton
                fullWidth
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                variant="contained"
              >
                INICIAR SESIÓN
              </LoadingButton>
             
              <LoadingButton
                href="/signup"
                loading={loadingSignUp}
                loadingPosition="start"
                startIcon={<HowToRegOutlinedIcon />}
                variant="outlined"
                onClick={handleClickSignUp}
              >
                CREAR CUENTA
              </LoadingButton>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};
