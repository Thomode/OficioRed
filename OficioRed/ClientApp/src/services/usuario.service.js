import axios from "axios";


async function getAll() {
    const res = await axios.get("/api/Usuario")

    return res.data
}

const get = async (id) =>
    await axios.get(`/api/Usuario/${id}`)

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
    console.log(`Actualizando usuario con ID: ${id}`);
    try {
        const response = await axios.put(`/api/Usuario/${id}`, {
            user,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

async function getRoles() {
    const res = await axios.get("/api/Rol")

    return res.data
}

const getId = () => {
    const local = window.localStorage.getItem("acceso");
    const data = JSON.parse(local)

    return data?.id
}

export const usuarioService = {
    get,
    getAll,
    create,
    deleteUser,
    update,
    updateUser,
    getRoles,
    getId
}
