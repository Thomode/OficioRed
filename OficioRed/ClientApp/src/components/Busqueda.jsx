import { TextField, Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function Busqueda({ searchValue, setSearchValue, handleSearch }) {
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="left">
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          placeholder="Buscar"
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
          style={{ backgroundColor: "#1b325f" }}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
}