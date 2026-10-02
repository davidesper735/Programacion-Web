/* ==========================================================================
   TEMA 5 · EJERCICIOS — OBJETOS EN JAVASCRIPT
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Crea un objeto "celular" con: marca, modelo, precio, pulgadas y enStock.
// Imprime la marca con notación de punto y el precio con corchetes.
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2
// Sobre el objeto del ejercicio 1:
//   a) Agrega la propiedad "color".
//   b) Cambia el precio (rebaja del 10%).
//   c) Elimina la propiedad "pulgadas".
//   d) Comprueba con "in" si todavía existe "pulgadas".
//   e) Imprime el objeto final.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3
// Dado este objeto anidado, imprime:
//   a) el nombre del paciente
//   b) la ciudad
//   c) el segundo diagnóstico
//   d) el teléfono del médico tratante
//   e) el nombre del acompañante usando ?. (no existe: debe dar undefined,
//      NO un error)
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
const paciente = {
  nombre: "Rosa Martínez",
  edad: 67,
  ubicacion: { ciudad: "Cali", barrio: "San Fernando" },
  diagnosticos: ["Hipertensión", "Diabetes tipo II", "Artritis"],
  medico: {
    nombre: "Dr. Salazar",
    especialidad: "Medicina interna",
    contacto: { telefono: "3109876543", correo: "salazar@clinica.com" },
  },
};
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4
// Crea un objeto "rectangulo" con ancho y alto, y DOS métodos:
//   - area()      -> devuelve ancho * alto
//   - perimetro() -> devuelve 2 * (ancho + alto)
// Usa this dentro de los métodos. Imprime ambos resultados.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5
// Crea un objeto "carritoCompras" con:
//   - propiedad cliente (string)
//   - propiedad items (arreglo de objetos con nombre, precio y cantidad)
//   - método total() que recorra los items y devuelva la suma de
//     precio * cantidad
//   - método resumen() que devuelva:
//     "<cliente> lleva <n> productos por un total de $<total>"
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6
// Recorre este objeto con for...in e imprime cada propiedad así:
//      materia -> Programación IV
// Después imprime sus claves con Object.keys() y sus valores con
// Object.values().
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
const asignatura = {
  materia: "Programación IV",
  creditos: 3,
  docente: "Ing. García",
  horario: "Martes 7:00 - 9:00",
};
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7
// Predice y explica: ¿qué imprime este código y por qué?
//   const original = { valor: 1 };
//   const copia = original;
//   copia.valor = 99;
//   console.log(original.valor);
// Luego corrígelo para que "original" NO se modifique.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (reto)
// Escribe la función describir(objeto) que reciba CUALQUIER objeto e imprima
// una línea por propiedad con este formato:
//      nombre (string): Ana
//      edad (number): 20
// Pista: for...in + typeof + acceso por corchetes.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
// TODO
