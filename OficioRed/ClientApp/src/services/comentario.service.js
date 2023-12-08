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
    return response.data;
} 

const createRating = async (idProfesional, puntuacion) => {
    const response = await axios.post(`/api/Rating`, {
        idProfesional,
        puntuacion,
    }, await sesionService.getConfig())
    return response.data;
} 

const deleteComentario = async (id) =>
    await axios.delete(`/api/Comentario/${id}`)

const update = async (id, comentario) =>
    await axios.put(`/api/Comentario/${id}`, {comentario})

export const comentarioService = {
    get,
    getAll,
    create,
    createRating,
    deleteComentario,
    update
}