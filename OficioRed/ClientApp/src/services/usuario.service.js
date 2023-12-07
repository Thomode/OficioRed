import axios from "axios";
import { sesionService } from "../auth/sesion";

async function getAll() {
    const res = await axios.get("/api/Usuario")
    return res.data
}

async function getDashboard() {
    const res = await axios.get("/api/Admin/Dashboard")
    return res.data
}

const create = async (user, password, idRol) =>
    await axios.post('/api/Usuario', {
        user,
        password,
        idRol
    })

const deleteUser = async (id) =>
    await axios.delete(`/api/Usuario/${id}`)

const update = async (id, user, password, idRol) =>
    await axios.put(`/api/Usuario/${id}`, {
        user,
        password,
        idRol
})

const updateUser = async (id, user, password) => {
    try {
        const response = await axios.put(`/api/Usuario/${id}`, {
            user,
            password,
            idRol: null,
            activo: null
        }, await sesionService.getConfig());
        console.log('Respuesta del servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        console.error('Detalles del error:', error.response.data);
        throw error;
    }
}


async function getRoles() {
    const res = await axios.get("/api/Rol")
    return res.data
}

const getId = () => {
    const local = window.localStorage.getItem("acceso");
    const data = JSON.parse(local)
    return data?.id
}

const get = async (id) =>
    await axios.get(`/api/Usuario/${id}`)

export const usuarioService = {
    get,
    getAll,
    create,
    deleteUser,
    update,
    updateUser,
    getRoles,
    getId,
    getDashboard
}