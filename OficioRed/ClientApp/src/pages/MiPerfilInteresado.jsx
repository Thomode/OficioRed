import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";
import { usuarioService } from "../services/usuario.service";
import { useSnackbar } from "notistack";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
import imagenDefault from "../assets/profile.png";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LoadingButton from "@mui/lab/LoadingButton";

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
  minHeight: "93vh",
};

export const MiPerfilInteresado = () => {
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleClick = () => {
    navigate(-1);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = usuarioService.getId();
        const userData = await usuarioService.get(userId);
        const idUser = userData.data.idUsuario;
        const interesadoData = await interesadoService
          .getAll()
          .then((res) =>
            res.find((interesado) => interesado.idUsuario === idUser)
          );
        console.log("interesadoData", interesadoData);
        setValue("nombre", interesadoData.nombre);
        setValue("apellido", interesadoData.apellido);
        setValue("email", interesadoData.email);
        setValue("fotoPerfil", interesadoData.fotoPerfil);
        setImage(interesadoData.fotoPerfil);
        setTimeout(() => {
          setShowLoading(false);
        }, 100);
      } catch (error) {
        console.log("Error al obtener los datos", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      if (selectedFile) {
        await interesadoService.imageUpload(selectedFile);
      }
      await interesadoService.updateInteresado(
        data.nombre,
        data.apellido,
        data.email
      );

      navigate("/home");

      enqueueSnackbar("Actualización exitosa", {
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
    <div
      style={{
        ...backgroundStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showLoading && (
        <CircularProgress style={{ position: "absolute", top: "50%" }} />
      )}
      {!showLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            placeItems: "center",
            height: "100%",
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
                borderRadius: "20px",
                width: "auto",
                margin: "20px",
              }}
            >
              <Button
                style={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#1b325f",
                }}
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => handleClick()}
              >
                Volver
              </Button>

              <Typography
                style={{
                  fontSize: "2.3rem",
                  fontWeight: "bold",
                  color: "#1B325F",
                  marginBottom: "20px",
                }}
              >
                Editar Mi Perfil
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  placeItems: "center",
                  gap: "15px",
                  minWidth: "200px",
                }}
              >
                <Grid container spacing={2} style={{ maxWidth: "450px" }}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      placeItems: "center",
                    }}
                  >
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
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      Cambiar Foto de Perfil
                      <input
                        type="file"
                        style={{ display: "none", color: "black" }}
                        onChange={fileSelectedHandler}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="nombre"
                      label="Nombre"
                      variant="outlined"
                      {...register("nombre", {
                        required: true,
                        minLength: 2,
                        maxLength: 20,
                        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
                      })}
                      error={!!errors.nombre}
                      helperText={
                        errors.nombre?.type === "required"
                          ? "Campo obligatorio"
                          : errors.nombre?.type === "minLength"
                          ? "Mínimo 2 caracteres"
                          : errors.nombre?.type === "maxLength"
                          ? "Máximo 20 caracteres"
                          : errors.apellido?.type === "pattern"
                          ? "Solo se permiten letras y espacios"
                          : ""
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="apellido"
                      label="Apellido"
                      variant="outlined"
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
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      name="email"
                      label="Email"
                      variant="outlined"
                      placeholder="example@email.com"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
                      })}
                      error={!!errors.email}
                      helperText={
                        errors.email?.type === "required"
                          ? "Campo obligatorio"
                          : errors.email?.type === "pattern"
                          ? "Coloque un email válido"
                          : ""
                      }
                      InputLabelProps={{ shrink: true }}
                    />

                    <LoadingButton
                      fullWidth
                      type="submit"
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<HowToRegOutlinedIcon />}
                      variant="contained"
                      style={{ marginTop: "15px" }}
                    >
                      GUARDAR CAMBIOS
                    </LoadingButton>
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </form>
        </div>
      )}
    </div>
  );
};
