import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

function HomeAdmin() {
  const cardStyle = {
    backgroundColor: "#f0f0f0", // Color de fondo de las tarjetas
    padding: "20px", // Padding añadido a las tarjetas
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // Sombra
    transition: "0.3s", // Transición suave al interactuar
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)", // Sombra más prominente al pasar el mouse por encima
    },
  };

  const titleStyle = {
    fontSize: "1.5rem", // Tamaño del título
    marginBottom: "10px",
    color: "#333", // Color del texto del título
  };

  const contentStyle = {
    color: "#555", // Color del texto del contenido
  };

  return (
    <Container style={{ padding: "20px", backgroundColor: "#9cc4e4" }}>
      <h1>Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Tarjeta 1
              </Typography>
              <Typography color="textSecondary" sx={contentStyle}>
                Contenido de la tarjeta 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Tarjeta 2
              </Typography>
              <Typography color="textSecondary" sx={contentStyle}>
                Contenido de la tarjeta 2
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Tarjeta 3
              </Typography>
              <Typography color="textSecondary" sx={contentStyle}>
                Contenido de la tarjeta 3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeAdmin;
