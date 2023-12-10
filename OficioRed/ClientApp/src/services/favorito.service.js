import axios from "axios";
import { sesionService } from "../auth/sesion";

async function get() {
    const res = await axios.get("/api/Favorito")
    return res.data
}


const createFavorito = async (idProfesional) => {
    const response = await axios.post(`/api/Favorito`, {
        idProfesional,
    }, await sesionService.getConfig())
    console.log(response.data);
    return response.data;
} 

const deleteFavorito = async (id) =>
    await axios.delete(`/api/Favorito/${id}`, await sesionService.getConfig())


export const favoritoService = {
    get,
    createFavorito,
    deleteFavorito,
}