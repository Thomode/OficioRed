import { Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";

export const SearchBar = ({ searchValue, setSearchValue, loading, handleSearch }) => {
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
        <LoadingButton
          fullWidth
          loading={loading}
          loadingPosition="start"
          startIcon={<SearchIcon />}
          variant="contained"
          style={{ backgroundColor: "#1b325f", color: "white" }}
          onClick={handleSearch}
        >
          BUSCAR
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
