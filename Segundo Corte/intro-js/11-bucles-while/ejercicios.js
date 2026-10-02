/* ==========================================================================
   TEMA 11 · EJERCICIOS — while, do...while, for...in, break y continue
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Usando while:
//   a) Imprime los números del 1 al 10.
//   b) Imprime los pares del 2 al 20.
//   c) Haz una cuenta regresiva del 10 al 1 y termina con "¡Fin!".
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2
// Una cuenta tiene $250.000 y se le descuentan $18.500 cada semana.
// Con un while, calcula:
//   a) Cuántas semanas dura el dinero.
//   b) Cuánto queda al final.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3
// Escribe la función sumarDigitos(numero) que use un while para sumar todos
// los dígitos de un número:  1234 -> 1+2+3+4 = 10
// Pista: numero % 10 da el último dígito;
//        Math.floor(numero / 10) quita el último dígito.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4 (do...while)
// Explica en un comentario la diferencia con while y demuéstrala:
// escribe el MISMO bucle con while y con do...while usando una condición
// que sea FALSA desde el principio, e imprime cuántas veces se ejecuta cada uno.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5 (do...while)
// Simula un menú de cajero con do...while. Las "opciones del usuario" están
// en el arreglo de abajo. El menú debe repetirse hasta que llegue la opción 4
// (Salir). Por cada opción imprime la acción correspondiente.
//   1 -> Consultar saldo   2 -> Retirar   3 -> Consignar   4 -> Salir
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
const opcionesUsuario = [1, 3, 2, 4];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6 (for...in)
// Con el objeto de abajo:
//   a) Imprime cada propiedad como "clave: valor".
//   b) Cuenta cuántas propiedades tiene.
//   c) Imprime solo las propiedades cuyo valor sea un número.
//   d) Construye un texto con todas las claves separadas por coma.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
const vehiculo = {
  marca: "Toyota",
  modelo: "Corolla",
  anio: 2022,
  precio: 95000000,
  usado: false,
  kilometraje: 15000,
};
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7 (break)
// En el arreglo de abajo, busca el PRIMER estudiante que haya perdido la
// materia (nota < 3.0), imprímelo y detén el recorrido con break.
// Imprime también cuántos estudiantes se revisaron antes de encontrarlo.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
const estudiantes = [
  { nombre: "Ana", nota: 4.5 },
  { nombre: "Luis", nota: 3.8 },
  { nombre: "Pedro", nota: 2.4 },
  { nombre: "Sofía", nota: 1.9 },
  { nombre: "Marta", nota: 4.9 },
];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (continue)
// Recorre el arreglo de pagos y suma SOLO los válidos.
// Un pago es inválido si es null, si es negativo o si no es un número.
// Usa continue para saltarlos e imprime cuántos se omitieron.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
const pagos = [50000, null, 32000, -1500, "abc", 78000, 0, 12000];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (reto)
// Escribe la función adivinarNumero() que:
//   - genere un número secreto aleatorio entre 1 y 100
//   - simule intentos usando la estrategia de búsqueda binaria
//     (probar siempre la mitad del rango que queda)
//   - use while y break
//   - devuelva en cuántos intentos lo encontró
// Ejecútala 5 veces e imprime los resultados.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 10 (análisis)
// Explica por qué cada uno de estos bucles es INFINITO y corrígelo:
//   a) let i = 0;  while (i < 5) { console.log(i); }
//   b) for (let i = 10; i > 0; i++) { console.log(i); }
//   c) let n = 10; while (n !== 0) { n -= 3; }
// --------------------------------------------------------------------------
// TODO
