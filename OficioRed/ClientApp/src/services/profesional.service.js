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

const updateProfesional = async (nombre, apellido, email, descripcion) => {
  const response = await axios.put(`/api/Profesional/`, {
          nombre,
          apellido,
          email,
          descripcion
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
  const res = await axios.post(`/api/Profesional/asociar-rubro/${idRubro}`, {}, await sesionService.getConfig())
  return res
}

const getRatings = async (idProfesional) => {
  const res = await axios.get(`/api/Rating/${idProfesional}/ratings`)
  return res
}

const getPromedioRating = async (idProfesional) => {
  const res = await axios.get(`/api/Rating/${idProfesional}/average-rating`)
  return res
}

const registerRating = async (idProfesional, puntuacion) => {
  const res = await axios.post('/api/Rating', {
    idProfesional: idProfesional,
    puntuacion: puntuacion,
  }, await sesionService.getConfig())
  return res
}

const obtenerRubrosProfesional = async (idProfesional) => {
  const res = await axios.get(`/api/Profesional/${idProfesional}/rubros`, await sesionService.getConfig())
  return res
}

const desasociarRubro = async (idRubro) => {
  const res = await axios.delete(`/api/Profesional/desasociar-rubro/${idRubro}`, await sesionService.getConfig())
  return res
}

const desasociarRubrosProfesional = async (idProfesional) => {
  try {
    const response = await obtenerRubrosProfesional(idProfesional);
    const rubrosProfesional = response.data;
    for (const rubro of rubrosProfesional) {
      await desasociarRubro(rubro.idRubro);
      console.log(`Rubro desasociado: ${rubro.nombre}`);
    }
    console.log("Todos los rubros desasociados exitosamente");
  } catch (error) {
    console.error("Error al desasociar rubros:", error);
  }
};

export const profesionalService = {
  getAll,
  getById,
  registerProfesional,
  imageUpload,
  asociarRubro,
  desasociarRubro,
  registerContacto,
  updateProfesional,
  getRatings,
  getPromedioRating,
  registerRating,
  obtenerRubrosProfesional,
  desasociarRubrosProfesional
}