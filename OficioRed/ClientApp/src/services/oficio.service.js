import axios from "axios";


async function getAll() {
    const res = await axios.get("/api/Oficio")

    return res.data
}

const get = async (id) =>
    await axios.get(`/api/Oficio/${id}`)

const create = async (nombre) =>
    await axios.post('/api/Oficio', {
        nombre
    })

const deleteOfice = async (id) =>
    await axios.delete(`/api/Oficio/${id}`)

const update = async (id, nombre) =>
    await axios.put(`/api/Oficio/${id}`, {
        nombre
    })


export const oficioService = {
    get,
    getAll,
    create,
    deleteOfice,
    update
}


