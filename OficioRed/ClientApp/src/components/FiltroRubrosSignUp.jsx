import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

export const FiltroRubros = ({ rubros, setRubros, seleccionado }) => {
  const [selectAll, setSelectAll] = useState(false);

  const getRubros = async () => {
    try {
      const res = await axios.get("/api/Rubro");
      const rubrosLoad = res.data.map((rubro) => ({
        idRubro: rubro.idRubro,
        nombre: rubro.nombre,
        seleccionado: false,
      }));
      return rubrosLoad;
    } catch (error) {
      console.error("Error al obtener los rubros:", error);
      return [];
    }
  };

  const loadRubros = async () => {
    const rubrosData = await getRubros();
    setRubros(rubrosData);
  };

  useEffect(() => {
    loadRubros();
  }, []);

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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allSelected = rubros.every((rubro) => rubro.seleccionado);
    setRubros((prevRubros) =>
      prevRubros.map((rubro) => ({
        ...rubro,
        seleccionado: !allSelected,
      }))
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
      <FormControl style={{ width: "55vw" }}>
        <InputLabel id="rubros-label">Rubros</InputLabel>
        <Select
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
          <MenuItem key="selectAll" value="selectAll" onClick={handleSelectAll}>
            <Checkbox checked={selectAll} />
            Seleccionar todos
          </MenuItem>
          {rubros.map((rubro) => (
            <MenuItem key={rubro.idRubro} value={rubro.idRubro}>
              <Checkbox checked={rubro.seleccionado} />
              {rubro.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
