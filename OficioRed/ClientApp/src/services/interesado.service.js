import axios from "axios";
import { sesionService } from "../auth/sesion";

const registerInteresado = async (
  nombre,
  apellido,
  email,
  idDireccion,
  fotoPerfil
) => {
  const res = await axios.post("/api/Interesado",{
      nombre: nombre,
      apellido: apellido,
      email: email,
      idDireccion: null,
      fotoPerfil: "",
    }, await sesionService.getConfig())
  return res;
};

const imageUpload = async (selectedFile) => {
  const formData = new FormData();
  formData.append("archivo", selectedFile);

  const config = await sesionService.getConfig()

  const res = await axios
    .post("/api/Interesado/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: config.headers.Authorization,
      },
    })
  return res;
};

export const interesadoService = {
  registerInteresado,
  imageUpload,
};
