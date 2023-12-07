import { Box, Grid, Container, Button, Typography } from "@mui/material";
import ImagenIngreso from "../../assets/ingreso.png";
import ImagenBusquedayComparacion from "../../assets/busquedaycomparacion.png";
import ImagenContactar from "../../assets/contactar.png";
import { useNavigate } from "react-router-dom";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const image = {
  height: 100,
  my: 4,
};

export function ProductHowItWorks() {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        bgcolor: "#9cc4e4",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          mt: 5,
          mb: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 5 }}>
          ¿Cómo funcionamos?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  sx={{ color: "black", fontSize: "24px", fontWeight: "bold" }}
                >
                  1.
                </Box>
                <Box
                  component="img"
                  src={ImagenIngreso}
                  alt="suitcase"
                  sx={image}
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ textAlign: "center", fontStyle: "italic" }}
                >
                  {
                    'Una vez iniciada la sesión ingrese a la sección de "Profesionales".'
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  sx={{ color: "black", fontSize: "24px", fontWeight: "bold" }}
                >
                  2.
                </Box>
                <Box
                  component="img"
                  src={ImagenBusquedayComparacion}
                  alt="graph"
                  sx={image}
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ textAlign: "center", fontStyle: "italic" }}
                >
                  {
                    " Busque por el tipo de servicio o nombre del profesional que necesita y compare con las distintas opciones disponibles."
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  sx={{ color: "black", fontSize: "24px", fontWeight: "bold" }}
                >
                  3.
                </Box>
                <Box
                  component="img"
                  src={ImagenContactar}
                  alt="clock"
                  sx={image}
                />
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ textAlign: "center", fontStyle: "italic" }}
                >
                  {
                    "Elija el profesional que más se adapte a sus requerimientos y contáctese con él."
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          size="large"
          variant="contained"
          component="a"
          style={{
            backgroundColor: "#1b325f",
            color: "white",
            marginTop: 50,
            borderRadius: 10,
          }}
          onClick={() => navigate(`/profesionales`)}
        >
          INGRESA
        </Button>
      </Container>
    </Box>
  );
}
