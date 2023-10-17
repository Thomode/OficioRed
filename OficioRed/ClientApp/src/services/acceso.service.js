import axios from "axios"


// Inicio de sesión de usuario
const login = async (usuario, password) => {
    try {
        const res = await axios.post('/api/Acceso/login', {
            user: usuario,
            password: password
        });
        console.log(res);
        return res;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: "Usuario no encontrado" };
        } else {
            return { error: "Ocurrió un error inesperado" };
        }
    }
}


// Registro de usuario
const register = async  (usuario, nombre, apellido, password) => {
    const res = await axios.post('/api/Acceso/register', {
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        password: password
    })
    console.log(res)
    return res
}

// Servicio de acceso
const accesoService = {
    login, register
}

export default accesoService