/* ==========================================================================
   TEMA 10 · BUCLES CON CONTADOR
   for  ·  for...of
   --------------------------------------------------------------------------
   Objetivos:
     - Entender las tres partes del for: inicialización, condición, incremento.
     - Recorrer arreglos y cadenas con for y for...of.
     - Construir acumuladores y contadores.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. ANATOMÍA DEL for
// --------------------------------------------------------------------------
//
//      for (let i = 0;   i < 5;   i++) {
//           ^^^^^^^^^    ^^^^^    ^^^
//           1)inicial    2)cond   3)incremento
//          se ejecuta   se revisa  se ejecuta al
//          UNA vez      ANTES de   FINAL de cada
//          al empezar   cada vuelta  vuelta
//
// ORDEN REAL DE EJECUCIÓN:
//      1. let i = 0
//      2. ¿i < 5?  -> si NO, termina el bucle
//      3. cuerpo del bucle
//      4. i++
//      5. volver al paso 2

console.log("=== 1. for básico ===");

for (let i = 0; i < 5; i++) {
  console.log("  Vuelta número", i);
}

// Por qué se empieza en 0: porque los índices de los arreglos empiezan en 0.
// "i" viene de "index" (índice). Se usa i, luego j, luego k en bucles anidados.


// --------------------------------------------------------------------------
// 2. VARIACIONES DEL for
// --------------------------------------------------------------------------
console.log("\n=== 2. Variaciones ===");

console.log("Del 1 al 5:");
for (let i = 1; i <= 5; i++) {
  console.log("  ", i);
}

console.log("Hacia atrás (cuenta regresiva):");
for (let i = 5; i > 0; i--) {
  console.log("  ", i);
}
console.log("  ¡Despegue!");

console.log("De 2 en 2 (pares hasta 10):");
for (let i = 0; i <= 10; i += 2) {
  console.log("  ", i);
}

console.log("Tabla del 7:");
for (let i = 1; i <= 10; i++) {
  console.log(`   7 x ${i} = ${7 * i}`);
}


// --------------------------------------------------------------------------
// 3. RECORRER UN ARREGLO CON for
// --------------------------------------------------------------------------
console.log("\n=== 3. Recorrer arreglos ===");

const estudiantes = ["Ana", "Luis", "Sofía", "Pedro"];

// La condición SIEMPRE es i < arreglo.length  (NO <=, eso daría undefined)
for (let i = 0; i < estudiantes.length; i++) {
  console.log(`  ${i + 1}. ${estudiantes[i]}`);
}

// Error clásico "off-by-one" (error por uno):
console.log("Con <= (mal):");
for (let i = 0; i <= estudiantes.length; i++) {
  console.log("  ", estudiantes[i]);   // la última vuelta imprime undefined
}


// --------------------------------------------------------------------------
// 4. ACUMULADORES Y CONTADORES
// --------------------------------------------------------------------------
// Patrón fundamental: una variable FUERA del bucle que se va actualizando
// DENTRO del bucle.

console.log("\n=== 4. Acumulador y contador ===");

const ventas = [120000, 85000, 240000, 60000, 310000];

let total = 0;              // acumulador: empieza en 0
for (let i = 0; i < ventas.length; i++) {
  total += ventas[i];       // se va sumando
}
console.log("Total de ventas: $" + total.toLocaleString("es-CO"));
console.log("Promedio: $" + (total / ventas.length).toLocaleString("es-CO"));

let ventasGrandes = 0;      // contador: cuenta cuántas cumplen algo
for (let i = 0; i < ventas.length; i++) {
  if (ventas[i] > 100000) {
    ventasGrandes++;
  }
}
console.log("Ventas mayores a $100.000:", ventasGrandes);

// Buscar el máximo sin Math.max:
let mayorVenta = ventas[0];
for (let i = 1; i < ventas.length; i++) {
  if (ventas[i] > mayorVenta) {
    mayorVenta = ventas[i];
  }
}
console.log("Venta más alta: $" + mayorVenta.toLocaleString("es-CO"));


// --------------------------------------------------------------------------
// 5. for...of  (ES6): la forma moderna de recorrer
// --------------------------------------------------------------------------
// Recorre los VALORES directamente. No hay índice ni condición que escribir,
// así que no existe el error off-by-one.

console.log("\n=== 5. for...of ===");

for (const estudiante of estudiantes) {
  console.log("  ", estudiante);
}

// Con arreglos de objetos queda muy legible:
const productos = [
  { nombre: "Laptop", precio: 3500000 },
  { nombre: "Mouse", precio: 90000 },
  { nombre: "Monitor", precio: 850000 },
];

for (const producto of productos) {
  console.log(`   ${producto.nombre}: $${producto.precio.toLocaleString("es-CO")}`);
}

// ¿Y si necesito el índice? Con entries():
console.log("Con índice usando entries():");
for (const [indice, estudiante] of estudiantes.entries()) {
  console.log(`   [${indice}] ${estudiante}`);
}


// --------------------------------------------------------------------------
// 6. RECORRER CADENAS DE TEXTO
// --------------------------------------------------------------------------
// Una cadena es una secuencia de caracteres: también se puede recorrer.

console.log("\n=== 6. Recorrer strings ===");

const palabra = "JavaScript";

console.log("Con for clásico:");
for (let i = 0; i < palabra.length; i++) {
  console.log(`   Posición ${i}: ${palabra[i]}`);
}

console.log("Con for...of:");
let letras = "";
for (const letra of palabra) {
  letras += letra + " ";
}
console.log("  ", letras.trim());

// Caso práctico: contar vocales
const frase = "Programación en JavaScript";
let vocales = 0;
for (const caracter of frase.toLowerCase()) {
  if ("aeiouáéíóú".includes(caracter)) {
    vocales++;
  }
}
console.log(`La frase tiene ${vocales} vocales`);

// Caso práctico: invertir un texto
let invertida = "";
for (let i = palabra.length - 1; i >= 0; i--) {
  invertida += palabra[i];
}
console.log("Invertida:", invertida);


// --------------------------------------------------------------------------
// 7. BUCLES ANIDADOS
// --------------------------------------------------------------------------
// Un bucle dentro de otro. El interno se ejecuta COMPLETO en cada vuelta
// del externo. Si el externo da 3 vueltas y el interno 4, el cuerpo interno
// se ejecuta 12 veces.

console.log("\n=== 7. Bucles anidados ===");

console.log("Tablas de multiplicar del 1 al 3:");
for (let tabla = 1; tabla <= 3; tabla++) {
  console.log(`  --- Tabla del ${tabla} ---`);
  for (let i = 1; i <= 5; i++) {
    console.log(`   ${tabla} x ${i} = ${tabla * i}`);
  }
}

console.log("Pirámide de asteriscos:");
for (let fila = 1; fila <= 5; fila++) {
  let linea = "";
  for (let columna = 1; columna <= fila; columna++) {
    linea += "*";
  }
  console.log("  ", linea);
}

// Matriz (arreglo de arreglos):
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Recorriendo una matriz:");
for (let fila = 0; fila < matriz.length; fila++) {
  let texto = "";
  for (let col = 0; col < matriz[fila].length; col++) {
    texto += matriz[fila][col] + " ";
  }
  console.log("  ", texto);
}


// --------------------------------------------------------------------------
// 8. ¿for o for...of?
// --------------------------------------------------------------------------
//   for       -> cuando necesitas el ÍNDICE, ir hacia atrás, saltar de 2 en 2,
//                o recorrer solo una parte.
//   for...of  -> cuando solo te interesan los VALORES. Más legible y seguro.
//
// (for...in existe también, pero es para OBJETOS: se ve en el tema 11.)

console.log("\n=== Fin del tema 10 ===");
