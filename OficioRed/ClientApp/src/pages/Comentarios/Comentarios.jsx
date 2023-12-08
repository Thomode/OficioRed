import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Grid,
    Paper,
    CardMedia,
    Rating,
    Box,
    Button,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { comentarioService } from "../../services/comentario.service";
import { profesionalService } from "../../services/profesional.service"; 
import "./comentarios.css";
import { Comentario } from "../../components/Comentarios/Comentario";
import imagenFondo from "../../assets/fondo.jpg";

const styles = {
  container: {
    padding: "16px",
    marginBottom: "16px",
  },
  stars: {
    marginBottom: "16px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginBottom: "8px",
    marginTop: "8px",
    border: "1px solid rgb(107, 114, 12)",
    padding: "8px",
    resize: "none",
  },
};

const titleStyle2 = {
  fontSize: "60px",
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
    const [value, setValue] = useState(0);
    const { id } = useParams();
    const [profesional, setProfesional] = useState(null);
    const [comentarios, setComentarios] = useState(null);

    const handleVolver = async () => {
        navigate(-1);
    };

    useEffect(() => {
        // Obtener datos del profesional por su ID
        const fetchData = async () => {
            try {
                const response = await profesionalService.getById(id);
                const response1 = await comentarioService.get(id)
                setProfesional(response.data);
                setComentarios(response1.data);
                console.log(response1.data)
            } catch (error) {
                console.error("Error al obtener datos", error);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Box
            minHeight="100vh"
            p={5}
            style={{
                backgroundImage: `url(${imagenFondo})`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
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
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "10px",
                            borderRadius: "8px",
                            width: "100%",
                            height: "650px", 
                            overflowY: "auto", 
                        }}
                    >
                        {comentarios &&
                            comentarios.map((comentario) => (
                                <Comentario
                                    key={comentario.id}
                                    idUser={comentario.idUsuario}
                                    comentario={comentario.comentario1}
                                    fecha={comentario.fhalta}
                                />
                            ))}
                    </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}