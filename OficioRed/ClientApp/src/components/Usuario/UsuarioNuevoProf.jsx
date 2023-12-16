import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo-oficiored.png";
import imagenDefault from "../../assets/profile.png";
import backgroundImage from "../../assets/armarios-formas-geometricas.jpg";
import { useSnackbar } from "notistack";
import { Button, TextField, Typography, Paper, Grid } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { FiltroRubros } from "../FiltroRubrosSignUp";
import { profesionalService } from "../../services/profesional.service";

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
  minHeight: "100vh",
};

export const UsuarioNuevoProf = () => {
  const [image, setImage] = useState("");
  const [rubros, setRubros] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    console.log(data);

    try {
      const res = await profesionalService.registerProfesional(
        data.nombre,
        data.apellido,
        data.email,
        data.descripcion
      );
      const resContact = await profesionalService.registerContacto(
        data.telefono,
        data.email,
        data.instagram,
        data.facebook
      );
      const res2 = await profesionalService.imageUpload(selectedFile);

      rubros.forEach(async (rubro) => {
        if (rubro.seleccionado) {
          const res3 = await profesionalService.asociarRubro(rubro.idRubro);
        }
      });

      enqueueSnackbar("Registro exitoso", {
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
              Registro como <br />
              Profesional
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
                    Elegir Foto de Perfil
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
                    autoComplete="none"
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
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    name="apellido"
                    label="Apellido"
                    variant="outlined"
                    autoComplete="none"
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    name="email"
                    label="Email"
                    variant="outlined"
                    autoComplete="none"
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
                    autoComplete="none"
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
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="instagram"
                    label="Instagram"
                    variant="outlined"
                    autoComplete="none"
                    {...register("instagram")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="facebook"
                    label="Facebook"
                    variant="outlined"
                    autoComplete="none"
                    {...register("facebook")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FiltroRubros
                    fullWidth
                    label="Rubros"
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
                    autoComplete="none"
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
                    REGISTRARSE
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
