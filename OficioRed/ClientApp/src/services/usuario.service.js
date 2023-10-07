import axios from "axios";

async function getAll (){
    const res = await axios.get("/api/Usuario")

    return res.data
}

const createUsuarioRequest = async (usuario) =>
    await axios.post('/api/Acceso/register', usuario)

export const usuarioService = {
    getAll,
    createUsuarioRequest
}


