import { useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import { rubroService } from "../services/rubro.service";
import { profesionalService } from "../services/profesional.service";

export const FiltroRubros = ({ profesional, rubros, setRubros }) => {
  const getRubros = async () => {
    try {
      const res = await rubroService.getAll();
      const rubrosLoad = res.map((rubro) => ({
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

  const obtenerRubrosDelProfesional = async () => {
    try {
      const res = await profesionalService.obtenerRubrosProfesional(
        profesional.idProfesional
      );
      return res.data;
    } catch (error) {
      console.error("Error al obtener los rubros del profesional:", error);
      return [];
    }
  };

  const loadRubros = async () => {
    try {
      const rubrosData = await getRubros();
      const profesionalRubros = await obtenerRubrosDelProfesional();
      const rubrosConSeleccion = rubrosData.map((rubro) => ({
        ...rubro,
        seleccionado: profesionalRubros.some(
          (profesionalRubro) => profesionalRubro.idRubro === rubro.idRubro
        ),
      }));
      setRubros(rubrosConSeleccion);
    } catch (error) {
      console.error("Error al cargar rubros:", error);
    }
  };

  useEffect(() => {
    loadRubros();
  }, [profesional.idProfesional]);

  const handleSelectChange = (event) => {
    const selectedRubros = event.target.value;

    setRubros((prevRubros) =>
      prevRubros.map((rubro) => ({
        ...rubro,
        seleccionado: selectedRubros.includes(rubro.idRubro),
      }))
    );
  };

  useEffect(() => {
    if (profesional.idProfesional) {
      loadRubros();
    }
  }, [profesional.idProfesional]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControl fullWidth>
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
