import axios from "axios"
import { sesionService } from "../auth/sesion";

const registerProfesional = async (nombre, apellido, email, descripcion) => {
  console.log(await sesionService.getConfig())
  const res = await axios.post('/api/Profesional', {
    nombre: nombre,
    apellido: apellido,
    email: email,
    descripcion: descripcion,
    idRubroXprofesional: null,
    fotoPerfil: "",
    idRating: null,
    idContacto: null,
    idDireccion: null,
  }, await sesionService.getConfig())

  return res
}

const imageUpload = async (selectedFile) => {
  const formData = new FormData();
  formData.append("archivo", selectedFile);

  const config = await sesionService.getConfig()

  const res = await axios
    .post("/api/Profesional/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: config.headers.Authorization,
      },
    })
  return res;
}

const asociarRubro = async (idRubro) => {
  console.log(idRubro)
  const res = await axios.post(`/api/Profesional/asociar-rubro/${idRubro}`, {}, await sesionService.getConfig())
  return res
}

export const profesionalService = {
  registerProfesional,
  imageUpload,
  asociarRubro
}