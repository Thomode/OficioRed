import axios from "axios"

const login = async  (usuario, password) => {
    const res = await axios.post('/api/Acceso/login', {
        usuario: usuario,
        password: password
    })

    return res
}

const accesoService = {
    login
}

export default accesoService