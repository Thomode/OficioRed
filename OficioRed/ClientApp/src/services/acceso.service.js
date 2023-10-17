import axios from "axios"

// Inicio de sesión de usuario
const login = async  (usuario, password) => {
    const res = await axios.post('/api/Acceso/login', {
        user: usuario,
        password: password
    })

    return res
}

// Registro de usuario
const register = async  (usuario, nombre, apellido, password) => {
    const res = await axios.post('/api/Acceso/register', {
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        password: password
    })
    
    return res
}

// Servicio de acceso
const accesoService = {
    login, register
}

export default accesoService