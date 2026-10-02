/* ==========================================================================
   TEMA 6 · EJERCICIOS — MÉTODOS DE OBJETOS NATIVOS
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1 (String)
// Dado el texto de abajo:
//   a) Quítale los espacios de los extremos.
//   b) Conviértelo a mayúsculas.
//   c) Imprime cuántos caracteres tiene (ya limpio).
//   d) Di si contiene la palabra "web".
//   e) Reemplaza "Bogotá" por "Medellín".
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
const anuncio = "   Curso de desarrollo web en Bogotá   ";
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2 (String)
// Escribe la función normalizarCorreo(correo) que reciba un correo escrito
// de cualquier forma ("  Juan.PEREZ@Hotmail.Com ") y devuelva el correo
// limpio y en minúsculas. Valida además que contenga "@" e imprime
// "Correo inválido" si no lo tiene.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3 (String)
// Escribe la función enmascararTarjeta(numero) que reciba un número de
// tarjeta como texto ("4509123456781234") y devuelva solo los últimos 4
// dígitos visibles:  "************1234"
// Pista: slice() + repeat() o padStart().
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4 (Number)
// El precio de un producto es 89990.4567
//   a) Muéstralo con 2 decimales.
//   b) Muéstralo con separadores de miles en formato colombiano.
//   c) Muéstralo como moneda (COP).
//   d) Comprueba si es un número entero.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
const precioProducto = 89990.4567;
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5 (Math)
// Con el arreglo de temperaturas:
//   a) Encuentra la máxima y la mínima.
//   b) Calcula el promedio y muéstralo con 1 decimal.
//   c) Redondea cada temperatura hacia arriba y hacia abajo.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
const temperaturas = [18.4, 25.7, 31.2, 22.9, 16.1];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6 (Math)
// Escribe una función lanzarDado() que devuelva un entero aleatorio de 1 a 6.
// Lánzalo 10 veces e imprime los resultados en una sola línea.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7 (Math)
// Escribe la función generarClave(longitud) que devuelva una clave aleatoria
// tomando caracteres de:
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
// Pista: Math.floor(Math.random() * caracteres.length) y charAt().
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (Date)
// a) Imprime la fecha de hoy en formato colombiano (dd/mm/aaaa).
// b) Imprime el día de la semana en letras (pista: toLocaleDateString con
//    la opción { weekday: "long" }).
// c) Crea la fecha de tu cumpleaños y calcula cuántos días faltan
//    (o pasaron) desde hoy.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (integrador)
// Escribe la función generarFactura(cliente, producto, precio, cantidad)
// que imprima:
//
//      FACTURA No. 000123
//      Fecha   : 17/09/2026
//      Cliente : ANA PÉREZ
//      Producto: Teclado mecánico
//      Cantidad: 3
//      Subtotal: $540.000
//      IVA (19%): $102.600
//      TOTAL   : $642.600
//
// Usa: toUpperCase, padStart para el número de factura, toLocaleString para
// los valores y toLocaleDateString para la fecha.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
// TODO
