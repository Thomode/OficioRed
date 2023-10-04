import React, { useState, useEffect } from 'react';

export const ProfesionalesPage = () => {

    // setear los hooks useState
    const [ users, setUsers ] = useState([]);
    const [ search, setSearch ] = useState("");

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
                placeholder="Buscar Profesional"
                className="form-control"
            /> 
            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="bg-curso">
                        <th className="text-white">Nombre</th>
                        <th className="text-white">Nombre de Usuario</th>
                        <th className="text-white">Email</th>
                    </tr>
                </thead>
                <tbody>
                    { results.map( (user) => (
                        <tr key={ user.id }>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
