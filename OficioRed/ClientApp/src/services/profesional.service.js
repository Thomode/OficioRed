import axios from "axios"

const getToken = () => {
    const local = window.localStorage.getItem("acceso");
    const data = JSON.parse(local)

    return data?.token
}

const config = {
    headers: { Authorization: `Bearer ${ getToken() }` }
};

const registerProfesional = async  (
    nombre, apellido, email, descripcion, 
    idRubroXprofesional, fotoPerfil, idRating, idContacto) => {
    console.log(config);
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

export const profesionalService = {
    registerProfesional
}