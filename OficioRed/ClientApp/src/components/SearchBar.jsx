import { useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";

export const SearchBar = ({
  searchValue,
  setSearchValue,
  loading,
  handleSearch,
  resetSearch,
}) => {
  useEffect(() => {
    if (resetSearch) {
      setSearchValue("");
    }
  }, [resetSearch, setSearchValue]);
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="left">
      <Grid item xs={12} sm={8} md={8} lg={10}>
        <TextField
          variant="outlined"
          placeholder="Buscar"
          fullWidth
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={2}>
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
