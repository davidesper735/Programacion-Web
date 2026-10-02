/* ==========================================================================
   TEMA 11 · BUCLES CONDICIONALES Y CONTROL DE FLUJO
   while · do...while · for...in · break · continue
   --------------------------------------------------------------------------
   Objetivos:
     - Usar while cuando NO se sabe cuántas vueltas se darán.
     - Diferenciar while de do...while.
     - Recorrer objetos con for...in.
     - Controlar el flujo con break y continue.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. while: "mientras se cumpla la condición, repite"
// --------------------------------------------------------------------------
//      while (condición) {
//          // cuerpo
//      }
//
// Diferencia con for:
//   for   -> sé CUÁNTAS veces voy a repetir (recorrer un arreglo, 1 al 10).
//   while -> NO sé cuántas veces: depende de algo que pasa dentro del bucle
//            (hasta que el usuario acierte, hasta que el saldo se acabe...).

console.log("=== 1. while ===");

let contador = 1;
while (contador <= 5) {
  console.log("  Vuelta", contador);
  contador++;              // <- SIN ESTO el bucle sería infinito
}

// LAS TRES PARTES SIGUEN EXISTIENDO, solo que separadas:
//      let contador = 1;      <- inicialización (ANTES del while)
//      while (contador <= 5)  <- condición
//      contador++;            <- incremento (DENTRO del cuerpo)
//
// EL ERROR MÁS GRAVE: olvidar el incremento -> bucle infinito -> el programa
// se congela. Si te pasa, detén la ejecución con Ctrl + C.


// --------------------------------------------------------------------------
// 2. CASOS DONDE while ES MEJOR QUE for
// --------------------------------------------------------------------------
console.log("\n=== 2. Casos reales de while ===");

// (a) Repetir hasta alcanzar una condición, sin saber cuántas vueltas.
let saldo = 100000;
const gastoDiario = 27000;
let dias = 0;

while (saldo >= gastoDiario) {
  saldo -= gastoDiario;
  dias++;
}
console.log(`El dinero alcanza para ${dias} días. Sobran $${saldo}`);

// (b) Simular hasta acertar (aquí con un valor fijo para que sea reproducible).
const numeroSecreto = 7;
let intento = 1;
let intentos = 0;

while (intento !== numeroSecreto) {
  intentos++;
  intento++;
}
console.log(`Se acertó el número ${numeroSecreto} en ${intentos} intentos`);

// (c) Procesar una cantidad desconocida de datos.
const cola = ["pedido-1", "pedido-2", "pedido-3"];
while (cola.length > 0) {
  const pedido = cola.shift();     // saca el primero
  console.log("  Procesando:", pedido, "| quedan:", cola.length);
}


// --------------------------------------------------------------------------
// 3. do...while: se ejecuta AL MENOS UNA VEZ
// --------------------------------------------------------------------------
//      do {
//          // cuerpo
//      } while (condición);        <- ¡lleva punto y coma!
//
// La condición se revisa AL FINAL, así que el cuerpo siempre corre una vez.
// Uso típico: menús y validación de datos ("pide el dato, y si está mal,
// vuelve a pedirlo").

console.log("\n=== 3. do...while ===");

let numero = 100;

// Con while NO entra nunca (la condición es falsa desde el inicio):
while (numero < 10) {
  console.log("  Esto no se imprime jamás");
}

// Con do...while entra UNA vez:
do {
  console.log("  do...while sí se ejecutó una vez, aunque 100 < 10 sea falso");
} while (numero < 10);

// Ejemplo real: simular un menú
const opciones = [3, 1, 4];       // lo que "escribiría" el usuario
let indice = 0;
let opcion;

do {
  opcion = opciones[indice];
  console.log(`  Opción elegida: ${opcion}`);
  indice++;
} while (opcion !== 4 && indice < opciones.length);
console.log("  Saliendo del menú...");


// --------------------------------------------------------------------------
// 4. for...in: recorrer las CLAVES de un objeto
// --------------------------------------------------------------------------
//   for...in  -> OBJETOS: da las CLAVES (nombres de las propiedades)
//   for...of  -> ARREGLOS y cadenas: da los VALORES
//
// Confundirlos es un error clásico de examen.

console.log("\n=== 4. for...in ===");

const producto = {
  nombre: "Monitor LED",
  marca: "LG",
  precio: 850000,
  pulgadas: 24,
  disponible: true,
};

for (const clave in producto) {
  console.log(`  ${clave}: ${producto[clave]}`);
  //                        ^^^^^^^^^^^^^^^^ corchetes obligatorios:
  //                        la clave está dentro de una variable
}

// for...in SÍ funciona con arreglos, pero devuelve los ÍNDICES como TEXTO:
const colores = ["rojo", "verde", "azul"];
console.log("for...in sobre un arreglo (no recomendado):");
for (const indice in colores) {
  console.log(`  índice "${indice}" (${typeof indice}) -> ${colores[indice]}`);
}
console.log("Por eso en arreglos se usa for...of:");
for (const color of colores) {
  console.log("  ", color);
}

// Contar propiedades y filtrar:
let cantidadPropiedades = 0;
for (const clave in producto) {
  cantidadPropiedades++;
}
console.log("El objeto tiene", cantidadPropiedades, "propiedades");
console.log("Comprobación con Object.keys:", Object.keys(producto).length);


// --------------------------------------------------------------------------
// 5. break: SALIR del bucle inmediatamente
// --------------------------------------------------------------------------
console.log("\n=== 5. break ===");

const numeros = [4, 8, 15, 16, 23, 42];

// Buscar el primer número mayor que 10 y detenerse ahí:
for (const n of numeros) {
  console.log("  Revisando:", n);
  if (n > 10) {
    console.log("  ¡Encontrado! Salgo del bucle.");
    break;                      // no sigue revisando 16, 23 ni 42
  }
}

// break es útil por EFICIENCIA: si ya encontraste lo que buscabas,
// no tiene sentido recorrer el resto.

// En un while, break sirve para cortar un bucle "infinito" a propósito:
let intentosLogin = 0;
while (true) {                  // bucle infinito controlado
  intentosLogin++;
  if (intentosLogin === 3) {
    console.log("  Se agotaron los 3 intentos de login");
    break;
  }
}


// --------------------------------------------------------------------------
// 6. continue: SALTAR a la siguiente vuelta
// --------------------------------------------------------------------------
console.log("\n=== 6. continue ===");

// Imprimir solo los impares saltando los pares:
let impares = "";
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;                   // salta el resto del cuerpo y sigue con i++
  }
  impares += i + " ";
}
console.log("  Impares:", impares.trim());

// Caso real: ignorar datos inválidos al procesar una lista
const registros = [
  { nombre: "Ana", nota: 4.5 },
  { nombre: "", nota: 3.0 },        // sin nombre: inválido
  { nombre: "Luis", nota: null },   // sin nota: inválido
  { nombre: "Sofía", nota: 3.8 },
];

let sumaNotas = 0;
let validos = 0;

for (const registro of registros) {
  if (!registro.nombre || registro.nota === null) {
    console.log("  Registro inválido, se omite:", JSON.stringify(registro));
    continue;
  }
  sumaNotas += registro.nota;
  validos++;
}
console.log(`  Promedio de ${validos} registros válidos: ${(sumaNotas / validos).toFixed(2)}`);

// Resumen:
//   break    -> "termino el bucle YA"
//   continue -> "esta vuelta no me sirve, paso a la siguiente"


// --------------------------------------------------------------------------
// 7. BUCLES INFINITOS: cómo evitarlos
// --------------------------------------------------------------------------
// Causas más comunes:
//   1. Olvidar el incremento:        while (i < 10) { console.log(i); }
//   2. Incrementar en la dirección equivocada: for (let i = 10; i > 0; i++)
//   3. Una condición que nunca se vuelve falsa: while (x !== 0.1) con decimales
//
// Buenas prácticas:
//   - Revisa SIEMPRE que la variable de la condición cambie dentro del bucle.
//   - En bucles de reintentos, pon un límite máximo de vueltas.

console.log("\n=== 7. Protección contra bucles infinitos ===");

let valor = 1;
let vueltas = 0;
const MAX_VUELTAS = 1000;                  // límite de seguridad

while (valor < 1000000) {
  valor *= 3;
  vueltas++;
  if (vueltas > MAX_VUELTAS) {
    console.log("  Se alcanzó el límite de seguridad, cortando");
    break;
  }
}
console.log(`  Terminó bien: valor = ${valor} en ${vueltas} vueltas`);

console.log("\n=== Fin del tema 11 ===");
