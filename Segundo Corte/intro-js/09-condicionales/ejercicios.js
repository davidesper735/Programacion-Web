/* ==========================================================================
   TEMA 9 · EJERCICIOS — CONDICIONALES
   Ejecutar:  node ejercicios.js
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Escribe la función clasificarEdad(edad) que imprima:
//   0 a 12   -> "Niño"
//   13 a 17  -> "Adolescente"
//   18 a 64  -> "Adulto"
//   65 o más -> "Adulto mayor"
//   negativo -> "Edad inválida"
// Pruébala con: -5, 8, 15, 30, 70
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 2
// Escribe la función evaluarNota(nota) que devuelva:
//   4.5 a 5.0 -> "Excelente"
//   4.0 a 4.4 -> "Sobresaliente"
//   3.0 a 3.9 -> "Aceptable"
//   0.0 a 2.9 -> "Reprobado"
// Valida que la nota esté entre 0 y 5; si no, devuelve "Nota inválida".
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 3
// El siguiente código TIENE UN ERROR DE LÓGICA: siempre imprime "Regular".
// Encuéntralo, explícalo en un comentario y corrígelo.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
function clasificarPuntaje(puntaje) {
  if (puntaje >= 50) {
    return "Regular";
  } else if (puntaje >= 70) {
    return "Bueno";
  } else if (puntaje >= 90) {
    return "Excelente";
  } else {
    return "Insuficiente";
  }
}
console.log("Con 95 debería decir Excelente y dice:", clasificarPuntaje(95));
// TODO: explica el error y escribe la versión corregida


// --------------------------------------------------------------------------
// EJERCICIO 4 (truthy / falsy)
// Sin ejecutar, predice si cada uno entra al if. Luego comprueba.
//   if ("0")        -> ____
//   if ([])         -> ____
//   if (0)          -> ____
//   if (" ")        -> ____
//   if (null)       -> ____
//   if ("false")    -> ____
//   if (NaN)        -> ____
//   if ({})         -> ____
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 4 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 5
// Escribe la función validarFormulario(nombre, correo, edad) que devuelva
// el PRIMER error que encuentre:
//   - nombre vacío        -> "El nombre es obligatorio"
//   - correo sin "@"      -> "Correo inválido"
//   - edad menor que 18   -> "Debe ser mayor de edad"
//   - todo correcto       -> "Formulario válido"
// Usa cláusulas de guarda (return temprano).
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 5 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 6 (switch)
// Escribe la función menuCajero(opcion) con un switch:
//   1 -> "Consultar saldo"
//   2 -> "Retirar"
//   3 -> "Consignar"
//   4 -> "Salir"
//   otro -> "Opción inválida"
// Pruébala con 1, 3, 9.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 6 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 7 (switch agrupando casos)
// Escribe la función diasDelMes(mes, anio) que use un switch para devolver
// cuántos días tiene un mes (1-12). Agrupa los meses de 31 y los de 30,
// y calcula febrero según si el año es bisiesto.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 7 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 8 (integrador)
// Sistema de descuentos de una tienda. Escribe calcularDescuento(monto, tipoCliente):
//   - cliente "vip"      -> 20%
//   - cliente "frecuente"-> 10%
//   - cliente "nuevo"    -> 5%
//   - cualquier otro     -> 0%
//   - ADEMÁS: si el monto supera 500000, se suma 5% extra a cualquier cliente.
// Devuelve un objeto: { monto, descuento, totalPagar }
// Prueba con al menos 4 combinaciones.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 8 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 9 (reto)
// Escribe la función categoriaIMC(peso, estatura) que calcule el índice de
// masa corporal (peso / estatura²) y devuelva:
//   menos de 18.5      -> "Bajo peso"
//   18.5 a 24.9        -> "Normal"
//   25 a 29.9          -> "Sobrepeso"
//   30 o más           -> "Obesidad"
// Valida que peso y estatura sean mayores que 0.
// Devuelve también el IMC con 1 decimal.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 9 ---");
// TODO
