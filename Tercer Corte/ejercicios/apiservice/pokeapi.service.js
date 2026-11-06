const BASE_URL = "https://pokeapi.co/api/v2";

async function pedir(ruta) {
    const respuesta = await fetch(`${BASE_URL}/${ruta}`);
    
    if(!respuesta.ok) {
        throw new Error("Error.");
    }
    return respuesta.json();
}

export function obtenerPokemon(nombre) {
    return pedir(`pokemon/${nombre}`);
}

export function listarPokemon(limite) {
    return pedir(`pokemon?limit=${limite}`);
}

export function obtenerTipo(tipo) {
    return pedir(`type/${tipo}`);
}