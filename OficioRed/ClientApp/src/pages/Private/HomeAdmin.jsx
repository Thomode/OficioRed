import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";
import { usuarioService } from "../../services/usuario.service";
import imagenFondo from "../../assets/armarios-formas-geometricas.jpg";

function HomeAdmin() {
  const [dashboardData, setDashboardData] = useState({
    totalUsuario: 0,
    cantidadAdmin: 0,
    cantidadProfesional: 0,
    cantidadInteresado: 0,
  });

  useEffect(() => {
    usuarioService
      .getDashboard()
      .then((data) => setDashboardData(data))
      .catch((error) =>
        console.error("Error al obtener datos del dashboard", error)
      );
  }, []);

  const chartData = {
    labels: ["Administradores", "Profesionales", "Interesados"],
    series: [
      dashboardData.cantidadAdmin,
      dashboardData.cantidadProfesional,
      dashboardData.cantidadInteresado,
    ],
  };

  const chartOptions = {
    labels: ["Administradores", "Profesionales", "Interesados"],
    colors: ["#1b325f", "#3a89c9", "#f26c4f"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  const cardStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    width: "370px",
    margin: "20px",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    marginBottom: "10px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#1b325f",
  };

  const titleStyle2 = {
    fontSize: "70px",
    fontWeight: "bold",
    color: "#1b325f",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    WebkitTextStroke: "2px white",
    MozTextStroke: "2px white",
    marginLeft: "20px",
  };

  const numberStyle = {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#1b325f",
  };

  const cardContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Container
      style={{
        padding: "20px",
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h2" sx={titleStyle2}>
        Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={cardContentStyle}>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Total de Usuarios:
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ ...titleStyle, ...numberStyle }}
              >
                {dashboardData.totalUsuario}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={cardContentStyle}>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Cantidad de Administradores:
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ ...titleStyle, ...numberStyle }}
              >
                {dashboardData.cantidadAdmin}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={cardContentStyle}>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Cantidad de Profesionales:
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ ...titleStyle, ...numberStyle }}
              >
                {dashboardData.cantidadProfesional}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={3}>
          <Card sx={cardStyle}>
            <CardContent sx={cardContentStyle}>
              <Typography variant="h6" component="h2" sx={titleStyle}>
                Cantidad de Interesados:
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ ...titleStyle, ...numberStyle }}
              >
                {dashboardData.cantidadInteresado}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ ...cardStyle, width: "100%" }}>
            <CardContent sx={cardContentStyle}>
              <Chart
                options={chartOptions}
                series={chartData.series}
                type="donut"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeAdmin;
