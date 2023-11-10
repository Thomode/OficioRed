import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { usuarioService } from "../../services/usuario.service";
function HomeAdmin() {

    const [dashboardData, setDashboardData] = useState({
        totalUsuario: 0,
        cantidadAdmin: 0,
        cantidadProfesional: 0,
        cantidadInteresado: 0,
    });

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
        width: "410px",
        margin: "20px"
    };

    const titleStyle = {
        fontSize: "1.5rem",
        marginBottom: "10px",
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#1b325f' 
    };

    const contentStyle = {
        color: "#555",
    };

    const titleStyle2 = {
        fontSize: '80px',
        fontWeight: 'bold',
        color: '#1b325f',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        WebkitTextStroke: '2px white',
        MozTextStroke: '2px white',
    };

    useEffect(() => {
        usuarioService.getDashboard()
            .then((data) => setDashboardData(data))
            .catch((error) => console.error("Error al obtener datos del dashboard", error));
    }, []); 


    return (
        <Container style={{ padding: "20px", backgroundColor: "#9cc4e4", minHeight: "100vh" }}>
            <Typography variant="h2" sx={titleStyle2}>
                Panel Admin
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={8} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" component="h2" sx={titleStyle}>
                                Tarjeta 1
                            </Typography>
                            <Typography color="textSecondary" sx={contentStyle}>
                                Total de Usuarios: {dashboardData.totalUsuario}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" component="h2" sx={titleStyle}>
                                Tarjeta 2
                            </Typography>
                            <Typography color="textSecondary" sx={contentStyle}>
                                Cantidad de Administradores: {dashboardData.cantidadAdmin}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" component="h2" sx={titleStyle}>
                                Tarjeta 3
                            </Typography>
                            <Typography color="textSecondary" sx={contentStyle}>
                                Cantidad de Profesionales: {dashboardData.cantidadProfesional}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <Typography variant="h6" component="h2" sx={titleStyle}>
                                Tarjeta 4
                            </Typography>
                            <Typography color="textSecondary" sx={contentStyle}>
                                Cantidad de Interesados: {dashboardData.cantidadInteresado}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomeAdmin;
