/* ==========================================================================
   TEMA 3 · VARIABLES Y VALORES
   --------------------------------------------------------------------------
   Objetivos:
     - Declarar variables con var, let y const.
     - Entender el ÁMBITO (scope) y el HOISTING.
     - Aplicar buenas prácticas de nombrado.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. ¿QUÉ ES UNA VARIABLE?
// --------------------------------------------------------------------------
// Una variable es un NOMBRE que le damos a un espacio de memoria para guardar
// un valor y poder usarlo después.
//
//      let    edad    =    20;
//      ^      ^            ^
//      |      |            valor
//      |      nombre (identificador)
//      palabra clave de declaración

console.log("=== 1. Declarar y usar ===");
let edad = 20;
console.log("edad vale:", edad);

edad = 21;                 // reasignar: cambiar el valor guardado
console.log("ahora edad vale:", edad);


// --------------------------------------------------------------------------
// 2. LAS TRES PALABRAS CLAVE: var, let y const
// --------------------------------------------------------------------------
//
//   Palabra | Ámbito    | ¿Se puede reasignar? | ¿Se puede redeclarar? | Hoisting
//   --------|-----------|----------------------|-----------------------|---------------
//   var     | función   | Sí                   | Sí                    | sí, vale undefined
//   let     | bloque {} | Sí                   | No                    | sí, pero da error (TDZ)
//   const   | bloque {} | No                   | No                    | sí, pero da error (TDZ)
//
// REGLA DE ORO DEL CURSO:
//   1. Usa const por defecto.
//   2. Usa let solo si el valor va a cambiar.
//   3. NO uses var (existe por compatibilidad con código antiguo).

console.log("\n=== 2. var, let y const ===");

var lenguaje = "JavaScript";     // estilo antiguo (pre-2015)
let contador = 0;                // va a cambiar
const PI = 3.1416;               // nunca cambia

contador = contador + 1;
console.log("lenguaje:", lenguaje, "| contador:", contador, "| PI:", PI);

// PI = 3.15;   // TypeError: Assignment to constant variable.
// Descomenta la línea de arriba para ver el error en clase.


// --------------------------------------------------------------------------
// 3. const NO SIGNIFICA "INMUTABLE"
// --------------------------------------------------------------------------
// const impide REASIGNAR la variable, pero si el valor es un objeto o un
// arreglo, su CONTENIDO sí se puede modificar.

console.log("\n=== 3. const con objetos y arreglos ===");

const estudiante = { nombre: "Ana", nota: 4.5 };
estudiante.nota = 5.0;              // permitido: cambiamos una propiedad
console.log("Objeto modificado:", estudiante);
// estudiante = { nombre: "Luis" }; // ERROR: eso sí es reasignar

const notas = [3.0, 4.0];
notas.push(5.0);                    // permitido: modificamos el contenido
console.log("Arreglo modificado:", notas);
// notas = [1, 2];                  // ERROR


// --------------------------------------------------------------------------
// 4. ÁMBITO (SCOPE): dónde "vive" una variable
// --------------------------------------------------------------------------
// - Ámbito GLOBAL: declarada fuera de todo, se ve en todo el archivo.
// - Ámbito de FUNCIÓN: declarada dentro de una función, solo vive ahí.
// - Ámbito de BLOQUE: let y const solo viven dentro de las llaves { } donde
//   fueron declaradas (un if, un for, un bloque suelto).

console.log("\n=== 4. Ámbito ===");

const mensajeGlobal = "Soy global";

function miFuncion() {
  const mensajeLocal = "Soy local de la función";
  console.log("Dentro de la función veo:", mensajeGlobal, "y", mensajeLocal);
}
miFuncion();
// console.log(mensajeLocal);  // ReferenceError: mensajeLocal is not defined

// Ámbito de bloque: la gran diferencia entre var y let
if (true) {
  var conVar = "declarada con var dentro del if";
  let conLet = "declarada con let dentro del if";
  console.log("Dentro del bloque:", conLet);
}
console.log("Fuera del bloque, var SÍ se ve:", conVar);
// console.log(conLet);  // ReferenceError: conLet is not defined

// Por eso var causa errores difíciles: se "escapa" de los bloques.


// --------------------------------------------------------------------------
// 5. HOISTING (elevación)
// --------------------------------------------------------------------------
// Antes de ejecutar, JavaScript "sube" las declaraciones al inicio de su
// ámbito. Pero se comportan distinto:
//
//   var  -> se eleva Y se inicializa en undefined.  No da error, da undefined.
//   let  -> se eleva pero queda en la "zona muerta temporal" (TDZ):
//   const   usarla antes de declararla lanza ReferenceError.

console.log("\n=== 5. Hoisting ===");

console.log("Leyendo 'ciudad' ANTES de declararla con var:", ciudad); // undefined
var ciudad = "Bogotá";
console.log("Después de declararla:", ciudad);

// Lo que JavaScript entiende realmente:
//     var ciudad;              <- la declaración sube
//     console.log(ciudad);     <- undefined
//     ciudad = "Bogotá";       <- la asignación se queda donde estaba

try {
  console.log(pais);            // ReferenceError por la TDZ
  let pais = "Colombia";
} catch (error) {
  console.log("Con let da error:", error.name + " -", error.message);
}

// Conclusión: let y const te avisan del error; var lo esconde.
// Otra razón para no usar var.


// --------------------------------------------------------------------------
// 6. BUENAS PRÁCTICAS DE NOMBRADO
// --------------------------------------------------------------------------
// REGLAS OBLIGATORIAS DEL LENGUAJE:
//   - Solo letras, números, _ y $.
//   - No puede empezar por número:   1nombre  -> inválido
//   - Distingue mayúsculas:          nombre   !==  Nombre
//   - No se pueden usar palabras reservadas: let, class, for, return...
//
// CONVENCIONES (lo que se espera de un buen programador):
//   - camelCase para variables y funciones:      nombreCompleto, calcularTotal
//   - PascalCase para clases:                    Estudiante, CuentaBancaria
//   - MAYUSCULAS_CON_GUION para constantes fijas: IVA, TASA_INTERES
//   - Nombres descriptivos, en un solo idioma.
//   - Booleanos que suenen a pregunta:            esValido, tieneStock

console.log("\n=== 6. Nombrado ===");

// MAL                              // BIEN
let x1 = 1500000;                   const salarioBase = 1500000;
let dta = true;                     const datosCompletos = true;
let Nombre_del_Usuario = "Ana";     const nombreUsuario = "Ana";

const TASA_IVA = 0.19;              // constante de configuración
const precioProducto = 80000;
const totalPagar = precioProducto * (1 + TASA_IVA);

console.log("Mal nombrado:", x1, dta, Nombre_del_Usuario);
console.log("Bien nombrado -> total a pagar:", totalPagar);


// --------------------------------------------------------------------------
// 7. ERRORES FRECUENTES
// --------------------------------------------------------------------------
console.log("\n=== 7. Errores frecuentes ===");

// (a) Olvidar declarar: crea una variable global sin querer.
//     total = 100;   // funciona, pero contamina el ámbito global. NO lo hagas.
//     Con "use strict" esto sí lanza error.

// (b) Confundir asignación (=) con comparación (===).
let numero = 5;
console.log("numero === 5 ->", numero === 5);   // comparación: true

// (c) Reasignar una const -> TypeError.
// (d) Usar una variable antes de declararla con let/const -> ReferenceError.

console.log("\n=== Fin del tema 3 ===");
