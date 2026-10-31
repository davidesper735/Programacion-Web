const url = "https://pokeapi.co/api/v2/pokemon/pikachuasdasd";

async function main() {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    console.log("Código:", respuesta.status);

    if(!respuesta.ok){
        console.log("Pokemon no existe.");
        return;
    }

   // console.log("Datos:", datos);
    console.log("Nombre:", datos.name);
    console.log("Altura", datos.height);
    console.log("Habilidades:", datos.abilities[1].ability.name);

    //1. Muestra también el peso y los tipos.

    // console.log(datos);
    console.log("Peso:", datos.weight);
    console.log("Tipos:", datos.types[0].type.name);
    
}

main();