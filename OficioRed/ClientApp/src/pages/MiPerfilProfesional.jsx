import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
import imagenDefault from "../assets/profile.png";
import { useSnackbar } from "notistack";

import { usuarioService } from "../services/usuario.service";
import { profesionalService } from "../services/profesional.service";
import { contactoService } from "../services/contacto.service";

import {
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { FiltroRubros } from "../components/FiltroRubroProfMiPerfil";

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

export const MiPerfilProfesional = () => {
  const [profesional, setProfesional] = useState({});
  const [rubros, setRubros] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
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
        const profesionalData = await profesionalService.getByIdUsuario(idUser);
        const contactoData = await contactoService.getById(
          profesionalData.idContacto
        );
        setProfesional(profesionalData);
        setValue("nombre", profesionalData.nombre);
        setValue("apellido", profesionalData.apellido);
        setValue("email", profesionalData.email);

        setValue("descripcion", profesionalData.descripcion);
        setValue("user", userData.data.user);
        setValue("fotoPerfil", profesionalData.fotoPerfil);
        setImage(profesionalData.fotoPerfil);
        setValue("telefono", contactoData.data.telefono);
        setValue("instagram", contactoData.data.instagram);
        setValue("facebook", contactoData.data.facebook);
        setProfesional(profesionalData);
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

      await profesionalService.desasociarRubrosProfesional(
        profesional.idProfesional
      );

      if (selectedFile) {
        await profesionalService.imageUpload(selectedFile);
      }
      await profesionalService.updateProfesional(
        data.nombre,
        data.apellido,
        data.email,
        data.descripcion
      );
      await contactoService.updateContacto(
        profesional.idContacto,
        data.telefono,
        data.email,
        data.instagram,
        data.facebook
      );

      rubros.forEach(async (rubro) => {
        if (rubro.seleccionado) {
          const res3 = await profesionalService.asociarRubro(rubro.idRubro);
        }
      });

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
              <Grid container spacing={2} style={{ maxWidth: "650px" }}>
                <Grid
                  item
                  xs={12}
                  md={6}
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
                <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid container spacing={2} style={{ maxWidth: "650px" }}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    name="email"
                    label="Email"
                    variant="outlined"
                    placeholder="example@email.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    name="telefono"
                    label="Telefono"
                    variant="outlined"
                    type="tel"
                    {...register("telefono", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                    error={!!errors.telefono}
                    helperText={
                      errors.telefono?.type === "required"
                        ? "Campo obligatorio"
                        : errors.telefono?.type === "pattern"
                        ? "Ingrese un número de teléfono válido"
                        : ""
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="instagram"
                    label="Instagram"
                    variant="outlined"
                    {...register("instagram")}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="facebook"
                    label="Facebook"
                    variant="outlined"
                    {...register("facebook")}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    minHeight="50px"
                  >
                    {profesional.rubros &&
                      profesional.rubros.map((rubro, index) => (
                        <Chip
                          key={index}
                          variant="elevated"
                          label={`${rubro.nombre} `}
                          style={{
                            backgroundColor: "#1b325f",
                            color: "white",
                            margin: "2px",
                          }}
                        />
                      ))}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FiltroRubros
                    fullWidth
                    label="Rubros"
                    profesional={profesional}
                    rubros={rubros}
                    setRubros={setRubros}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    multiline
                    rows={3}
                    {...register("descripcion", {
                      required: true,
                      minLength: 2,
                      maxLength: 700,
                    })}
                    error={!!errors.descripcion}
                    helperText={
                      errors.descripcion?.type === "required"
                        ? "Campo obligatorio"
                        : errors.descripcion?.type === "minLength"
                        ? "Mínimo 2 caracteres"
                        : errors.descripcion?.type === "maxLength"
                        ? "Máximo 700 caracteres"
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
    </div>
  );
};
