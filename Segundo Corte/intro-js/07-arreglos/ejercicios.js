/* ==========================================================================
   TEMA 7 · EJERCICIOS — ARREGLOS Y SUS MÉTODOS
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Crea un arreglo con 5 materias de tu semestre.
//   a) Imprime la primera y la última (sin escribir el número a mano).
//   b) Imprime cuántas son.
//   c) Agrega una materia al final y otra al inicio.
//   d) Elimina la última.
//   e) Imprime el arreglo final separado por comas.
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2
// Con el arreglo dado:
//   a) Copia los elementos de la posición 2 a la 5 SIN modificar el original.
//   b) Elimina 2 elementos a partir de la posición 1 (esto SÍ modifica).
//   c) Inserta "NUEVO" en la posición 3 sin borrar nada.
// Imprime el arreglo después de cada paso.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
const letras = ["A", "B", "C", "D", "E", "F", "G"];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3
// Con este arreglo de números:
//   a) Recórrelo con for clásico e imprime "posición i -> valor".
//   b) Recórrelo con for...of e imprime solo los pares.
//   c) Recórrelo con forEach e imprime el doble de cada uno.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
const numeros = [7, 12, 5, 20, 3, 18];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4 (map)
// Con el arreglo de precios sin IVA:
//   a) Genera un arreglo nuevo con el IVA del 19% incluido.
//   b) Genera un arreglo de textos: "Precio: $XX".
//   c) Comprueba que el arreglo original NO cambió.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
const precios = [15000, 32000, 7500, 120000];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5 (filter)
// Con el arreglo de estudiantes:
//   a) Los que aprobaron (nota >= 3.0).
//   b) Los que perdieron.
//   c) Los de Sistemas con nota mayor a 4.0.
//   d) Solo los NOMBRES de los aprobados (filter + map).
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
const estudiantes = [
  { nombre: "Ana", nota: 4.5, carrera: "Sistemas" },
  { nombre: "Luis", nota: 2.8, carrera: "Industrial" },
  { nombre: "Sofía", nota: 3.9, carrera: "Sistemas" },
  { nombre: "Pedro", nota: 1.9, carrera: "Sistemas" },
  { nombre: "Marta", nota: 4.8, carrera: "Civil" },
];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6
// Sin usar Math.max: escribe una función mayorDe(arreglo) que recorra el
// arreglo con un bucle y devuelva el número más grande.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7
// Escribe la función promedio(notas) que devuelva el promedio del arreglo
// con 2 decimales. Pruébala con [4.5, 3.2, 5.0, 2.8].
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8
// Ordena estos productos:
//   a) Por precio de menor a mayor.
//   b) Por precio de mayor a menor.
//   c) Por nombre alfabéticamente.
// Imprime solo el nombre y el precio de cada uno.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
const productos = [
  { nombre: "Monitor", precio: 850000 },
  { nombre: "Cable HDMI", precio: 35000 },
  { nombre: "Laptop", precio: 3500000 },
  { nombre: "Audífonos", precio: 210000 },
];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (reto integrador)
// Con el inventario de abajo, imprime un informe con:
//   a) Cuántos productos hay.
//   b) Cuáles están agotados (stock 0).
//   c) El valor total del inventario (precio * stock).
//   d) El producto más caro.
//   e) La lista de nombres en mayúsculas, ordenada alfabéticamente,
//      separada por " | ".
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
const inventario = [
  { producto: "Laptop", precio: 3500000, stock: 4 },
  { producto: "Mouse", precio: 90000, stock: 0 },
  { producto: "Monitor", precio: 850000, stock: 12 },
  { producto: "Teclado", precio: 180000, stock: 0 },
  { producto: "Webcam", precio: 250000, stock: 7 },
];
// TODO
