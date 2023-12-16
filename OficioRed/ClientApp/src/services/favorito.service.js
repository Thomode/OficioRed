import axios from "axios";
import { sesionService } from "../auth/sesion";

const getAll = async () => {
    const res = await axios.getAll("/api/Favorito/all", await sesionService.getConfig())
    console.log(res.data);
    return res.data
}

const get = async () => {
    const res = await axios.get("/api/Favorito", await sesionService.getConfig())
    console.log(res.data);
    return res.data
}

const createFavorito = async (idProfesional) => {
    const response = await axios.post(`/api/Favorito?idProfesional=${idProfesional}`, null, await sesionService.getConfig());
    console.log(response.data);
    return response.data;
};

const deleteFavorito = async (idFavorito) => {
    const response = await axios.delete(
        `/api/Favorito/?idFavorito=${idFavorito}`,
        await sesionService.getConfig()
      );
      return response.data;
}

export const favoritoService = {
    getAll,
    get,
    createFavorito,
    deleteFavorito,
}