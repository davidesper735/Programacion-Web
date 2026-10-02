/* ==========================================================================
   TEMA 9 · CONDICIONALES
   --------------------------------------------------------------------------
   Objetivos:
     - Tomar decisiones con if, else if y else.
     - Usar switch y saber cuándo conviene.
     - Reconocer los valores truthy y falsy.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. if: ejecutar código SOLO si se cumple una condición
// --------------------------------------------------------------------------
//      if (condición) {
//          // se ejecuta si la condición es true
//      }
// La condición siempre se evalúa como booleano.

console.log("=== 1. if ===");

const edad = 20;

if (edad >= 18) {
  console.log("Es mayor de edad");
}

// Las llaves son opcionales para UNA sola línea, pero en este curso
// SIEMPRE las usamos: evitan errores al agregar líneas después.
//      if (edad >= 18) console.log("Mayor");   // funciona, pero no lo hagas


// --------------------------------------------------------------------------
// 2. if / else
// --------------------------------------------------------------------------
console.log("\n=== 2. if / else ===");

const nota = 2.9;

if (nota >= 3.0) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}


// --------------------------------------------------------------------------
// 3. else if: varias condiciones EN CADENA
// --------------------------------------------------------------------------
// Se evalúan de arriba hacia abajo y SE DETIENE en la primera que es true.
// Por eso el ORDEN importa.

console.log("\n=== 3. else if ===");

const puntaje = 78;

if (puntaje >= 90) {
  console.log("Excelente");
} else if (puntaje >= 70) {
  console.log("Bueno");            // entra aquí y deja de evaluar
} else if (puntaje >= 50) {
  console.log("Regular");
} else {
  console.log("Insuficiente");
}

// ERROR TÍPICO: poner la condición más amplia primero.
//      if (puntaje >= 50) ...      <- 78 entraría aquí y nunca llegaría a 70
// Regla: de la condición MÁS restrictiva a la MENOS restrictiva.


// --------------------------------------------------------------------------
// 4. CONDICIONES COMPUESTAS Y ANIDADAS
// --------------------------------------------------------------------------
console.log("\n=== 4. Condiciones compuestas ===");

const tieneCuenta = true;
const saldo = 150000;
const montoRetiro = 200000;

if (tieneCuenta && saldo >= montoRetiro) {
  console.log("Retiro autorizado");
} else if (tieneCuenta && saldo < montoRetiro) {
  console.log("Fondos insuficientes");
} else {
  console.log("El usuario no tiene cuenta");
}

// Anidado (un if dentro de otro). Úsalo con moderación: más de 2 o 3 niveles
// se vuelve ilegible.
const usuario = { activo: true, rol: "admin" };

if (usuario.activo) {
  if (usuario.rol === "admin") {
    console.log("Acceso total al panel");
  } else {
    console.log("Acceso limitado");
  }
} else {
  console.log("Usuario inactivo");
}

// Alternativa más limpia con cláusula de guarda (return temprano):
function verificarAcceso(usuario) {
  if (!usuario.activo) return "Usuario inactivo";
  if (usuario.rol !== "admin") return "Acceso limitado";
  return "Acceso total al panel";
}
console.log("Con guardas:", verificarAcceso(usuario));


// --------------------------------------------------------------------------
// 5. TRUTHY Y FALSY
// --------------------------------------------------------------------------
// En un if, JavaScript convierte lo que sea a booleano.
//
// SOLO HAY 6 VALORES FALSY (memorízalos, es lo único que hay que memorizar):
//      false      0      ""  (cadena vacía)      null      undefined      NaN
//
// TODO LO DEMÁS es truthy, incluso cosas que parecen "vacías":
//      "0"   "false"   []   {}   -1   " "  (un espacio)

console.log("\n=== 5. Truthy y Falsy ===");

// Guardamos el valor junto a su etiqueta para poder imprimirlo con claridad.
const valores = [
  { etiqueta: "false", valor: false },
  { etiqueta: "0", valor: 0 },
  { etiqueta: '"" (vacío)', valor: "" },
  { etiqueta: "null", valor: null },
  { etiqueta: "undefined", valor: undefined },
  { etiqueta: "NaN", valor: NaN },
  { etiqueta: '"0"', valor: "0" },
  { etiqueta: '"false"', valor: "false" },
  { etiqueta: "[] (arreglo vacío)", valor: [] },
  { etiqueta: "{} (objeto vacío)", valor: {} },
  { etiqueta: "-1", valor: -1 },
  { etiqueta: '" " (un espacio)', valor: " " },
];

valores.forEach((item) => {
  const resultado = Boolean(item.valor) ? "TRUTHY" : "falsy";
  console.log(`  ${item.etiqueta.padEnd(18)} -> ${resultado}`);
});

// Uso práctico: validar que un campo no venga vacío
const nombreIngresado = "";
if (!nombreIngresado) {
  console.log("\nEl nombre es obligatorio");
}

// CUIDADO: un arreglo vacío es TRUTHY.
const carrito = [];
if (carrito) {
  console.log("Esto se ejecuta aunque el carrito esté vacío");
}
if (carrito.length === 0) {
  console.log("Así SÍ se comprueba un arreglo vacío");
}


// --------------------------------------------------------------------------
// 6. switch
// --------------------------------------------------------------------------
// Compara UNA variable contra varios valores exactos (usa === internamente).
// Es más legible que una cadena larga de else if cuando comparamos igualdad.

console.log("\n=== 6. switch ===");

const diaSemana = 3;

switch (diaSemana) {
  case 1:
    console.log("Lunes");
    break;        // break EVITA que siga ejecutando los casos siguientes
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  default:        // si ninguno coincide
    console.log("Fin de semana");
}

// OLVIDAR break = "fall-through": sigue ejecutando hacia abajo.
console.log("\nSin break (fall-through):");
const numero = 2;
switch (numero) {
  case 1:
    console.log("  uno");
  case 2:
    console.log("  dos");      // entra aquí...
  case 3:
    console.log("  tres");     // ...y sigue ejecutando
  default:
    console.log("  default");
}

// Ese comportamiento se aprovecha a propósito para AGRUPAR casos:
console.log("\nAgrupando casos a propósito:");
const mes = 2;
switch (mes) {
  case 12:
  case 1:
  case 2:
    console.log("  Vacaciones");
    break;
  case 6:
  case 7:
    console.log("  Mitad de año");
    break;
  default:
    console.log("  Periodo académico");
}

// switch también funciona con strings:
const rol = "editor";
switch (rol) {
  case "admin":
    console.log("Puede crear, editar y borrar");
    break;
  case "editor":
    console.log("Puede crear y editar");
    break;
  case "lector":
    console.log("Solo puede leer");
    break;
  default:
    console.log("Rol desconocido");
}


// --------------------------------------------------------------------------
// 7. ¿if/else o switch?
// --------------------------------------------------------------------------
//   switch  -> comparar UNA variable contra valores EXACTOS (roles, menús,
//              códigos, días). Más legible con muchos casos.
//   if/else -> RANGOS (nota >= 3.0), condiciones compuestas (a && b),
//              comparaciones distintas entre sí.
//
// Un switch NO puede evaluar rangos directamente... salvo con este truco:

console.log("\n=== 7. switch con rangos (truco) ===");
const calificacion = 4.6;
switch (true) {                       // se compara contra true
  case calificacion >= 4.5:
    console.log("Excelente");
    break;
  case calificacion >= 3.0:
    console.log("Aprobado");
    break;
  default:
    console.log("Reprobado");
}
// Funciona, pero en la práctica un if/else es más claro para rangos.

console.log("\n=== Fin del tema 9 ===");
