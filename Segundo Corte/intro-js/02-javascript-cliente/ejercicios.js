/* ==========================================================================
   TEMA 2 · EJERCICIOS — JAVASCRIPT DEL LADO CLIENTE
   Ejecutar la parte de Node:   node ejercicios.js
   Los ejercicios marcados [NAVEGADOR] se hacen en un archivo .html propio.
   ========================================================================== */


// --------------------------------------------------------------------------
// EJERCICIO 1
// Clasifica cada tarea en "CLIENTE" o "SERVIDOR" completando el arreglo.
// Imprime el resultado con console.table().
// --------------------------------------------------------------------------
console.log("--- Ejercicio 1 ---");
const tareas = [
  { tarea: "Mostrar un mensaje de error al dejar un campo vacío", donde: "TODO" },
  { tarea: "Guardar un usuario nuevo en la base de datos",        donde: "TODO" },
  { tarea: "Cambiar el color de un botón al pasar el mouse",      donde: "TODO" },
  { tarea: "Verificar la contraseña real de un usuario",          donde: "TODO" },
  { tarea: "Enviar un correo de confirmación",                    donde: "TODO" },
];
// TODO: completa cada "donde" y muestra la tabla


// --------------------------------------------------------------------------
// EJERCICIO 2
// El siguiente código simula lo que devuelve prompt("Precio del producto:").
// Corrígelo para que el total (precio + IVA del 19%) se calcule bien.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 2 ---");
const precioTexto = "50000";        // así llega desde prompt: es un string
// const total = precioTexto * 1.19;   <- ¿funciona? ¿por qué?
// const total = precioTexto + 9500;   <- ¿funciona? ¿por qué?
// TODO: calcula el total correctamente e imprímelo


// --------------------------------------------------------------------------
// EJERCICIO 3
// Escribe una función saludar(nombre) que:
//   - si el nombre es null (el usuario canceló el prompt), imprima
//     "Usuario anónimo"
//   - si el nombre está vacío (""), imprima "No escribiste nada"
//   - en otro caso, imprima "Hola, <nombre>"
// Pruébala con los tres casos.
// --------------------------------------------------------------------------
console.log("\n--- Ejercicio 3 ---");
// TODO


// --------------------------------------------------------------------------
// EJERCICIO 4 (teórico, responde en comentarios)
//   a) ¿Por qué NUNCA se debe validar una contraseña solo en el cliente?
//   b) Menciona 3 cosas que JS del navegador NO puede hacer y por qué.
//   c) ¿Qué diferencia hay entre alert() y console.log()?
//   d) ¿Qué devuelve confirm() y de qué tipo es?
// --------------------------------------------------------------------------
// TODO a)
// TODO b)
// TODO c)
// TODO d)


// --------------------------------------------------------------------------
// EJERCICIO 5 [NAVEGADOR]
// Crea "calculadora.html" + "calculadora.js" que, al cargar la página:
//   1. Pida el nombre del usuario con prompt.
//   2. Pida dos números con prompt.
//   3. Muestre con alert: "Hola <nombre>, la suma es <resultado>".
//   4. Imprima en consola los dos números y su tipo de dato ANTES y DESPUÉS
//      de convertirlos.
// Cuidado: si no conviertes, "2" + "3" da "23".
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
// EJERCICIO 6 [NAVEGADOR]
// Agrega a la página anterior un botón "Borrar datos" que use confirm().
//   - Si el usuario acepta, cambia el <h1> a "Datos borrados".
//   - Si cancela, cambia el <h1> a "Operación cancelada".
// --------------------------------------------------------------------------
