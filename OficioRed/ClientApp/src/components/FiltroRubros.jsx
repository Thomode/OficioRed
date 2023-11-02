import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const FiltroRubros = () => {
  const [rubros, setRubros] = useState([]); // Initialize rubros as an empty array

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
      console.error("Error fetching rubros:", error);
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
    const selectedRubroIds = event.target.value;
    setRubros((prevRubros) =>
      prevRubros.map((rubro) => ({
        ...rubro,
        seleccionado: selectedRubroIds.includes(rubro.idRubro),
      }))
    );
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: { xs: "100%", sm: "100%" },
          paddingRight: { xs: 0, sm: 0 },
          marginLeft: { xs: 0, sm: 0 },
        }}
      >
        <InputLabel>Rubros</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={rubros
            .filter((rubro) => rubro.seleccionado)
            .map((rubro) => rubro.idRubro)}
          onChange={handleSelectChange}
          renderValue={(selected) =>
            selected
              .map(
                (rubroId) =>
                  rubros.find((rubro) => rubro.idRubro === rubroId).nombre
              )
              .join(", ")
          }
          MenuProps={MenuProps}
        >
          {rubros.map((rubro) => (
            <MenuItem key={rubro.idRubro} value={rubro.idRubro}>
              <Checkbox checked={rubro.seleccionado} />
              <ListItemText primary={rubro.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
