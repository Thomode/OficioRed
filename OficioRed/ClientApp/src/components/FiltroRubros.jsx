import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

export const FiltroRubros = ({ rubros, setRubros, seleccionado }) => {
  const getRubros = async () => {
    try {
      const res = await axios.get("/api/Rubro");
      const rubrosLoad = res.data.map((rubro) => ({
        idRubro: rubro.idRubro,
        nombre: rubro.nombre,
        seleccionado: seleccionado,
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

  const handleCheckboxChange = (rubroId) => {
    setRubros((prevRubros) =>
      prevRubros.map((rubro) =>
        rubro.idRubro === rubroId
          ? { ...rubro, seleccionado: !rubro.seleccionado }
          : rubro
      )
    );
  };

  const handleSelectAllChange = (checked) => {
    setRubros((prevRubros) =>
      prevRubros.map((rubro) => ({ ...rubro, seleccionado: checked }))
    );
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <FormControlLabel
          style={{ marginLeft: 0, fontWeight: "bold" }}
          control={
            <Checkbox
              checked={
                rubros.length > 0 && rubros.every((rubro) => rubro.seleccionado)
              }
              onChange={(event) => handleSelectAllChange(event.target.checked)}
            />
          }
          label="Todos"
        />
        {rubros &&
          rubros.map((rubro) => (
            <FormControlLabel
              key={rubro.idRubro}
              control={
                <Checkbox
                  checked={rubro.seleccionado}
                  onChange={() => handleCheckboxChange(rubro.idRubro)}
                />
              }
              label={rubro.nombre}
            />
          ))}
      </div>
    </div>
  );
};
