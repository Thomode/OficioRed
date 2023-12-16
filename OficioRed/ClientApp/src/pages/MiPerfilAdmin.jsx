import React, { useEffect, useState } from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";
import { useSnackbar } from "notistack";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
import imagenDefault from "../assets/fotodefault.webp";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usuarioService } from "../services/usuario.service";

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

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "93vh",
  overFlow: "hidden",
};

export const MiPerfilAdmin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = usuarioService.getId();
        const userData = await usuarioService.get(userId);
        setValue("user", userData.data.user);
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await usuarioService.updateUser(data.idUsuario, data.user, data.password);

      navigate("/home");
      enqueueSnackbar("Actualizaci�n exitosa", {
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

  return (
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
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={800}
              minWidth={400}
              alignItems="center"
              justifyContent={"center"}
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
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="text"
                  style={{
                    color: "white",
                    marginRight: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#1b325f",
                  }}
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => handleClick()}
                >
                  Volver
                </Button>

                <Typography style={titleStyle}>Mi perfil</Typography>
                {image ? (
                  <img
                    src={image}
                    alt="Vista previa de la imagen"
                    style={imageStyle}
                    name="fotoPerfil"
                  />
                ) : (
                  <img
                    src={imagenDefault}
                    alt="Imagen por defecto"
                    style={imageStyle}
                  />
                )}
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="user"
                    disabled
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
                </Grid>
              </Grid>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
