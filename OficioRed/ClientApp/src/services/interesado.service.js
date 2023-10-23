import axios from "axios"

const getToken = () => {
    const local = window.localStorage.getItem("acceso");
    const data = JSON.parse(local)

    return data?.token
}

const config = {
    headers: { Authorization: `Bearer ${ getToken() }` }
};

const registerInteresado = async  (nombre, apellido, email, idDireccion, fotoPerfil) => {
    console.log(config);
    const res = await axios.post('/api/Interesado', {
        nombre: nombre,
        apellido: apellido,
        email: email,
        idDireccion: null,
        fotoPerfil: ""
    }, config)
    return res
}

export const interesadoService = {
    registerInteresado
}