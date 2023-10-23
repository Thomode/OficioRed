import { useEffect, useState } from "react";
import { TablaRubro } from "../components/Rubro/TablaRubro"; // Importa TablaRubro
import { rubroService } from "../services/rubro.service"; // Importa rubroService
import { Button, Grid, Typography, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Buscador from "../components/buscador";
export function RubroAdminPage() {
    const handleSearch = async () => {
        const data = await rubroService.getAll(); 
        console.log(data);
        const filteredRubros = data.filter((rubro) =>
            rubro.nombre.toLowerCase().includes(searchValue.toLowerCase())
        ); 

        setRubros(filteredRubros); 
    };
    const [rubros, setRubros] = useState([]); 
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("");

    async function loadRubros() {
        const data = await rubroService.getAll(); 
        console.log(data);
        setRubros(data);
    }

    useEffect(() => {
        loadRubros();
    }, []);

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h4" marginBottom={2}>
                        Rubros
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
                            <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => { navigate('/admin/rubroForm') }}>
                                Agregar 
                            </Button>
                        </Grid>
                    </Grid>
                    <TablaRubro rubros={rubros} loadRubros={loadRubros}></TablaRubro> 
                </CardContent>
            </Card>
        </>
    );
}
