import axios from "axios"

const getAll = async  () => {
    const res = await axios.get('/api/Rol');
    return res;
}

export const rolService = {
    getAll
}