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

async function getAll() {
  const res = await axios.get("/api/Interesado")

  return res.data
}

const getById = async (id) =>
    await axios.get(`/api/Interesado/${id}`)

const updateInteresado = async (nombre, apellido, email, fotoPerfil) => {
  try {
      const response = await axios.put(`/api/Interesado`, {
          nombre,
          apellido,
          email,
          fotoPerfil,
      });
      return response.data;
  } catch (error) {
      console.error('Error al actualizar el interesado:', error);
      throw error;
  }
};
    

export const interesadoService = {
  registerInteresado,
  imageUpload,
  getAll,
  getById,
  updateInteresado,
};
