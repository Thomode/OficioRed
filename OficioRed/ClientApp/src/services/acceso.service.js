import axios from "axios"

const login = async (usuario, password) => {
    const res = await axios.post('/api/Acceso/login', {
        user: usuario,
        password: password
    });
    return res;
}
const register = async  (usuario, password, idRol) => {
    const res = await axios.post('/api/Acceso/register', {
        user: usuario,
        password: password,
        idRol: idRol
    })

    return res
}

export const accesoService = {
    login, register
}