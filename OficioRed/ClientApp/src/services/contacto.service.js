import axios from "axios"
import { sesionService } from "../auth/sesion";

const getById = async (id) =>
    await axios.get(`/api/Contacto/${id}`)

const updateContacto = async (id, telefono, email, instagram, facebook) => {
    const response = await axios.put(`/api/Contacto/${id}`, {
            telefono,
            email,
            instagram,
            facebook
        }, await sesionService.getConfig())
        return response.data;
    } 

export const contactoService = {
    getById,
    updateContacto
}