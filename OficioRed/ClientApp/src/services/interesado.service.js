import axios from "axios";

const getToken = () => {
  const local = window.localStorage.getItem("acceso");
  const data = JSON.parse(local);

  return data?.token;
};

const token = getToken();
const config = {
  headers: { Authorization: token ? `Bearer ${token}` : "" },
};

const registerInteresado = async (
  nombre,
  apellido,
  email,
  idDireccion,
  fotoPerfil
) => {
  console.log(config);
  const res = await axios.post(
    "/api/Interesado",
    {
      nombre: nombre,
      apellido: apellido,
      email: email,
      idDireccion: null,
      fotoPerfil: "",
    },
    config
  );
  return res;
};

const imageUpload = async (selectedFile) => {
  const formData = new FormData();
  formData.append("archivo", selectedFile);

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
