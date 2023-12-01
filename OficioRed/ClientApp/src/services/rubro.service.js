import axios from "axios";


async function getAll() {
    const res = await axios.get("/api/Rubro")
    return res.data
}

const get = async (id) =>
    await axios.get(`/api/Rubro/${id}`)

const create = async (nombre) =>
    await axios.post('/api/Rubro', {
        nombre
    })

const deleteRubro = async (id) =>
    await axios.delete(`/api/Rubro/${id}`)

const update = async (id, nombre) =>
    await axios.put(`/api/Rubro/${id}`, {
        nombre
    })


export const rubroService = {
    get,
    getAll,
    create,
    deleteRubro,
    update
}


