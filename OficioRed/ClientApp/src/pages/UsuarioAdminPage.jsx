import { useEffect, useState } from "react";
import { TablaUsuario } from "../components/TablaUsuario";
import { usuarioService } from "../services/usuario.service";
import { OutlinedInput, Button, Grid, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export function UsuarioAdminPage() {

    const [usuarios, setUsuarios] = useState([])

    async function loadUsuarios() {
        const data = await usuarioService.getAll()
        console.log(data)

        setUsuarios(data)
    }

    useEffect(() => {
        loadUsuarios()
    }, [])

    return (
        <>
            <Grid
                container
                spacing={3}
                alignItems="center"
                sx={{
                    marginBottom: '10px'
                }}
            >
                <Grid item xs={6}>
                    <TextField
                        placeholder="Buscar usuario"
                        fullWidth={true}
                        size="small"
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                    >Buscar</Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                    >Agregar</Button>

                </Grid>
            </Grid>


            <TablaUsuario usuarios={usuarios}></TablaUsuario>
        </>
    )
}