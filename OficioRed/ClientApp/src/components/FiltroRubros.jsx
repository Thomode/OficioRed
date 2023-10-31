import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
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

export default function MultipleSelectCheckmarks() {
  const [offices, setOffices] = useState([]); // Almacenar las opciones de oficios
  const [selectedOffices, setSelectedOffices] = useState([]); // Oficios seleccionados

  useEffect(() => {
    axios
      .get("/api/Rubro")
      .then((response) => {
        setOffices(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de oficios:", error);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedOffices(event.target.value);
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
        <InputLabel id="demo-multiple-checkbox-label">Rubros</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOffices}
          onChange={handleChange}
          input={<OutlinedInput label="Nombre" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {offices.map((office) => (
            <MenuItem key={office.idOficio} value={office.nombre}>
              <Checkbox checked={selectedOffices.indexOf(office.nombre) > -1} />
              <ListItemText primary={office.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
