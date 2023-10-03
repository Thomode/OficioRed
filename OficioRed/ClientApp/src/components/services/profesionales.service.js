const API_KEY = '4287ad07'

export const buscarProfesionales = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const profesionales = json.Search

        return profesionales?.map(profesional => ({
            id: profesional.id,
            nombre: profesional.nombre,
            apellido: profesional.apellido,
            descripcion: profesional.descripcion,
            fotoPerfil: profesional.fotoPerfil,
            contacto: profesional.contacto
        }))
    } catch (e) {
        throw new Error('Error en la búsqueda del profesional')
    }
}