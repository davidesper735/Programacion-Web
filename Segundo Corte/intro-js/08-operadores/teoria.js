/* ==========================================================================
   TEMA 8 · OPERADORES
   --------------------------------------------------------------------------
   Objetivos:
     - Usar operadores aritméticos y de asignación.
     - Diferenciar == de === (el error más común del lenguaje).
     - Combinar condiciones con && || ! y usar el operador ternario.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. OPERADORES ARITMÉTICOS
// --------------------------------------------------------------------------
console.log("=== 1. Aritméticos ===");

const a = 17;
const b = 5;

console.log(`${a} + ${b}  =`, a + b);    // suma
console.log(`${a} - ${b}  =`, a - b);    // resta
console.log(`${a} * ${b}  =`, a * b);    // multiplicación
console.log(`${a} / ${b}  =`, a / b);    // división (siempre decimal)
console.log(`${a} % ${b}  =`, a % b);    // MÓDULO: el residuo de la división
console.log(`${a} ** 2    =`, a ** 2);   // potencia (ES2016)

// El módulo (%) parece raro pero es utilísimo:
console.log("\n¿8 es par?", 8 % 2 === 0);       // residuo 0 -> par
console.log("¿7 es par?", 7 % 2 === 0);
console.log("¿15 es múltiplo de 5?", 15 % 5 === 0);
console.log("Último dígito de 1234:", 1234 % 10);

// Incremento y decremento:
let contador = 5;
console.log("\ncontador++ (post):", contador++, "-> ahora vale", contador);
// post-incremento: PRIMERO usa el valor, LUEGO suma

let otro = 5;
console.log("++otro (pre)     :", ++otro, "-> ahora vale", otro);
// pre-incremento: PRIMERO suma, LUEGO usa el valor

// PRECEDENCIA: * / % antes que + -. Los paréntesis mandan.
console.log("\n2 + 3 * 4     =", 2 + 3 * 4);       // 14
console.log("(2 + 3) * 4   =", (2 + 3) * 4);       // 20


// --------------------------------------------------------------------------
// 2. OPERADORES DE ASIGNACIÓN
// --------------------------------------------------------------------------
console.log("\n=== 2. Asignación ===");

let saldo = 1000;
console.log("saldo inicial:", saldo);

saldo += 500;    // equivale a: saldo = saldo + 500
console.log("saldo += 500 ->", saldo);

saldo -= 200;    // saldo = saldo - 200
console.log("saldo -= 200 ->", saldo);

saldo *= 2;      // saldo = saldo * 2
console.log("saldo *= 2   ->", saldo);

saldo /= 4;      // saldo = saldo / 4
console.log("saldo /= 4   ->", saldo);

saldo %= 400;    // saldo = saldo % 400
console.log("saldo %= 400 ->", saldo);

// También sirve para concatenar texto:
let mensaje = "Hola";
mensaje += " mundo";
console.log("mensaje +=   ->", mensaje);


// --------------------------------------------------------------------------
// 3. OPERADORES DE COMPARACIÓN
// --------------------------------------------------------------------------
// Siempre devuelven un BOOLEANO (true o false).

console.log("\n=== 3. Comparación ===");

console.log("10 > 5   ->", 10 > 5);
console.log("10 < 5   ->", 10 < 5);
console.log("10 >= 10 ->", 10 >= 10);
console.log("10 <= 9  ->", 10 <= 9);
console.log("10 != 5  ->", 10 != 5);


// --------------------------------------------------------------------------
// 4. == vs ===   (¡UNO DE LOS PUNTOS MÁS IMPORTANTES DE JAVASCRIPT!)
// --------------------------------------------------------------------------
//   ==   igualdad LAXA:     convierte los tipos y luego compara.
//   ===  igualdad ESTRICTA: compara VALOR y TIPO. No convierte nada.

console.log("\n=== 4. == vs === ===");

console.log('"5" == 5    ->', "5" == 5,    " (convierte el texto a número)");
console.log('"5" === 5   ->', "5" === 5,   " (string !== number)");
console.log("0 == false  ->", 0 == false,  " (false se convierte en 0)");
console.log("0 === false ->", 0 === false);
console.log('"" == 0     ->', "" == 0);
console.log("null == undefined  ->", null == undefined);
console.log("null === undefined ->", null === undefined);
console.log('" " == 0    ->', " " == 0,    " <- un espacio vale 0. Absurdo.");

// Casos que confunden hasta a los expertos:
console.log("\nCasos extremos:");
console.log('"0" == false  ->', "0" == false);
console.log('"0" == 0      ->', "0" == 0);
console.log("NaN == NaN    ->", NaN == NaN, " <- NaN no es igual ni a sí mismo");

// REGLA DEL CURSO: usa SIEMPRE === y !==.
// Solo se acepta == en un caso: comprobar null y undefined a la vez
//      if (valor == null)   // true si es null O undefined

console.log("\nCon !== :");
console.log('"5" !== 5 ->', "5" !== 5);


// --------------------------------------------------------------------------
// 5. OPERADORES LÓGICOS
// --------------------------------------------------------------------------
//   &&  Y (AND):  true solo si AMBOS son true
//   ||  O (OR) :  true si AL MENOS UNO es true
//   !   NO (NOT): invierte el valor

console.log("\n=== 5. Lógicos ===");

const edad = 20;
const tieneCarnet = true;

console.log("edad >= 18 && tieneCarnet ->", edad >= 18 && tieneCarnet);
console.log("edad < 18 || tieneCarnet  ->", edad < 18 || tieneCarnet);
console.log("!tieneCarnet              ->", !tieneCarnet);

// Tabla de verdad:
console.log("\nTabla de verdad:");
console.log("true  && true  =", true && true);
console.log("true  && false =", true && false);
console.log("false && false =", false && false);
console.log("true  || false =", true || false);
console.log("false || false =", false || false);

// EVALUACIÓN DE CORTOCIRCUITO (short-circuit):
// && se detiene en el primer false; || se detiene en el primer true.
// Esto se aprovecha para evitar errores:

const usuario = null;
// console.log(usuario.nombre);            // TypeError
console.log("Protegido con &&:", usuario && usuario.nombre);   // null, sin error

// Valor por defecto con ||:
const nombreIngresado = "";
console.log("Con || :", nombreIngresado || "Invitado");   // "Invitado"

// ?? (nullish coalescing): como ||, pero SOLO reacciona a null/undefined.
const cantidad = 0;
console.log("Con || :", cantidad || 10, " <- 0 es falsy, lo reemplaza (mal)");
console.log("Con ?? :", cantidad ?? 10, " <- 0 se respeta (bien)");


// --------------------------------------------------------------------------
// 6. OPERADOR TERNARIO
// --------------------------------------------------------------------------
//   condición ? valorSiVerdadero : valorSiFalso
// Es la versión corta de un if/else que DEVUELVE un valor.

console.log("\n=== 6. Ternario ===");

const nota = 3.8;

// Con if/else:
let resultado;
if (nota >= 3.0) {
  resultado = "Aprobado";
} else {
  resultado = "Reprobado";
}
console.log("Con if/else:", resultado);

// Con ternario (misma lógica, una línea):
const resultadoTernario = nota >= 3.0 ? "Aprobado" : "Reprobado";
console.log("Con ternario:", resultadoTernario);

// Muy útil dentro de template literals:
const stock = 0;
console.log(`Estado: ${stock > 0 ? "Disponible" : "Agotado"}`);

// Ternarios anidados: se pueden, pero solo si siguen siendo legibles.
const puntaje = 78;
const categoria =
  puntaje >= 90 ? "Excelente" :
  puntaje >= 70 ? "Bueno" :
  puntaje >= 50 ? "Regular" : "Insuficiente";
console.log("Categoría:", categoria);


// --------------------------------------------------------------------------
// 7. PRECEDENCIA GENERAL (de mayor a menor)
// --------------------------------------------------------------------------
//    1. ( )            paréntesis
//    2. ! ++ --        unarios
//    3. ** * / %       potencia, multiplicación, división, módulo
//    4. + -            suma y resta
//    5. < > <= >=      comparación
//    6. === !== == !=  igualdad
//    7. &&             AND
//    8. ||  ??         OR
//    9. ? :            ternario
//   10. = += -= ...    asignación
//
// Consejo profesional: NO memorices la tabla, usa paréntesis.

console.log("\n=== 7. Precedencia ===");
console.log("2 + 3 > 4 && 10 / 2 === 5  ->", 2 + 3 > 4 && 10 / 2 === 5);
console.log("Lo mismo, explícito:       ->", ((2 + 3) > 4) && ((10 / 2) === 5));

console.log("\n=== Fin del tema 8 ===");
