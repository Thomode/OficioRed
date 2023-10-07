import axios from "axios";

async function getAll() {
    const res = await axios.get("/api/Usuario")

    return res.data
}

const create = async (user, password, rol) =>
    await axios.post('/api/Usuario', {
        user,
        password,
        rol
    })

const deleteUser = async (id) =>
    await axios.delete(`/api/Usuario/${id}`)

export const usuarioService = {
    getAll,
    create,
    deleteUser
}


