import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo-oficiored.png";
import imagenDefault from "../../assets/profile.png";
import backgroundImage from "../../assets/armarios-formas-geometricas.jpg";
import { useSnackbar } from "notistack";
import { interesadoService } from "../../services/interesado.service";
import { Button, TextField, Typography, Paper } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LoadingButton from "@mui/lab/LoadingButton";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #1b325f",
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

export const UsuarioNuevoInt = () => {
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };

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
      const res = await interesadoService.registerInteresado(
        data.nombre,
        data.apellido,
        data.email
      );
      const res2 = await interesadoService.imageUpload(selectedFile);

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
                textAlign: "center",
              }}
            >
              Registro como <br />
              Interesado
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

              <Button variant="outlined" component="label" fullWidth>
                Elegir Foto de Perfil
                <input
                  type="file"
                  style={{ display: "none", color: "black" }}
                  onChange={fileSelectedHandler}
                />
              </Button>

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
                  maxLength: 15,
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/,
                })}
                error={!!errors.nombre}
                helperText={
                  errors.nombre?.type === "required"
                    ? "Campo obligatorio"
                    : errors.nombre?.type === "minLength"
                    ? "Mínimo 2 caracteres"
                    : errors.nombre?.type === "maxLength"
                    ? "Máximo 15 caracteres"
                    : errors.apellido?.type === "pattern"
                    ? "Solo se permiten letras y espacios"
                    : ""
                }
              />
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

              <LoadingButton
                fullWidth
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={<HowToRegOutlinedIcon />}
                variant="contained"
              >
                REGISTRARSE
              </LoadingButton>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};
