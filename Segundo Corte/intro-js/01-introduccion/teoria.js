/* ==========================================================================
   TEMA 1 · INTRODUCCIÓN A JAVASCRIPT
   --------------------------------------------------------------------------
   Objetivos:
     - Saber qué es JavaScript y de dónde viene.
     - Entender dónde se ejecuta (navegador / servidor).
     - Aprender a enlazar JS con HTML: <script>, src, defer, async.
     - Usar la consola del navegador como herramienta de trabajo.

   Cómo ejecutar:
     node teoria.js
     (para la parte del navegador, abrir demo.html)
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. ¿QUÉ ES JAVASCRIPT?
// --------------------------------------------------------------------------
// JavaScript es un lenguaje de programación:
//   - INTERPRETADO: no se compila a un .exe, se lee y ejecuta línea por línea.
//   - DE ALTO NIVEL: se parece al inglés, no manejamos memoria a mano.
//   - DINÁMICO: una variable puede cambiar de tipo mientras el programa corre.
//   - MULTIPARADIGMA: permite programar con funciones, con objetos, o mezclando.
//
// Nació para dar VIDA a las páginas web:
//   HTML  -> estructura   (el esqueleto)
//   CSS   -> presentación (la ropa)
//   JS    -> comportamiento (el movimiento)

console.log("=== 1. Mi primera línea de JavaScript ===");
console.log("¡Hola, mundo!");


// --------------------------------------------------------------------------
// 2. UN POCO DE HISTORIA (para contexto, no para memorizar)
// --------------------------------------------------------------------------
// 1995 - Brendan Eich lo crea en Netscape en 10 días. Se llamó Mocha, luego
//        LiveScript y finalmente JavaScript (puro marketing: Java estaba de moda).
//        OJO: JavaScript NO es Java. Son lenguajes distintos.
// 1997 - Se estandariza con el nombre ECMAScript (ES) para que todos los
//        navegadores lo implementen igual.
// 2009 - Aparece Node.js: JavaScript sale del navegador y llega al servidor.
// 2015 - ES6 (ECMAScript 2015), la gran actualización: let, const, arrow
//        functions, template literals, clases... Es el JS que usamos hoy.
// Hoy  - Sale una versión nueva cada año (ES2016, ES2017, ...).

const historia = [
  { anio: 1995, hecho: "Brendan Eich crea JavaScript en Netscape" },
  { anio: 1997, hecho: "Primer estándar ECMAScript" },
  { anio: 2009, hecho: "Node.js lleva JS al servidor" },
  { anio: 2015, hecho: "ES6: let, const, arrow functions..." },
];

console.log("\n=== 2. Línea de tiempo ===");
for (const evento of historia) {
  console.log(evento.anio + " -> " + evento.hecho);
}


// --------------------------------------------------------------------------
// 3. ¿DÓNDE SE EJECUTA JAVASCRIPT?
// --------------------------------------------------------------------------
// JavaScript necesita un MOTOR que lo ejecute. Los principales:
//   - V8       -> Google Chrome, Microsoft Edge y Node.js
//   - SpiderMonkey -> Firefox
//   - JavaScriptCore -> Safari
//
// Hay dos entornos de ejecución:
//
//   NAVEGADOR (lado cliente)          NODE.JS (lado servidor)
//   ------------------------          -----------------------
//   Existe: window, document          Existe: process, require, fs
//   Puede: modificar la página        Puede: leer/escribir archivos,
//          reaccionar a clics                conectarse a bases de datos
//   NO puede: leer tu disco duro      NO puede: tocar el HTML (no hay página)
//
// El código de abajo detecta dónde se está ejecutando este archivo:

console.log("\n=== 3. ¿Dónde se está ejecutando este código? ===");
if (typeof window !== "undefined") {
  console.log("Estoy en un NAVEGADOR (existe el objeto window).");
} else {
  console.log("Estoy en NODE.JS (no existe window).");
  console.log("Versión de Node:", process.version);
}


// --------------------------------------------------------------------------
// 4. CÓMO SE ENLAZA JAVASCRIPT AL HTML
// --------------------------------------------------------------------------
// Hay 3 formas. Están ordenadas de PEOR a MEJOR práctica:
//
// (a) EN LÍNEA (inline) — mezclado en el atributo de una etiqueta. NO usar.
//        <button onclick="alert('Hola')">Saludar</button>
//
// (b) INTERNO — dentro de la propia página, con <script>.
//        <script>
//          console.log("Hola desde un script interno");
//        </script>
//
// (c) EXTERNO — en un archivo .js aparte. ESTA es la forma correcta.
//        <script src="app.js"></script>
//
// Ventajas del externo: se reutiliza en varias páginas, el navegador lo
// guarda en caché, y separa estructura (HTML) de comportamiento (JS).
//
// IMPORTANTE: <script src="..."></script> SIEMPRE lleva etiqueta de cierre.
// No existe <script src="app.js" />.


// --------------------------------------------------------------------------
// 5. DÓNDE COLOCAR EL <script>: defer y async
// --------------------------------------------------------------------------
// El navegador lee el HTML de arriba hacia abajo. Si encuentra un <script>
// en el <head> sin más, SE DETIENE, lo descarga, lo ejecuta y luego sigue.
// Problema: si el script busca un elemento del <body>, todavía no existe.
//
//   <script src="app.js"></script>
//   ^ en el <head>: bloquea y el HTML aún no está listo.  MAL
//
//   <script src="app.js"></script>  (justo antes de </body>)
//   ^ funciona: el HTML ya se leyó.  ACEPTABLE
//
//   <script src="app.js" defer></script>  (en el <head>)
//   ^ descarga en paralelo y ejecuta al terminar el HTML,
//     respetando el orden de los scripts.  RECOMENDADO
//
//   <script src="app.js" async></script>  (en el <head>)
//   ^ descarga en paralelo y ejecuta APENAS termina de bajar,
//     sin respetar el orden. Útil para scripts independientes
//     (analítica, publicidad).
//
// Resumen rápido:
//   defer -> "espera a que la página esté lista" (lo que usarás el 95% del tiempo)
//   async -> "ejecútalo cuando llegue, no me importa el orden"
//
// Ver el archivo demo.html de esta carpeta para comprobarlo en vivo.


// --------------------------------------------------------------------------
// 6. LA CONSOLA DEL NAVEGADOR
// --------------------------------------------------------------------------
// Se abre con F12 (o Ctrl+Shift+I / Cmd+Option+I) -> pestaña "Console".
// Es nuestro laboratorio: ahí probamos código y vemos errores.
//
// Métodos útiles de console:

console.log("\n=== 6. Métodos de la consola ===");
console.log("console.log()   -> mensaje normal");
console.info("console.info()  -> mensaje informativo");
console.warn("console.warn()  -> advertencia (amarillo)");
console.error("console.error() -> error (rojo). No detiene el programa.");

// Se pueden imprimir varios valores separados por coma:
const nombre = "Ana";
const edad = 20;
console.log("Nombre:", nombre, "| Edad:", edad);

// console.table() muestra arreglos de objetos como tabla. Muy útil:
console.log("\nconsole.table() con la línea de tiempo:");
console.table(historia);

// Agrupar mensajes:
console.group("Datos del estudiante");
console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.groupEnd();


// --------------------------------------------------------------------------
// 7. COMENTARIOS Y PUNTO Y COMA
// --------------------------------------------------------------------------
// Comentario de una línea

/* Comentario
   de varias
   líneas */

// El punto y coma (;) al final de cada instrucción es opcional en JS,
// porque el motor lo inserta automáticamente. Pero esa inserción a veces
// falla, así que en este curso SIEMPRE lo escribimos.

console.log("\n=== Fin del tema 1 ===");
