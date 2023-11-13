import axios from "axios"
import { sesionService } from "../auth/sesion";

const registerProfesional = async (nombre, apellido, email, descripcion) => {
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

async function getAll() {
    const res = await axios.get("/api/Profesional")

    return res.data
}

const getById = async (id) =>
    await axios.get(`/api/Profesional/${id}`)

const updateProfesional = async (id, nombre, apellido, email, descripcion) => {
  const response = await axios.put(`/api/Profesional/${id}`, {
          nombre,
          apellido,
          email,
          descripcion,
          fotoPerfil: null,
          idRubroXprofesional: null,
          idRating: null,
          idContacto: null,
          idDireccion: null,
      }, await sesionService.getConfig())
    return response.data;
}

const registerContacto = async (telefono, email, instagram, facebook) => {
  const res = await axios.post('/api/Contacto', {
    telefono: telefono,
    email: email,
    instagram: instagram,
    facebook: facebook,
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
  getAll,
  getById,
  registerProfesional,
  imageUpload,
  asociarRubro,
  registerContacto,
  updateProfesional,
}