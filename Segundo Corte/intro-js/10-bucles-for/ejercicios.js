/* ==========================================================================
   TEMA 10 · EJERCICIOS — BUCLES CON CONTADOR (for, for...of)
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
//   a) Imprime los números del 1 al 20.
//   b) Imprime del 20 al 1 (cuenta regresiva).
//   c) Imprime los múltiplos de 5 hasta 100, todos en UNA sola línea.
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2
// Escribe la función tablaDeMultiplicar(n) que imprima la tabla del número
// recibido, del 1 al 12, con el formato:  "7 x 3 = 21"
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3
// Con el arreglo de temperaturas:
//   a) Recórrelo con for clásico e imprime "Día 1: 18.4°C".
//   b) Calcula la suma y el promedio.
//   c) Cuenta cuántos días superaron los 25°C.
//   d) Encuentra la temperatura máxima SIN usar Math.max.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
const temperaturas = [18.4, 25.7, 31.2, 22.9, 16.1, 28.3, 24.0];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4
// Escribe la función factorial(n) usando un for.
//   factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
//   factorial(0) = 1 (por definición)
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5 (cadenas)
// Con la palabra "programacion":
//   a) Imprime cada letra con su posición.
//   b) Cuenta cuántas vocales tiene.
//   c) Inviértela.
//   d) Cuenta cuántas veces aparece la letra "a".
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6 (cadenas)
// Escribe la función esPalindromo(texto) que devuelva true si el texto se lee
// igual al derecho y al revés. Ignora mayúsculas y espacios.
// Pruébala con: "reconocer", "Anita lava la tina", "javascript"
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7 (for...of con objetos)
// Recorre el arreglo de ventas con for...of e imprime:
//      Vendedor: Ana | Ventas: 3 | Total: $450.000
// Al final, imprime el total general de todos los vendedores.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
const ventas = [
  { vendedor: "Ana", unidades: 3, valorUnidad: 150000 },
  { vendedor: "Luis", unidades: 5, valorUnidad: 80000 },
  { vendedor: "Sofía", unidades: 2, valorUnidad: 320000 },
];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (bucles anidados)
// Dibuja con asteriscos, usando bucles anidados:
//   a) Un cuadrado de 5x5
//   b) Un triángulo creciente de 5 filas
//   c) Un triángulo decreciente de 5 filas
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (reto)
// Imprime los números del 1 al 30, pero:
//   - si es múltiplo de 3, imprime "Fizz"
//   - si es múltiplo de 5, imprime "Buzz"
//   - si es múltiplo de ambos, imprime "FizzBuzz"
//   - en otro caso, el número
// (Este ejercicio se usa en entrevistas de trabajo reales.)
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 10 (reto)
// Escribe la función esPrimo(n) que devuelva true si n es primo.
// Luego imprime todos los primos entre 1 y 50.
// Pista: un número es primo si solo es divisible por 1 y por sí mismo.
//        Basta con probar divisores hasta la raíz cuadrada de n.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 10 ---");
// TODO
