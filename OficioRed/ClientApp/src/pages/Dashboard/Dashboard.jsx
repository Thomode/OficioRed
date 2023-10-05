import React, { useState, useEffect } from 'react';
import modificar from "../../assets/modificar.png";
import eliminar from "../../assets/eliminar.png";
import "./DashboardPage.css";
export const DashboardPage = () => {

    // setear los hooks useState
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // funcion para traer los datos de la api
    const URL = 'https://jsonplaceholder.typicode.com/users'

    const showData = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        //console.log(data);
        setUsers(data);
    }

    // metodo de filtrado
    /*
    let results = [];
    if (!search) {
        results = users
    } else {
        results = users.filter((dato) => 
            dato.name.toLowerCase().includes(search.toLowerCase())
        )
    }
    */

    // metodo de filtrado 2
    const results = !search ? users : users.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLowerCase())
    )

    // funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    useEffect(() => {
        showData();
    }, [])
    // renderizado de la vista

    return (
        <div className="col-md-12 mx-auto vh-100 d-flex flex-column">
            <input value={search}
                onChange={searcher}
                type="text"
                placeholder="Buscar Usuarios"
                className="form-control"
            />
            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="bg-curso">
                        <th className="text-black">Nombre</th>
                        <th className="text-black">Nombre de Usuario</th>
                        <th className="text-black">Email</th>
                        <th className="text-black">Eliminar</th>
                        <th className="text-black">Cambiar</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                            <button className="google-signin">
                                    <img src={eliminar} alt="basura logo" className="bm_img" />
                            </button>
                            </td>
                            <td>
                                <button className="google-signin">
                                    <img src={modificar} alt="Google Logo" className="bm_img" />
                                </button>
                            </td>
                         
                        </tr>
                    )
    )
}
                </tbody>
            </table>
        </div>
    )
}
