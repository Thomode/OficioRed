import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import fondoInicio from "../../assets/arregloHogar.jpeg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const backgroundImage = fondoInicio;

const containerStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundColor: "#7fc7d9",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  minHeight: "1000px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const overlayStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  padding: "20px",
  borderRadius: "20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mb: "80px",
};

const buttonStyle = {
  marginTop: "16px",
  backgroundColor: "#1b325f",
  color: "white",
};

const titleStyle = {
  fontSize: "100px",
  fontWeight: "bold",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  WebkitTextStroke: "2px white",
  MozTextStroke: "2px white",
};

const contentStyle = {
  textAlign: "center",
  color: "#1b325f",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

const arrowDownStyle = {
  fontSize: "6em",
  animation: "bounce 2s infinite",
};

export default function ProductHero() {
  const navigate = useNavigate();
  return (
    <Paper style={containerStyle}>
      <Container maxWidth="md">
        <Box sx={overlayStyle}>
          <Typography variant="h2" sx={titleStyle}>
            OFICIORED
          </Typography>
          <Typography variant="h5" sx={contentStyle}>
            Encuentra el servicio que buscas
          </Typography>
          <Button
            variant="outlined"
            size="large"
            style={buttonStyle}
            onClick={() => navigate(`/profesionales`)}
          >
            COMIENZA LA BÚSQUEDA
          </Button>
        </Box>
      </Container>
      <KeyboardDoubleArrowDownIcon
        style={arrowDownStyle}
      ></KeyboardDoubleArrowDownIcon>
    </Paper>
  );
}
