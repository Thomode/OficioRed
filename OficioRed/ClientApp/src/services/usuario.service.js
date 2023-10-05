import axios from "axios";

async function getAll (){
    const res = await axios.get("/api/Usuario")

    return res.data
}

export const usuarioService = {
    getAll
}
