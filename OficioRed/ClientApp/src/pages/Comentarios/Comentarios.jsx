import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  CardMedia,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { comentarioService } from "../../services/comentario.service";
import { profesionalService } from "../../services/profesional.service";
import "./comentarios.css";
import { Comentario } from "../../components/Comentarios/Comentario";
import imagenFondo from "../../assets/fondo.jpg";
import Swal from "sweetalert2";
import AddCommentIcon from "@mui/icons-material/AddComment";

const titleStyle2 = {
  fontSize: "45px",
  fontWeight: "bold",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  WebkitTextStroke: "2px white",
  MozTextStroke: "2px white",
  marginBottom: "0px",
  padding: "10px",
  borderRadius: "10px",
  margin: "5px",
};

export function Comentarios() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profesional, setProfesional] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comentariosActualizados, setComentariosActualizados] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await profesionalService.getById(id);
        const response1 = await comentarioService.get(id);
        setProfesional(response.data);
        setComentarios(response1.data);
        setComentariosActualizados(false);
      } catch (error) {
        console.error("Error al obtener datos", error);
      }
    };

    fetchData();
  }, [id, comentariosActualizados]);

  const handleClick = () => {
    navigate(-1);
  };

  const crearComentario = async () => {
    try {
      await comentarioService.create(newComment, id);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Comentario creado",
        showConfirmButton: false,
        timer: 1500,
      });

      const response = await comentarioService.get(id);
      setComentarios(response.data);
      setComentariosActualizados(true);
      setNewComment("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data,
        confirmButtonColor: "#1b325f",
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      p={5}
      style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Grid container spacing={2} justify="center">
        <Grid
          xs={12}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: "20px 20px 0px 0px",
            padding: "5px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="text"
              style={{
                color: "white",
                backgroundColor: "#1b325f",
                margin: "20px",
                fontWeight: "bold",
              }}
              fontSize="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => handleClick()}
            >
              Volver
            </Button>
            <Typography variant="h2" sx={titleStyle2}>
              Comentarios
            </Typography>
            <div></div>
          </Box>
        </Grid>
        <Grid
          container
          justifyContent="center"
          spacing={0}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: "0px 0px 20px 20px",
          }}
        >
          {profesional && (
            <Grid item xs={12} md={4} style={{ padding: 10 }}>
              <CardMedia
                component="img"
                alt="profesional"
                height="560"
                image={profesional.fotoPerfil}
                style={{
                  border: "2px solid #1b325f",
                  borderRadius: "20px 20px 0 0",
                }}
              />
              <Box
                color="white"
                bgcolor="#1b325f"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="0px 0px 20px 20px"
              >
                <Typography
                  variant="h4"
                  style={{ textAlign: "center", fontSize: "2.5rem" }}
                >
                  {`${profesional.nombre} ${profesional.apellido}`}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={8}>
            <Box
              style={{
                padding: "50px",
                paddingTop: "0px",
                borderRadius: "8px",
                width: "100%",
                height: "700px",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <Box
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  margin: "5px",
                  borderRadius: "8px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <TextField
                  label="Nuevo comentario"
                  multiline
                  rows={4}
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                  style={{ margin: "5px" }}
                />

                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "5px",
                  }}
                >
                  <Button
                    variant="text"
                    style={{
                      color: "white",
                      backgroundColor: "#d33",
                      fontWeight: "bold",
                      fontSize: "15px",
                      margin: "2px",
                    }}
                    size="small"
                    onClick={() => setNewComment("")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="text"
                    style={{
                      color: "white",
                      backgroundColor: "#1b325f",
                      fontWeight: "bold",
                      fontSize: "15px",
                      margin: "2px",
                    }}
                    size="small"
                    startIcon={<AddCommentIcon />}
                    onClick={crearComentario}
                  >
                    Comentar
                  </Button>
                </Box>
              </Box>
              <Box
                style={{
                  margin: "5px",
                  borderRadius: "8px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  alignItems: "stretch",
                }}
              >
            {comentarios && comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                    <Comentario
                        key={comentario.idComentario}
                        idComentario={comentario.idComentario}
                        idUser={comentario.idUsuario}
                        comentario={comentario.comentario1}
                        fecha={comentario.fhalta}
                        nombre={comentario.nombre}
                        apellido={comentario.apellido}
                        fotoPerfil={comentario.fotoPerfil}
                        onUpdate={() => setComentariosActualizados(true)}
                    />
                ))
            ) : (
                <Typography variant="body1" style={{ margin: "10px", textAlign: "center", fontWeight: "Bold"}}>
                    No hay comentarios sobre este profesional.
                </Typography>
            )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
