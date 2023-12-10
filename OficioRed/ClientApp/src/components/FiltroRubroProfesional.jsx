import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { rubroService } from "../services/rubro.service";
import {
  Button,
  Grid,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export const FiltroRubros = ({ rubros, setRubros }) => {
  const location = useLocation();
  const [selectAll, setSelectAll] = useState(false);

  const getRubros = async (selectedId) => {
    try {
      const res = await rubroService.getAll();
      const rubrosLoad = res.map((rubro) => ({
        idRubro: rubro.idRubro,
        nombre: rubro.nombre,
        seleccionado: selectedId ? rubro.idRubro === selectedId : true,
      }));
      return rubrosLoad;
    } catch (error) {
      console.error("Error al obtener los rubros:", error);
      return [];
    }
  };

  const loadRubros = async () => {
    const selectedId = extractRubroIdFromUrl(location.pathname);
    const rubrosData = await getRubros(selectedId);
    setRubros(rubrosData);
  };

  useEffect(() => {
    loadRubros();
  }, [location.pathname]);

  const handleSelectChange = (event) => {
    const selectedRubros = event.target.value;
    setSelectAll(selectedRubros.includes("selectAll"));

    setRubros((prevRubros) =>
      prevRubros.map((rubro) => ({
        ...rubro,
        seleccionado:
          selectedRubros.includes("selectAll") ||
          selectedRubros.includes(rubro.idRubro),
      }))
    );
  };

  const handleSelectAllRubros = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setRubros((prevRubros) =>
      prevRubros.map((rubro) => ({
        ...rubro,
        seleccionado: newSelectAll,
      }))
    );
  };

  const extractRubroIdFromUrl = (pathname) => {
    const match = pathname.match(/\/profesionales\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  return (
    <Grid
      container
      spacing={2}
      marginTop={"10px"}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={8} md={8} lg={10}>
        <FormControl fullWidth>
          <InputLabel id="rubros-label">Rubros</InputLabel>
          <div style={{ width: "65vw", minWidth: "440px" }}>
            <Select
              fullWidth
              style={{ width: "100%" }}
              labelId="rubros-label"
              id="rubros"
              label="Rubros"
              multiple
              value={rubros
                .filter((rubro) => rubro.seleccionado)
                .map((rubro) => rubro.idRubro)}
              onChange={handleSelectChange}
              renderValue={(selected) =>
                rubros
                  .filter((rubro) => selected.includes(rubro.idRubro))
                  .map((rubro) => rubro.nombre)
                  .join(", ")
              }
            >
              {rubros.map((rubro) => (
                <MenuItem key={rubro.idRubro} value={rubro.idRubro}>
                  <Checkbox checked={rubro.seleccionado} />
                  {rubro.nombre}
                </MenuItem>
              ))}
            </Select>
          </div>{" "}
          {/* Cierre del div agregado */}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={2}>
        <Button
          onClick={handleSelectAllRubros}
          variant="contained"
          fullWidth
          style={{
            width: "100%",
            backgroundColor: selectAll ? "#f44336" : "#4caf50",
            color: "#fff",
          }}
          startIcon={
            selectAll ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />
          }
        >
          {selectAll ? "Deseleccionar Todos" : "Seleccionar Todos"}
        </Button>
      </Grid>
    </Grid>
  );
};
