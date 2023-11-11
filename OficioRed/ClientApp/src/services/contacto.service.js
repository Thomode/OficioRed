import axios from "axios"

const getById = async (id) =>
    await axios.get(`/api/Contacto/${id}`)

export const contactoService = {
    getById
}