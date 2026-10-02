/* ==========================================================================
   TEMA 4 · LITERALES Y TIPOS DE DATOS
   --------------------------------------------------------------------------
   Objetivos:
     - Reconocer los tipos primitivos: string, number, boolean, null, undefined.
     - Escribir literales y usar template literals.
     - Diferenciar CONVERSIÓN (explícita) de COERCIÓN (automática).

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. LITERAL vs VARIABLE
// --------------------------------------------------------------------------
// Un LITERAL es un valor escrito tal cual en el código:
//      "Hola"   42   true   null   [1,2]   { a: 1 }
// Una VARIABLE es el nombre donde guardamos ese literal.

console.log("=== 1. Literales ===");
console.log("Hola", 42, true, null, [1, 2], { a: 1 });


// --------------------------------------------------------------------------
// 2. LOS TIPOS DE DATOS DE JAVASCRIPT
// --------------------------------------------------------------------------
// PRIMITIVOS (valores simples, inmutables):
//   string     texto
//   number     números (enteros y decimales, todo junto)
//   boolean    true / false
//   undefined  declarada pero SIN valor asignado
//   null       ausencia de valor asignada A PROPÓSITO
//   bigint     enteros gigantes  (poco usado)
//   symbol     identificadores únicos (poco usado)
//
// NO PRIMITIVO (estructura):
//   object     objetos, arreglos, funciones, fechas...

console.log("\n=== 2. typeof de cada tipo ===");

const texto = "Hola mundo";
const entero = 42;
const decimal = 3.14;
const booleano = true;
let sinValor;                        // undefined: nunca se le asignó nada
const vacioAPreposito = null;        // null: le pusimos "nada" a propósito
const objeto = { nombre: "Ana" };
const arreglo = [1, 2, 3];
const funcion = function () {};

console.log("string    ->", typeof texto);
console.log("number    ->", typeof entero, "y", typeof decimal);
console.log("boolean   ->", typeof booleano);
console.log("undefined ->", typeof sinValor);
console.log("null      ->", typeof vacioAPreposito, "  <-- ¡BUG histórico!");
console.log("object    ->", typeof objeto);
console.log("array     ->", typeof arreglo, "  <-- también dice object");
console.log("function  ->", typeof funcion);

// typeof null devuelve "object": es un error de 1995 que nunca se corrigió
// para no romper la web. Para saber si algo es null se compara: x === null
// Para saber si es arreglo:  Array.isArray(arreglo)
console.log("¿arreglo es Array?", Array.isArray(arreglo));


// --------------------------------------------------------------------------
// 3. STRINGS (cadenas de texto)
// --------------------------------------------------------------------------
console.log("\n=== 3. Strings ===");

const conComillasDobles = "Se puede usar 'comilla simple' dentro";
const conComillaSimple = 'Se puede usar "comilla doble" dentro';
const conEscape = "También se \"escapa\" con la barra invertida";

console.log(conComillasDobles);
console.log(conComillaSimple);
console.log(conEscape);

// Caracteres especiales:
console.log("Salto de línea:\nnueva línea");
console.log("Tabulación:\tcorrida");

// Concatenación con +
const nombre = "Ana";
const apellido = "Pérez";
console.log("Concatenado: " + nombre + " " + apellido);


// --------------------------------------------------------------------------
// 4. TEMPLATE LITERALS (ES6) — usan comillas invertidas ` `
// --------------------------------------------------------------------------
// Ventajas sobre la concatenación:
//   a) Se interpolan variables con ${...}
//   b) Admiten saltos de línea reales
//   c) Se pueden meter expresiones (cuentas, llamadas a funciones)

console.log("\n=== 4. Template literals ===");

const precio = 80000;
const cantidad = 3;

console.log(`Cliente: ${nombre} ${apellido}`);
console.log(`Total: ${precio * cantidad} pesos`);
console.log(`¿Compra grande? ${cantidad > 2 ? "sí" : "no"}`);

const factura = `
  FACTURA
  -------
  Cliente : ${nombre} ${apellido}
  Cantidad: ${cantidad}
  Total   : $${precio * cantidad}
`;
console.log(factura);


// --------------------------------------------------------------------------
// 5. NUMBERS
// --------------------------------------------------------------------------
// En JS hay UN solo tipo numérico: number. No existe int/float por separado.

console.log("\n=== 5. Números ===");

console.log("Entero:", 10, "| Decimal:", 10.5, "| Negativo:", -3);
console.log("Notación científica:", 1.5e6);   // 1 500 000

// Valores numéricos especiales:
console.log("Infinity:", 10 / 0);
console.log("-Infinity:", -10 / 0);
console.log("NaN (Not a Number):", "hola" * 2);
console.log("typeof NaN es...", typeof NaN, "  <-- ¡number! otra rareza");
console.log("¿Es NaN?", Number.isNaN("hola" * 2));

// Cuidado con los decimales (aritmética de punto flotante, no es un bug de JS):
console.log("0.1 + 0.2 =", 0.1 + 0.2);                    // 0.30000000000000004
console.log("Solución:", (0.1 + 0.2).toFixed(2));          // "0.30"


// --------------------------------------------------------------------------
// 6. BOOLEAN, NULL Y UNDEFINED
// --------------------------------------------------------------------------
console.log("\n=== 6. boolean, null, undefined ===");

const mayorDeEdad = true;
const tieneDescuento = false;
console.log(mayorDeEdad, tieneDescuento);

// undefined: la variable existe pero no tiene valor. Lo pone JavaScript.
let telefono;
console.log("undefined:", telefono);

// null: "aquí no hay nada" puesto por el programador.
let segundoApellido = null;
console.log("null:", segundoApellido);

console.log("null == undefined  ->", null == undefined);   // true  (coerción)
console.log("null === undefined ->", null === undefined);  // false (tipos distintos)


// --------------------------------------------------------------------------
// 7. CONVERSIÓN EXPLÍCITA (la hace el programador)
// --------------------------------------------------------------------------
console.log("\n=== 7. Conversión explícita ===");

// A número:
console.log('Number("42")      ->', Number("42"));
console.log('Number("42.5")    ->', Number("42.5"));
console.log('Number("42 años") ->', Number("42 años"));   // NaN
console.log('Number("")        ->', Number(""));          // 0  ¡ojo!
console.log('parseInt("42.9")  ->', parseInt("42.9"));     // 42 (corta decimales)
console.log('parseFloat("42.9")->', parseFloat("42.9"));   // 42.9
console.log('parseInt("42 años")->', parseInt("42 años")); // 42 (lee hasta la letra)

// A texto:
console.log("String(42)     ->", String(42), "| tipo:", typeof String(42));
console.log("(42).toString()->", (42).toString());

// A booleano:
console.log('Boolean("")    ->', Boolean(""));       // false
console.log('Boolean("hola")->', Boolean("hola"));   // true
console.log("Boolean(0)     ->", Boolean(0));        // false


// --------------------------------------------------------------------------
// 8. COERCIÓN IMPLÍCITA (la hace JavaScript solo)
// --------------------------------------------------------------------------
// JS convierte tipos automáticamente cuando mezclamos. Aquí nacen los errores
// más famosos del lenguaje.

console.log("\n=== 8. Coerción implícita ===");

console.log('"5" + 3  =', "5" + 3,  "  (el + con un string CONCATENA)");
console.log('"5" - 3  =', "5" - 3,  "  (el - solo existe para números: convierte)");
console.log('"5" * "2"=', "5" * "2");
console.log('"10" / 2 =', "10" / 2);
console.log("true + 1 =", true + 1, "  (true vale 1, false vale 0)");
console.log('"5" == 5  ->', "5" == 5,  "  (== convierte antes de comparar)");
console.log('"5" === 5 ->', "5" === 5, "  (=== compara valor Y tipo)");

// REGLA PRÁCTICA:
//   1. Usa SIEMPRE === y !==
//   2. Convierte a mano con Number() / String() antes de operar.
//   3. Nunca confíes en lo que devuelve prompt(): es string.

console.log("\n=== Fin del tema 4 ===");
