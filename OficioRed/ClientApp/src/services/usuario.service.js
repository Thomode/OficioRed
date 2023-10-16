import axios from "axios";


async function getAll() {
    const res = await axios.get("/api/Usuario")

    return res.data
}

const get = async (id) =>
    await axios.get(`/api/Usuario/${id}`)

const create = async (user, password, rol) =>
    await axios.post('/api/Usuario', {
        user,
        password,
        rol
    })

const deleteUser = async (id) =>
    await axios.delete(`/api/Usuario/${id}`)

const update = async (id, user, password, rol) =>
    await axios.put(`/api/Usuario/${id}`, {
        user,
        password,
        rol
    })


export const usuarioService = {
    get,
    getAll,
    create,
    deleteUser,
    update
}
