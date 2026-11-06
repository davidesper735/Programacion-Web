import { obtenerPokemon } from './pokeapi.service.js';
import { listarPokemon } from './pokeapi.service.js';
import { obtenerTipo } from './pokeapi.service.js';

try {
    const pikachu = await obtenerPokemon("pikachu");
    console.log(pikachu);

    const lista = await listarPokemon(10);
    console.log(lista);

    const tipoFuego = await obtenerTipo("fire");
    console.log(tipoFuego.name);

} catch (error) {
    console.log("Algo falló: " + error.message);
}