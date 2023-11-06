import axios from "axios"

const getToken = () => {
  const local = window.localStorage.getItem("acceso");
  const data = JSON.parse(local)

  return data?.token
}

const token = getToken();
const config = {
  headers: { Authorization: token ? `Bearer ${token}` : '' }
};


const registerProfesional = async (
  nombre, apellido, email, descripcion,
  idRubroXprofesional, fotoPerfil, idRating, idContacto) => {
  
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
  }, config)
  return res
}

const imageUpload = async (selectedFile) => {
  const formData = new FormData();
  formData.append("archivo", selectedFile);

  const res = await axios
    .post("/api/Profesional/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: config.headers.Authorization,
      },
    })
  return res;
};

const asociarRubro = async (idRubro) => {
  const res = await axios.post(`/api/Profesional/asociar-rubro/${idRubro}`, {}, config)

  return res
}

export const profesionalService = {
  registerProfesional,
  imageUpload,
  asociarRubro
}