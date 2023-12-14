import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-oficiored.png";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { rolService } from "../services/rol.service";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  minHeight: "100vh",
};

export const SignupPage = ({ setAcceso }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRolId, setSelectedRolId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleClickSignUp = () => {
    setLoadingSignUp(true);
    setTimeout(() => {
      setLoadingSignUp(false);
    }, 1500);
  };

  const cargarRoles = async () => {
    const data = await rolService.getAll();
    setRoles(data.data);
  };
  useEffect(() => {
    cargarRoles();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      const res = await accesoService.register(
        data.user,
        data.password,
        data.idRol
      );

      if (res.status === 200) {
        const res2 = await accesoService.login(data.user, data.password);
        window.localStorage.setItem("acceso", JSON.stringify(res2.data));
        setAcceso(res2.data);

        if (res2.data.idRol === 2) {
          navigate("/profesionalSignup", { replace: true });
        }
        if (res2.data.idRol === 3) {
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
              maxWidth: "450px",
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
                textAlign: "center",
              }}
            >
              Crea una cuenta en <br />
              OficioRed
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
                name="user"
                label="Nombre de usuario"
                variant="outlined"
                autoComplete="none"
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
                label="Contraseña"
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
                label="Confirmar Contraseña"
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
              <FormControl fullWidth>
                <InputLabel id="idRol">
                  Selecciona el Tipo de Usuario
                </InputLabel>
                <Select
                  fullWidth
                  label="Selecciona el Tipo de Usuario"
                  name="idRol"
                  id="idRol"
                  value={selectedRolId || ""}
                  {...register("idRol", {
                    required: true,
                  })}
                  onChange={(e) => setSelectedRolId(e.target.value)}
                >
                  {roles
                    .filter((e) => e.idRol !== 1)
                    .map((e) => (
                      <MenuItem key={e.idRol} value={e.idRol}>
                        {e.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Box>
                {selectedRolId === 2 && (
                  <Typography
                    style={{
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "#1b325f",
                      textAlign: "justify",
                    }}
                  >
                    Como profesional usted tendrá que cargar una mayor cantidad
                    de datos como foto, número de teléfono, email, redes
                    sociales, descripción, rubros de servicios a los que se
                    dedica,etc. Dicha información va a ser visible para el resto
                    de las personas, quienes podrán contactarlo. A su vez, será
                    capaz de ver al resto de profesionales, como así también
                    poder contactarlos, consumir sus servicios y valorarlos.
                  </Typography>
                )}
                {selectedRolId === 3 && (
                  <Typography
                    style={{
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "#1b325f",
                      textAlign: "justify",
                    }}
                  >
                    Como interesado usted únicamente deberá ingresar nombre,
                    apellido, email y una foto. Será capaz de ver a todos los
                    profesionales cargados en el sistema, realizar una búsqueda
                    de acuerdo a sus necesidades, poder contactarlos, consumir
                    sus servicios y valorarlos.
                  </Typography>
                )}
              </Box>
              <LoadingButton
                fullWidth
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={<HowToRegOutlinedIcon />}
                variant="contained"
              >
                CREAR CUENTA
              </LoadingButton>
              <LoadingButton
                href="/"
                loading={loadingSignUp}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                variant="outlined"
                onClick={handleClickSignUp}
              >
                INICIO DE SESIÓN
              </LoadingButton>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};
