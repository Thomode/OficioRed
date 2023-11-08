import axios from "axios"


// Inicio de sesión de usuario
const login = async (usuario, password) => {
    try {
        const res = await axios.post('/api/Acceso/login', {
            user: usuario,
            password: password
        });

        return res;
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: "Usuario no encontrado" };
        } else {
            return { error: "Ocurrió un error inesperado" };
        }
    }
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