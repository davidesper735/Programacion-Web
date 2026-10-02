/* ==========================================================================
   TEMA 4 · EJERCICIOS — LITERALES Y TIPOS DE DATOS
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Declara una variable de cada tipo primitivo (string, number, boolean,
// undefined, null) e imprime para cada una: el valor y su typeof.
// Formato sugerido:  console.log(valor, "->", typeof valor);
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2
// Predice el resultado de cada expresión ANTES de ejecutar.
// Escribe tu predicción al lado y luego comprueba.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// console.log("10" + 5);        // predicción: ____
// console.log("10" - 5);        // predicción: ____
// console.log(10 + true);       // predicción: ____
// console.log("10" * "2");      // predicción: ____
// console.log(1 + 2 + "3");     // predicción: ____
// console.log("1" + 2 + 3);     // predicción: ____
// console.log(null + 1);        // predicción: ____
// console.log(undefined + 1);   // predicción: ____
// TODO: descomenta y explica en un comentario por qué pasa cada una


// --------------------------------------------------------------------------
// EJERCICIO 3
// Reescribe esta concatenación usando template literals:
//   "El estudiante " + nombre + " de " + edad + " años obtuvo " + nota + " puntos"
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
const nombre = "Laura";
const edad = 22;
const nota = 4.7;
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4
// Estos datos llegaron de un formulario, por eso TODOS son texto.
// Convierte lo necesario y calcula el total (precio * cantidad) con IVA del 19%.
// Imprime el total con 2 decimales.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
const precioTexto = "25000";
const cantidadTexto = "4";
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5
// Escribe una función tipoDe(valor) que reciba cualquier valor y devuelva su
// tipo REAL como texto, corrigiendo los dos casos raros de typeof:
//   - null debe devolver "null" (no "object")
//   - un arreglo debe devolver "array" (no "object")
// Pruébala con: 5, "hola", true, null, undefined, [1,2], {a:1}
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6
// Genera una "ficha" de producto usando UN SOLO template literal multilínea:
//      PRODUCTO: Teclado mecánico
//      PRECIO  : $180000
//      STOCK   : 12 unidades
//      ESTADO  : Disponible
// El ESTADO debe calcularse dentro del template: "Disponible" si stock > 0,
// "Agotado" si no.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
const producto = "Teclado mecánico";
const precio = 180000;
const stock = 12;
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7
// Explica en comentarios por qué ocurre cada resultado:
//   a) 0.1 + 0.2 === 0.3          -> false
//   b) typeof NaN                 -> "number"
//   c) Number("")                 -> 0
//   d) null == undefined          -> true
//      null === undefined         -> false
// --------------------------------------------------------------------------
// TODO
