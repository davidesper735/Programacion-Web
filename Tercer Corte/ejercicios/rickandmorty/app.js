// import { obtenerPokemon, listarPokemon,  obtenerTipo } from './pokeapi.service.js';
import { obtenerPersonaje, listarPersonajes, obtenerUbicacion } from './rickandmorty.service.js';

/* try {
    const pikachu = await obtenerPokemon("pikachu");
    console.log(pikachu);

    const lista = await listarPokemon(10);
    console.log(lista);

    const tipoFuego = await obtenerTipo("fire");
    console.log(tipoFuego.name);

} catch (error) {
    console.log("Algo falló: " + error.message);
} */

try {
    const personaje = await obtenerPersonaje(1);
    console.log("Nombre: " + spersonaje.name + "\nEspecie: " + personaje.species + "\nEstado: " + personaje.status + "\nGénero: " + personaje.gender);

    const lista = await listarPersonajes(1);
    console.log(lista.results[0].name);

    const location = await obtenerUbicacion(1);
    console.log(location.name);

} catch (error) {
    console.log("Algo falló: " + error.message);
}