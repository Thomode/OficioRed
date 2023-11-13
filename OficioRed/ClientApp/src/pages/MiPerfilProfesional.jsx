import React, { useEffect, useState } from "react";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { interesadoService } from "../services/interesado.service";
import { useSnackbar } from "notistack";
import backgroundImage from "../assets/armarios-formas-geometricas.jpg";
import imagenDefault from "../assets/profile.png";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { LockRounded } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usuarioService } from "../services/usuario.service";
import { profesionalService } from "../services/profesional.service";
import { FiltroRubros } from "../components/FiltroRubrosSignUp";
import { contactoService } from "../services/contacto.service";

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

export const MiPerfilProfesional = () => {
  const [rubros, setRubros] = useState([]);
  const [usuarioData, setUsuarioData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    instagram: "",
    facebook: "",
    descripcion: "",
    fotoPerfil: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = usuarioService.getId();
        const userData = await usuarioService.get(userId);
        const idUser = userData.data.idUsuario;
        const profesionalData = await profesionalService
          .getAll()
          .then((res) =>
            res.find((profesional) => profesional.idUsuario === idUser)
          );
        const contactoData = await contactoService.getById(
          profesionalData.idContacto
        );
        setValue("nombre", profesionalData.nombre);
        setValue("apellido", profesionalData.apellido);
        setValue("email", profesionalData.email);
        setValue("descripcion", profesionalData.descripcion);
        setValue("fotoPerfil", profesionalData.fotoPerfil);
        setImage(profesionalData.fotoPerfil);
        setValue("telefono", contactoData.data.telefono);
        setValue("instagram", contactoData.data.instagram);
        setValue("facebook", contactoData.data.facebook);
      } catch (error) {
        console.log("Error al obtener los datos", error);
        setErrorMessage("Error al obtener los datos");
      }
    };

    fetchData();
  }, [setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await profesionalService.updateProfesional(
        data.nombre,
        data.apellido,
        data.email,
        data.descripcion,
        data.fotoPerfil
      );
      await usuarioService.updateUser(data.id, data.user, data.password);
      await contactoService.updateContacto(
        data.id,
        data.telefono,
        data.instagram,
        data.facebook
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
    <div style={backgroundStyle}>
      <Grid container style={{ justifyContent: "center" }}>
        <Grid
          container
          item
          xs={12}
          md={9}
          sm={3}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection={"column"}
              maxWidth={1500}
              minWidth={300}
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

                <Typography style={titleStyle}>Editar mi perfil</Typography>
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
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  style={{ marginTop: "10px" }}
                >
                  Cambiar Foto de Perfil
                  <input
                    type="file"
                    style={{ display: "none", color: "black" }}
                    onChange={fileSelectedHandler}
                    name="fotoPerfil"
                  />
                </Button>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    name="nombre"
                    type={"text"}
                    placeholder="Nombre"
                    autoComplete="off"
                    margin="normal"
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
                  <TextField
                    fullWidth
                    required
                    name="apellido"
                    type={"text"}
                    placeholder="Apellido"
                    autoComplete="off"
                    margin="normal"
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
                    type={"email"}
                    placeholder="example@email.com"
                    autoComplete="off"
                    margin="normal"
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
                  <TextField
                    fullWidth
                    required
                    placeholder="Nueva Contraseña"
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    label="Nueva Contraseña"
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
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    name="telefono"
                    type="tel"
                    placeholder="Teléfono"
                    autoComplete="off"
                    margin="normal"
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
                  <TextField
                    fullWidth
                    name="instagram"
                    type="text"
                    placeholder="Instagram"
                    autoComplete="off"
                    margin="normal"
                    {...register("instagram")}
                  />
                  <TextField
                    fullWidth
                    name="facebook"
                    type="text"
                    placeholder="Facebook"
                    autoComplete="off"
                    margin="normal"
                    {...register("facebook")}
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
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    name="descripcion"
                    type={"text"}
                    placeholder="Descripcion"
                    autoComplete="off"
                    multiline
                    rows={11}
                    margin="normal"
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
                </Grid>
                <Grid item xs={12}>
                  <Box mb={2}>
                    <Divider style={{ color: "black" }} />

                    <Typography
                      variant="h6"
                      style={{
                        color: "#1B325F",
                        position: "absolute",
                        left: "53%",
                      }}
                    >
                      Rubros
                    </Typography>
                  </Box>

                  <FiltroRubros
                    sx={{ width: "100%" }}
                    rubros={rubros}
                    setRubros={setRubros}
                    seleccionado={false}
                  />
                </Grid>
              </Grid>

              <Button
                margin="normal"
                endIcon={<HowToRegOutlinedIcon />}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                marginTop={"20px"}
              >
                Guardar cambios
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
