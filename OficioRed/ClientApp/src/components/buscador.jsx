import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Buscador({ searchValue, setSearchValue, handleSearch }) {

    return (
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    placeholder="Buscar usuario"
                    fullWidth
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </Grid>
        </Grid>
    );
}

export default Buscador;