/* ==========================================================================
   TEMA 12 · FUNCIONES
   --------------------------------------------------------------------------
   Objetivos:
     - Diferenciar declaración y expresión de función.
     - Manejar parámetros, argumentos y valores de retorno.
     - Escribir arrow functions.
     - Entender que las funciones son VALORES (se pasan y se devuelven).

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. ¿PARA QUÉ SIRVEN LAS FUNCIONES?
// --------------------------------------------------------------------------
// Una función es un bloque de código con nombre que:
//   - se escribe UNA vez y se usa MUCHAS (evita repetir código: principio DRY),
//   - recibe datos (parámetros) y devuelve un resultado (return),
//   - le da un nombre con sentido a una operación.
//
// Sin función (código repetido):
//      const total1 = 50000 * 1.19;
//      const total2 = 80000 * 1.19;
//      const total3 = 15000 * 1.19;
//      // si el IVA cambia, hay que corregir en TODOS lados
//
// Con función (un solo lugar que mantener):

console.log("=== 1. Primera función ===");

function calcularTotalConIva(precio) {
  return precio * 1.19;
}

console.log(calcularTotalConIva(50000));
console.log(calcularTotalConIva(80000));
console.log(calcularTotalConIva(15000));


// --------------------------------------------------------------------------
// 2. DECLARACIÓN vs EXPRESIÓN
// --------------------------------------------------------------------------
console.log("\n=== 2. Declaración vs expresión ===");

// (a) DECLARACIÓN (function declaration)
//     Se puede llamar ANTES de escribirla: el hoisting eleva la función completa.
console.log("Llamada antes de declararla:", sumar(3, 4));

function sumar(a, b) {
  return a + b;
}

// (b) EXPRESIÓN (function expression)
//     Se guarda en una variable. NO se puede llamar antes: la variable sigue
//     las reglas de let/const (zona muerta temporal).
// console.log(restar(9, 4));      // ReferenceError

const restar = function (a, b) {
  return a - b;
};
console.log("Expresión:", restar(9, 4));

// Diferencias resumidas:
//   DECLARACIÓN -> hoisting completo, se puede usar antes, tiene nombre propio.
//   EXPRESIÓN   -> sin hoisting utilizable, se asigna a una variable,
//                  suele ser anónima. Es lo que se usa para callbacks.


// --------------------------------------------------------------------------
// 3. PARÁMETROS Y ARGUMENTOS
// --------------------------------------------------------------------------
// PARÁMETRO = el nombre en la definición.   function saludar(nombre)
// ARGUMENTO = el valor real al llamarla.    saludar("Ana")

console.log("\n=== 3. Parámetros y argumentos ===");

function presentar(nombre, carrera, semestre) {
  return `${nombre} estudia ${carrera} y va en ${semestre}° semestre`;
}
console.log(presentar("Ana", "Sistemas", 5));

// Si falta un argumento, el parámetro vale undefined:
console.log(presentar("Luis", "Industrial"));

// PARÁMETROS POR DEFECTO (ES6): valor de respaldo si no llega el argumento.
function presentarMejor(nombre, carrera = "Sistemas", semestre = 1) {
  return `${nombre} estudia ${carrera} y va en ${semestre}° semestre`;
}
console.log(presentarMejor("Luis"));
console.log(presentarMejor("Sofía", "Civil", 8));

// PARÁMETRO REST (...): recoge una cantidad indefinida de argumentos
// en un arreglo. Debe ir siempre al final.
function sumarTodos(...numeros) {
  let total = 0;
  for (const n of numeros) {
    total += n;
  }
  return total;
}
console.log("sumarTodos(1,2,3):", sumarTodos(1, 2, 3));
console.log("sumarTodos(5,10,15,20,25):", sumarTodos(5, 10, 15, 20, 25));


// --------------------------------------------------------------------------
// 4. return
// --------------------------------------------------------------------------
console.log("\n=== 4. return ===");

// return hace DOS cosas: devuelve un valor Y termina la función de inmediato.

function clasificar(nota) {
  if (nota >= 4.5) return "Excelente";      // si entra aquí, ya salió
  if (nota >= 3.0) return "Aprobado";
  return "Reprobado";
}
console.log(clasificar(4.8), "|", clasificar(3.5), "|", clasificar(2.0));

// Código después de un return NO se ejecuta (código muerto):
function ejemploMuerto() {
  return "primero";
  console.log("esto nunca se imprime");
}
console.log(ejemploMuerto());

// Una función SIN return devuelve undefined:
function soloImprime(texto) {
  console.log("  (dentro)", texto);
}
const resultado = soloImprime("hola");
console.log("Sin return devuelve:", resultado);

// DIFERENCIA CLAVE (error muy común):
//   console.log  -> MUESTRA algo en pantalla. No sirve para seguir calculando.
//   return       -> ENTREGA un valor para usarlo después.
function malo(a, b) {
  console.log(a + b);        // solo se ve, no se puede usar
}
function bueno(a, b) {
  return a + b;              // se puede guardar y reutilizar
}
const suma = bueno(2, 3) * 10;
console.log("Con return se puede seguir operando:", suma);

// Para devolver VARIOS valores, se usa un objeto o un arreglo:
function analizarNumeros(numeros) {
  return {
    cantidad: numeros.length,
    suma: numeros.reduce((a, b) => a + b, 0),
    maximo: Math.max(...numeros),
    minimo: Math.min(...numeros),
  };
}
console.log(analizarNumeros([4, 9, 2, 7]));


// --------------------------------------------------------------------------
// 5. ARROW FUNCTIONS (funciones flecha, ES6)
// --------------------------------------------------------------------------
console.log("\n=== 5. Arrow functions ===");

// Evolución de la sintaxis, todas hacen lo mismo:
const doble1 = function (n) { return n * 2; };        // expresión clásica
const doble2 = (n) => { return n * 2; };              // arrow con llaves
const doble3 = (n) => n * 2;                          // return implícito
const doble4 = n => n * 2;                            // sin paréntesis (1 parámetro)

console.log(doble1(5), doble2(5), doble3(5), doble4(5));

// Reglas:
//   - Un solo parámetro: los paréntesis son opcionales.
//   - Sin parámetros o con varios: los paréntesis son OBLIGATORIOS.
//   - Cuerpo de una sola expresión: se puede omitir { } y return.
//   - Para devolver un OBJETO directamente hay que envolverlo en paréntesis.

const saludar = () => "¡Hola!";                        // sin parámetros
const multiplicar = (a, b) => a * b;                   // varios parámetros
const crearUsuario = (nombre) => ({ nombre, activo: true });  // objeto: ({...})

console.log(saludar(), "|", multiplicar(4, 5), "|", crearUsuario("Ana"));

// DÓNDE BRILLAN: como callbacks de los métodos de arreglos.
const numeros = [1, 2, 3, 4, 5, 6];
console.log("Dobles :", numeros.map((n) => n * 2));
console.log("Pares  :", numeros.filter((n) => n % 2 === 0));
console.log("Suma   :", numeros.reduce((a, b) => a + b, 0));

// DIFERENCIA IMPORTANTE con function: las arrow NO tienen su propio "this",
// así que NO sirven como métodos de un objeto (ver tema 5).
const persona = {
  nombre: "Ana",
  metodoNormal() { return `Soy ${this.nombre}`; },
  metodoArrow: () => `Soy ${this?.nombre}`,
};
console.log("Método normal:", persona.metodoNormal());
console.log("Método arrow :", persona.metodoArrow(), "<- this se pierde");


// --------------------------------------------------------------------------
// 6. LAS FUNCIONES SON VALORES (ciudadanas de primera clase)
// --------------------------------------------------------------------------
// En JavaScript una función es un valor más: se puede guardar en variables,
// meter en arreglos y objetos, pasar como argumento y devolver desde otra
// función. Esto es lo que hace posible map, filter, forEach y los eventos.

console.log("\n=== 6. Funciones como valores ===");

// (a) Guardada en una variable
const operacion = sumar;
console.log("En variable:", operacion(10, 5));

// (b) Dentro de un objeto o arreglo
const calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
};
console.log("En objeto:", calculadora.multiplicar(6, 7));

const operaciones = [(n) => n + 1, (n) => n * 2, (n) => n ** 2];
for (const op of operaciones) {
  console.log("  Aplicando a 5 ->", op(5));
}

// (c) PASADA COMO ARGUMENTO (callback)
function aplicarA(numeros, funcion) {
  const resultado = [];
  for (const n of numeros) {
    resultado.push(funcion(n));
  }
  return resultado;
}
console.log("Callback:", aplicarA([1, 2, 3], (n) => n * 100));

// (d) DEVUELTA por otra función (función que fabrica funciones)
function crearMultiplicador(factor) {
  return function (numero) {
    return numero * factor;       // recuerda el "factor" -> esto es un CLOSURE
  };
}
const triple = crearMultiplicador(3);
const porDiez = crearMultiplicador(10);
console.log("triple(7):", triple(7), "| porDiez(7):", porDiez(7));


// --------------------------------------------------------------------------
// 7. ÁMBITO DENTRO DE LAS FUNCIONES
// --------------------------------------------------------------------------
console.log("\n=== 7. Ámbito ===");

const mensajeGlobal = "visible en todas partes";

function demostrarAmbito() {
  const mensajeLocal = "solo vive aquí dentro";
  console.log("  Dentro veo ambos:", mensajeGlobal, "/", mensajeLocal);
}
demostrarAmbito();
// console.log(mensajeLocal);     // ReferenceError

// Los parámetros son variables locales: modificar un primitivo dentro
// NO afecta a la variable de afuera.
let valorOriginal = 10;
function intentarCambiar(numero) {
  numero = 999;
  return numero;
}
console.log("  Devuelve:", intentarCambiar(valorOriginal), "| Original:", valorOriginal);

// PERO si el argumento es un OBJETO, se pasa la referencia y sí se modifica:
const usuarioOriginal = { nombre: "Ana" };
function cambiarNombre(usuario) {
  usuario.nombre = "MODIFICADO";
}
cambiarNombre(usuarioOriginal);
console.log("  Objeto modificado:", usuarioOriginal);


// --------------------------------------------------------------------------
// 8. BUENAS PRÁCTICAS
// --------------------------------------------------------------------------
//   1. Una función, UNA responsabilidad. Si necesitas la palabra "y" para
//      describirla, probablemente deban ser dos funciones.
//   2. Nombres en verbo: calcularTotal, validarCorreo, obtenerUsuario.
//   3. Pocos parámetros (3 como máximo). Si son más, pasa un objeto.
//   4. Que devuelva (return) en vez de imprimir: así se puede reutilizar y probar.
//   5. Evita depender de variables globales: recibe todo por parámetros.

console.log("\n=== 8. Ejemplo completo bien escrito ===");

const IVA = 0.19;

const calcularSubtotal = (precio, cantidad) => precio * cantidad;
const calcularDescuento = (subtotal) => (subtotal > 200000 ? subtotal * 0.1 : 0);
const calcularIva = (base) => base * IVA;

function generarPedido({ producto, precio, cantidad }) {
  const subtotal = calcularSubtotal(precio, cantidad);
  const descuento = calcularDescuento(subtotal);
  const base = subtotal - descuento;
  const iva = calcularIva(base);

  return {
    producto,
    subtotal,
    descuento,
    iva: Math.round(iva),
    total: Math.round(base + iva),
  };
}

console.log(generarPedido({ producto: "Monitor", precio: 850000, cantidad: 2 }));

console.log("\n=== Fin del tema 12 · Fin de la Unidad 3 ===");
