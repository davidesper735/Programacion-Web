/* ==========================================================================
   TEMA 6 · MÉTODOS DE OBJETOS NATIVOS
   String · Number · Math · Date
   --------------------------------------------------------------------------
   Objetivos:
     - Usar los métodos más frecuentes de String y Number.
     - Resolver cálculos con Math.
     - Manejar fechas con Date.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 0. ¿POR QUÉ UN STRING TIENE MÉTODOS SI ES UN PRIMITIVO?
// --------------------------------------------------------------------------
// Cuando escribimos  "hola".toUpperCase()  JavaScript envuelve temporalmente
// el primitivo en un objeto String, ejecuta el método y devuelve el resultado.
// Se llama "boxing" o envoltura automática. Por eso podemos usar métodos
// sobre textos y números aunque no sean objetos.
//
// REGLA IMPORTANTE: los métodos de String NUNCA modifican el original
// (los strings son inmutables). SIEMPRE devuelven un valor nuevo.

console.log("=== 0. Inmutabilidad ===");
const saludo = "hola";
saludo.toUpperCase();                       // se calcula y se pierde
console.log("Original:", saludo);           // "hola" -> no cambió
const saludoMayus = saludo.toUpperCase();   // hay que GUARDAR el resultado
console.log("Guardado:", saludoMayus);


// ==========================================================================
// 1. STRING
// ==========================================================================
console.log("\n=== 1. Métodos de String ===");

const frase = "  Programación Web en JavaScript  ";

console.log("length          ->", frase.length);              // propiedad, sin ()
console.log("trim()          ->", `"${frase.trim()}"`);       // quita espacios
console.log("toUpperCase()   ->", frase.trim().toUpperCase());
console.log("toLowerCase()   ->", frase.trim().toLowerCase());

const limpia = frase.trim();

console.log("charAt(0)       ->", limpia.charAt(0));
console.log("limpia[0]       ->", limpia[0]);                 // equivalente
console.log("indexOf('Web')  ->", limpia.indexOf("Web"));     // posición o -1
console.log("includes('Java')->", limpia.includes("Java"));   // true/false
console.log("startsWith('Pro')->", limpia.startsWith("Pro"));
console.log("endsWith('Script')->", limpia.endsWith("Script"));

console.log("slice(0, 13)    ->", limpia.slice(0, 13));       // del 0 al 12
console.log("slice(-10)      ->", limpia.slice(-10));         // últimos 10
console.log("substring(14,17)->", limpia.substring(14, 17));
console.log("replace()       ->", limpia.replace("Web", "Móvil"));
console.log("replaceAll()    ->", "a-b-a-b".replaceAll("a", "X"));
console.log("repeat(3)       ->", "ab".repeat(3));
console.log("split(' ')      ->", limpia.split(" "));         // string -> arreglo
console.log("padStart(5,'0') ->", "42".padStart(5, "0"));     // "00042"
console.log("concat          ->", "Hola".concat(" ", "mundo"));

// Caso práctico: normalizar el correo que escribió un usuario
const correoUsuario = "  ANA.Perez@Gmail.COM ";
const correoLimpio = correoUsuario.trim().toLowerCase();
console.log("Correo normalizado:", correoLimpio);

// Caso práctico: iniciales
const nombreCompleto = "ana maria perez gomez";
const iniciales = nombreCompleto
  .split(" ")
  .map((palabra) => palabra.charAt(0).toUpperCase())
  .join(".");
console.log("Iniciales:", iniciales);


// ==========================================================================
// 2. NUMBER
// ==========================================================================
console.log("\n=== 2. Métodos de Number ===");

const numero = 1234.56789;

console.log("toFixed(2)      ->", numero.toFixed(2));        // "1234.57" (string!)
console.log("typeof toFixed  ->", typeof numero.toFixed(2)); // string
console.log("toPrecision(6)  ->", numero.toPrecision(6));
console.log("toString()      ->", (255).toString());
console.log("toString(2)     ->", (255).toString(2));        // binario
console.log("toString(16)    ->", (255).toString(16));       // hexadecimal

// Métodos estáticos (se llaman sobre Number, no sobre el número):
console.log("Number.parseInt('42.9px') ->", Number.parseInt("42.9px"));
console.log("Number.parseFloat('42.9') ->", Number.parseFloat("42.9"));
console.log("Number.isInteger(10)      ->", Number.isInteger(10));
console.log("Number.isInteger(10.5)    ->", Number.isInteger(10.5));
console.log("Number.isNaN('hola' * 2)  ->", Number.isNaN("hola" * 2));
console.log("Number.MAX_SAFE_INTEGER   ->", Number.MAX_SAFE_INTEGER);

// Formatear moneda colombiana (muy útil en proyectos):
const precio = 1250000;
console.log("Moneda:", precio.toLocaleString("es-CO", { style: "currency", currency: "COP" }));
console.log("Con separadores:", precio.toLocaleString("es-CO"));


// ==========================================================================
// 3. MATH  (objeto de utilidades, NO se instancia con new)
// ==========================================================================
console.log("\n=== 3. Math ===");

console.log("Math.PI        ->", Math.PI);
console.log("Math.round(4.5)->", Math.round(4.5));    // 5  redondea normal
console.log("Math.round(4.4)->", Math.round(4.4));    // 4
console.log("Math.ceil(4.1) ->", Math.ceil(4.1));     // 5  hacia arriba
console.log("Math.floor(4.9)->", Math.floor(4.9));    // 4  hacia abajo
console.log("Math.trunc(4.9)->", Math.trunc(4.9));    // 4  corta decimales
console.log("Math.abs(-7)   ->", Math.abs(-7));       // 7  valor absoluto
console.log("Math.pow(2, 10)->", Math.pow(2, 10));    // 1024
console.log("2 ** 10        ->", 2 ** 10);            // igual, más moderno
console.log("Math.sqrt(144) ->", Math.sqrt(144));     // 12
console.log("Math.max(...)  ->", Math.max(3, 9, 1, 7));
console.log("Math.min(...)  ->", Math.min(3, 9, 1, 7));

// Math.max con un arreglo: hay que "desparramarlo" con spread
const notas = [3.5, 4.8, 2.9, 4.1];
console.log("Nota más alta:", Math.max(...notas));
console.log("Nota más baja:", Math.min(...notas));

// Números aleatorios: Math.random() devuelve un decimal entre 0 y 0.999...
console.log("Math.random()  ->", Math.random());

// Fórmula para un entero aleatorio entre min y max (ambos incluidos):
function aleatorioEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log("Dado (1-6):", aleatorioEntre(1, 6));
console.log("Lotería (1-100):", aleatorioEntre(1, 100));


// ==========================================================================
// 4. DATE
// ==========================================================================
console.log("\n=== 4. Date ===");

const ahora = new Date();                  // fecha y hora actuales
console.log("Fecha actual:", ahora.toString());

// Crear una fecha específica.
// ¡OJO! El MES empieza en 0: 0=enero, 11=diciembre.
const independencia = new Date(1810, 6, 20);   // 20 de JULIO de 1810
console.log("20 de julio de 1810:", independencia.toLocaleDateString("es-CO"));

// También se puede crear desde texto ISO (año-mes-día):
const fechaEntrega = new Date("2026-11-30T23:59:00");
console.log("Entrega:", fechaEntrega.toLocaleString("es-CO"));

// Obtener las partes de una fecha:
console.log("getFullYear() ->", fechaEntrega.getFullYear());
console.log("getMonth()    ->", fechaEntrega.getMonth(), "(0 = enero)");
console.log("getDate()     ->", fechaEntrega.getDate());
console.log("getDay()      ->", fechaEntrega.getDay(), "(0 = domingo)");
console.log("getHours()    ->", fechaEntrega.getHours());
console.log("getMinutes()  ->", fechaEntrega.getMinutes());
console.log("getTime()     ->", fechaEntrega.getTime(), "ms desde 1970");

// Formatos de salida:
console.log("toLocaleDateString:", fechaEntrega.toLocaleDateString("es-CO"));
console.log("toLocaleTimeString:", fechaEntrega.toLocaleTimeString("es-CO"));
console.log("toISOString       :", fechaEntrega.toISOString());

// Nombres en español con opciones:
const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
console.log("Formato largo:", fechaEntrega.toLocaleDateString("es-CO", opciones));

// Calcular diferencias: se restan y se obtienen milisegundos.
const inicioSemestre = new Date(2026, 0, 26);   // 26 de enero de 2026
const finSemestre = new Date(2026, 4, 30);      // 30 de mayo de 2026
const milisegundos = finSemestre - inicioSemestre;
const dias = Math.round(milisegundos / (1000 * 60 * 60 * 24));
console.log(`El semestre dura ${dias} días`);

// Calcular una edad:
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  // Si aún no ha llegado su cumpleaños este año, restamos 1.
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}
console.log("Edad de alguien nacido el 15/03/2003:", calcularEdad(new Date(2003, 2, 15)));

console.log("\n=== Fin del tema 6 ===");
