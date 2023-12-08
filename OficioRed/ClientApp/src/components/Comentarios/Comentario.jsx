import { Header } from "./Header";
import { usuarioService } from "../../services/usuario.service";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


export function Comentario({ idUser, comentario, fecha }) {

    const [usuarioInfo, setUsuarioInfo] = useState(null);
    const idUsuarioSesion = usuarioService.getId(); 

    function formatearFecha(fechaString) {
        // Crear un objeto Date a partir de la cadena de fecha
        const fecha = new Date(fechaString);

        // Obtener los componentes de la fecha
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const anio = fecha.getFullYear();

        // Crear la cadena de fecha formateada
        const fechaFormateada = `${dia}/${mes}/${anio}`;

        return fechaFormateada;
    }


    const infoPerfil = async (idUser) => {
        try {
            const response = await usuarioService.get(idUser);
            let fotoUsuario = null;
            let nombre = "";
            let apellido = "";

            if (response.data.idRol === 2) {
                const profesionalResponse = await axios.get(`/api/Profesional/${idUser}`);
                fotoUsuario = profesionalResponse.data.fotoPerfil;
                nombre = profesionalResponse.data.nombre;
                apellido = profesionalResponse.data.apellido;
            } else if (response.data.idRol === 3) {
                const interesadoResponse = await axios.get(`/api/Interesado/${idUser}`);
                fotoUsuario = interesadoResponse.data.fotoPerfil;
                nombre = interesadoResponse.data.nombre;
                apellido = interesadoResponse.data.apellido;
            }

            return { fotoUsuario, nombre, apellido };
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const infoUsuario = await infoPerfil(idUser);
                if (infoUsuario) {
                    setUsuarioInfo(infoUsuario);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchUserInfo();
    }, [idUser]);

    const cardStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "16px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
    };

    const userInfoStyles = {
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
    };

    const userImageStyles = {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "8px",
    };

    const userNameStyles = {
        fontSize: "16px",
        fontWeight: "bold",
    };

    const timeUserStyles = {
        color: "#757575",
        marginBottom: "8px",
        marginLeft: "8px",
    };

    const parrafoStyles = {
        fontSize: "14px",
    };

    const esUsuarioActual = idUsuarioSesion && idUsuarioSesion === idUser;

    return (
        <div style={cardStyles}>
            {usuarioInfo && (
                <div style={userInfoStyles}>
                    <img
                        src={usuarioInfo.fotoUsuario}
                        alt={`Foto de usuario ${idUser}`}
                        style={userImageStyles}
                    />
                    <div>
                        <span style={userNameStyles}>{`${usuarioInfo.nombre} ${usuarioInfo.apellido}`}</span>
                        <span style={timeUserStyles}>{formatearFecha(fecha)}</span>
                    </div>
                </div>
            )}
            <p style={parrafoStyles}>{comentario}</p>

            {esUsuarioActual && (
                <div>
                    <EditIcon style={{ cursor: "pointer", marginRight: "8px" }} />
                    <DeleteIcon style={{ cursor: "pointer" }} />
                </div>
            )}
        </div>
    );
}