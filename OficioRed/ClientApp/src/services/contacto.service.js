import axios from "axios"

const getById = async (id) =>
    await axios.get(`/api/Contacto/${id}`)

const updateContacto = async (id, telefono, email, instagram, facebook) => {
    try {
        const response = await axios.put(`/api/Contacto/${id}`, {
            telefono,
            email,
            instagram,
            facebook
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el contacto:', error);
        throw error;
    }
};

export const contactoService = {
    getById,
    updateContacto
}