import { obtenerPokemon, listarPokemon, obtenerTipo } from './pokeapi.service.js';
try {
    const pokemon = await obtenerPokemon("pikachu");
    console.log(pokemon);

    const lista = await listarPokemon(10);
    console.log(lista);

    const tipoFuego = await obtenerTipo("fire");
    console.log(tipoFuego.name);

} catch (error) {
    console.log("Algo falló: " + error.message);
}