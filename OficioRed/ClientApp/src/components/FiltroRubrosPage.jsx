import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

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

export function FiltroRubrosPage() {
  const [rubros, setRubros] = useState([]);
  const [allRubros, setAllRubros] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRubros(typeof value === "string" ? value.split(",") : value);
  };

  const getRubros = async () => {
    try {
      const res = await axios.get("/api/Rubro");
      const rubrosLoad = res.data.map((rubro) => ({
        idRubro: rubro.idRubro,
        nombre: rubro.nombre,
      }));
      return rubrosLoad;
    } catch (error) {
      console.error("Error al obtener los rubros:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadRubros = async () => {
      const rubrosData = await getRubros();
      setAllRubros(rubrosData);
    };
    loadRubros();
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Rubros</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={rubros}
          onChange={handleChange}
          input={<OutlinedInput label="Rubros" />}
          fullWidth
          renderValue={(selected) =>
            selected
              .map(
                (selectedRubro) =>
                  allRubros.find((r) => r.nombre === selectedRubro).nombre
              )
              .join(", ")
          }
          MenuProps={MenuProps}
        >
          {allRubros.map((rubro) => (
            <MenuItem key={rubro.id} value={rubro.nombre}>
              <Checkbox checked={rubros.indexOf(rubro.nombre) > -1} />
              <ListItemText primary={rubro.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
