import axios from "axios";
import { sesionService } from "../auth/sesion";

async function getAll() {
    const res = await axios.get("/api/Comentario")
    return res.data
}

const get = async (id) =>
    await axios.get(`/api/Comentario/${id}`)

const create = async (comentario1, idProfesional) => {
    const response = await axios.post(`/api/Comentario`, {
        comentario1,
        idProfesional,
    }, await sesionService.getConfig())
    console.log(response.data);
    return response.data;
} 

const createRating = async (idProfesional, puntuacion) => {
    const response = await axios.post(`/api/Rating`, {
        idProfesional,
        puntuacion,
    }, await sesionService.getConfig())
    console.log(response.data);
    return response.data;
} 

const deleteComentario = async (id) =>
    await axios.delete(`/api/Comentario/${id}`, await sesionService.getConfig())

const update = async (idComentario, nuevoComentario) => {
    try {
        const response = await axios.put(`/api/Comentario`, {
            idComentario,
            comentario1: nuevoComentario,
        }, await sesionService.getConfig());

        if (response && response.data) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error("La respuesta o los datos son undefined");
        }
    } catch (error) {
        console.error("Error en la actualización del comentario:", error);
        throw error;
    }
}
export const comentarioService = {
    get,
    getAll,
    create,
    createRating,
    deleteComentario,
    update
}