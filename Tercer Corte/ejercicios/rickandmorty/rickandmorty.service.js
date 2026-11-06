const base_url = "https://rickandmortyapi.com/api";

async function pedir(ruta) {
    const respuesta = await fetch(`${base_url}/${ruta}`);

    if(!respuesta.ok) {
        throw new Error("Error.");
    }
    return respuesta.json();
}

export function obtenerPersonaje(id) {
    return pedir(`character/${id}`);
}

export function listarPersonajes(limite) {
    return pedir(`character/?page=${limite}`);
}

export function obtenerUbicacion(id) {
    return pedir(`location/${id}`);
}