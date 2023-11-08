import axios from "axios"


// Inicio de sesión de usuario
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

// Servicio de acceso
const accesoService = {
    login, register
}

export default accesoService