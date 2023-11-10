import axios from "axios"

const get = async (id) =>
    await axios.get(`/api/Contacto/${id}`)

export const contactoService = {
    get
}