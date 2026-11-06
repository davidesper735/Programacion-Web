import { obtenerPokemon, listarPokemon, obtenerTipo } from './pokeapi.service.js';

/* Es mejor es usar el try/catch para cada funcion, 
para poder manejar los errores de manera individual. */

try {
    const pokemon = await obtenerPokemon("pikachu");
    console.log("Nombre: " + pokemon.name + 
        "\nAltura: " + pokemon.height + 
        "\nPeso: " + pokemon.weight + 
        "\nTipo: " + pokemon.types[0].type.name);

    const lista = await listarPokemon(10);
    console.log("-------- Lista de Pokémon --------");
    lista.results.forEach(pokemon => {
        console.log(pokemon.name);
    });

    const tipo = await obtenerTipo("fire");
    console.log("-------- Obtener Tipo --------");
    const primeros = tipo.pokemon.slice(0, 10);
    
    for (let i = 0; i < primeros.length; i++) {
    console.log(primeros[i].pokemon.name);}

} catch (error) {
    console.log("Algo falló: " + error.message);
}