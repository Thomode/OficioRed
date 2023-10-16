import React from "react";
import { TextField, Button, Grid} from "@mui/material"; // Importamos Paper de MUI
import SearchIcon from "@mui/icons-material/Search";

function Buscador({ searchValue, setSearchValue, handleSearch }) {
    return (
            <Grid container spacing={3} alignItems="center" justifyContent="left">
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        placeholder="Buscar usuario"
                        fullWidth
                        size="small"
                        value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ backgroundColor: "white" }} 
                    />
                </Grid>
                <Grid item>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    style={{ backgroundColor: '#1b325f'}}
                >
                    Buscar
                </Button>

                </Grid>
            </Grid>
    );
}

export default Buscador;