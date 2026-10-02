/* ==========================================================================
   TEMA 8 · EJERCICIOS — OPERADORES
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Dados dos números, imprime su suma, resta, producto, división, residuo
// y el primero elevado al segundo.
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
const x = 23;
const y = 4;
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2 (módulo)
// Escribe funciones que devuelvan true o false:
//   a) esPar(n)
//   b) esMultiploDe(n, divisor)
//   c) ultimoDigito(n)  -> devuelve el último dígito
//   d) esBisiesto(anio) -> divisible por 4, pero no por 100, salvo que lo
//                          sea por 400
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3 (asignación)
// Simula una cuenta bancaria SOLO con operadores de asignación (+=, -=, *=):
//   saldo inicial 500000
//   consignan 250000
//   retiran 120000
//   le aplican un rendimiento del 2% (pista: saldo *= 1.02)
// Imprime el saldo después de cada movimiento.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4 (== vs ===)
// Predice el resultado de cada línea ANTES de ejecutar y explica POR QUÉ.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
// console.log("100" == 100);     // predicción: ____
// console.log("100" === 100);    // predicción: ____
// console.log(0 == "");          // predicción: ____
// console.log(0 === "");         // predicción: ____
// console.log(false == "0");     // predicción: ____
// console.log(null == 0);        // predicción: ____
// console.log([] == false);      // predicción: ____
// TODO: descomenta, comprueba y explica


// --------------------------------------------------------------------------
// EJERCICIO 5 (lógicos)
// Un usuario puede entrar al sistema si:
//   está activo Y (es administrador O tiene permiso especial)
// Escribe la expresión y pruébala con al menos 3 combinaciones distintas.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6 (lógicos)
// Escribe la función puedeConducir(edad, tieneLicencia, tieneSeguro) que
// devuelva true solo si: es mayor de 18, tiene licencia Y tiene seguro.
// Pruébala con 4 casos distintos.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7 (ternario)
// Reescribe estos if/else usando el operador ternario:
//   a) if (edad >= 18) tipo = "Adulto"; else tipo = "Menor";
//   b) if (saldo > 0) estado = "Activa"; else estado = "Sin fondos";
//   c) if (nota >= 4.5) mencion = "Honores"; else mencion = "Normal";
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (|| y ??)
// Una función recibe la configuración de un usuario. Si algún dato no llega,
// debe usar un valor por defecto:
//   nombre  -> "Invitado"
//   idioma  -> "es"
//   notificacionesPorDia -> 5   (¡ojo: 0 es un valor válido!)
// Explica por qué en el último caso hay que usar ?? y no ||.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
const config = { nombre: "", idioma: null, notificacionesPorDia: 0 };
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (integrador)
// Calcula el precio final de un pedido:
//   - subtotal = precio * cantidad
//   - si el subtotal supera 200000, hay 10% de descuento
//   - el envío cuesta 12000, pero es GRATIS si el subtotal supera 150000
//   - al final se suma el IVA del 19%
// Usa operadores ternarios para el descuento y el envío.
// Imprime un resumen con cada valor.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
// TODO
