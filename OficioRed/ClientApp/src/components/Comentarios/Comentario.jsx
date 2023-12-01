import { Header } from "./Header";

export function Comentario({imgUser, comentario}) {
    return (
        <div className="card">
            <Header imgUser={imgUser} />
            <p className="parrafo"> {comentario} </p>
        </div>
    )
}