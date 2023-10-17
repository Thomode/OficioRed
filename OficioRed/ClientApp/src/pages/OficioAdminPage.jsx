import { useEffect, useState } from "react";
import { TablaOficio } from "../components/Oficio/TablaOficio";
import { oficioService } from "../services/oficio.service";
import { Button, Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Buscador from "../components/buscador";
export function OficioAdminPage() {
    const handleSearch = async () => {
        const data = await oficioService.getAll(); // Obt?n todos los usuarios
        console.log(data)
        const filteredOficios = data.filter((oficio) =>
            oficio.nombre.toLowerCase().includes(searchValue.toLowerCase())
        ); // Filtra los usuarios basados en el texto de b?squeda

        setOficios(filteredOficios); // Actualiza la lista de usuarios con el resultado de la b?squeda
    };
    const [oficios, setOficios] = useState([]);
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("");

    async function loadOficios() {
        const data = await oficioService.getAll();
        console.log(data);
        setOficios(data);
    }

    useEffect(() => {
        loadOficios();
    }, []);

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4" marginBottom={2}>
                        Oficio
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            marginBottom: "10px",
                        }}
                    >
                        <Grid item xs={6}>
                            <Buscador searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => { navigate('/admin/oficioForm') }}>
                                Agregar
                            </Button>
                        </Grid>
                    </Grid>
                    <TablaOficio oficios={oficios} loadOficios={loadOficios}></TablaOficio>
                </CardContent>
            </Card>
        </>
    );
}
