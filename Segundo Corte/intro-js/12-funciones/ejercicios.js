/* ==========================================================================
   TEMA 12 · EJERCICIOS — FUNCIONES
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Escribe estas funciones y pruébalas:
//   a) saludar(nombre)        -> devuelve "Hola, <nombre>"
//   b) areaRectangulo(b, h)   -> devuelve el área
//   c) esMayorDeEdad(edad)    -> devuelve true o false
//   d) convertirACelsius(f)   -> (f - 32) * 5/9
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2 (declaración vs expresión)
// a) Escribe una función DECLARADA y llámala ANTES de escribirla.
// b) Escribe una función EXPRESIÓN e intenta llamarla antes (envuélvelo en
//    try/catch) para ver el error.
// c) Explica en un comentario a qué se debe la diferencia.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3 (parámetros por defecto)
// Escribe calcularPrecioFinal(precio, descuento = 0, iva = 0.19) que devuelva
// el precio final. Pruébala llamándola con 1, 2 y 3 argumentos.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4 (return)
// Este código está mal: la función imprime en vez de devolver, y por eso
// la última línea falla. Corrígelo.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
function calcularPromedio(notas) {
  let suma = 0;
  for (const nota of notas) {
    suma += nota;
  }
  console.log(suma / notas.length);
}
// const promedio = calcularPromedio([4, 5, 3]);
// console.log("El doble del promedio es", promedio * 2);   // NaN
// TODO: versión corregida


// --------------------------------------------------------------------------
// EJERCICIO 5 (arrow functions)
// Convierte estas funciones a arrow functions lo más cortas posible:
//   function cuadrado(n) { return n * n; }
//   function saludar() { return "Hola"; }
//   function sumar(a, b) { return a + b; }
//   function esPar(n) { return n % 2 === 0; }
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6 (rest)
// Escribe la función estadisticas(...numeros) que devuelva un objeto con:
//   cantidad, suma, promedio, maximo y minimo.
// Pruébala con distintas cantidades de argumentos.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7 (callbacks)
// Escribe la función procesarLista(arreglo, callback) que aplique el callback
// a cada elemento y devuelva un arreglo nuevo (o sea, reescribe map a mano).
// Pruébala con tres callbacks distintos.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (funciones que devuelven funciones)
// Escribe crearValidador(minimo) que devuelva una función que reciba un
// número y diga si alcanza el mínimo.
//   const validarNota = crearValidador(3.0);
//   validarNota(4.2)  -> true
//   validarNota(2.5)  -> false
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (integrador)
// Construye un pequeño sistema de notas con funciones separadas:
//   - promedio(notas)
//   - estaAprobado(promedio)
//   - clasificar(promedio)       -> "Excelente" / "Bueno" / "Aceptable" / "Bajo"
//   - generarReporte(estudiante) -> recibe { nombre, notas } y devuelve
//     un objeto con nombre, promedio, aprobado y clasificacion
// Pruébalo con al menos 3 estudiantes usando map.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
const grupo = [
  { nombre: "Ana", notas: [4.5, 4.8, 5.0] },
  { nombre: "Luis", notas: [3.0, 2.8, 3.4] },
  { nombre: "Sofía", notas: [2.0, 2.5, 1.8] },
];
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 10 (proyecto final)
// Sistema de inventario. Escribe funciones para:
//   - agregarProducto(inventario, producto)  -> devuelve un inventario NUEVO
//   - buscarPorNombre(inventario, nombre)
//   - productosAgotados(inventario)
//   - valorTotal(inventario)
//   - aplicarDescuento(inventario, porcentaje) -> inventario nuevo con precios
//     rebajados (sin modificar el original)
//   - imprimirInventario(inventario)         -> muestra una tabla
// Usa const, arrow functions, métodos de arreglos y template literals.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 10 ---");
const inventarioInicial = [
  { nombre: "Laptop", precio: 3500000, stock: 4 },
  { nombre: "Mouse", precio: 90000, stock: 0 },
  { nombre: "Monitor", precio: 850000, stock: 12 },
];
// TODO
