/* ==========================================================================
   TEMA 2 · JAVASCRIPT DEL LADO CLIENTE
   --------------------------------------------------------------------------
   Objetivos:
     - Distinguir lado cliente (navegador) de lado servidor.
     - Saber qué PUEDE y qué NO PUEDE hacer JS en el navegador.
     - Usar alert(), prompt(), confirm() y console.log().

   Cómo ejecutar:
     node teoria.js        -> la parte conceptual
     abrir demo.html       -> la parte del navegador (alert, prompt, DOM)
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. CLIENTE vs SERVIDOR
// --------------------------------------------------------------------------
// CLIENTE  = el navegador del usuario (Chrome, Firefox...). El código viaja
//            hasta su computador y se ejecuta AHÍ.
// SERVIDOR = la máquina donde vive el sitio. El código se ejecuta ALLÁ y el
//            usuario solo recibe el resultado.
//
//   Usuario escribe la URL
//        |
//        v
//   [ SERVIDOR ] --- envía HTML + CSS + JS --->  [ CLIENTE / NAVEGADOR ]
//   Node.js, PHP, Java                            ejecuta el JS recibido
//   consulta base de datos                        pinta la página
//
// Consecuencia clave de SEGURIDAD:
//   Todo el JavaScript del lado cliente es VISIBLE para el usuario
//   (clic derecho -> Ver código fuente). Por eso NUNCA se ponen ahí
//   contraseñas, claves de API ni validaciones de seguridad definitivas.
//   La validación del cliente es por COMODIDAD; la del servidor es la real.

const comparacion = [
  { aspecto: "Dónde corre",   cliente: "Navegador del usuario", servidor: "Máquina del sitio web" },
  { aspecto: "Quién lo ve",   cliente: "Cualquiera",            servidor: "Nadie (es privado)" },
  { aspecto: "Base de datos", cliente: "No accede directamente", servidor: "Sí accede" },
  { aspecto: "Archivos",      cliente: "No accede al disco",     servidor: "Sí accede" },
  { aspecto: "Ejemplo",       cliente: "Validar un formulario",  servidor: "Guardar el pedido" },
];

console.log("=== 1. Cliente vs Servidor ===");
console.table(comparacion);


// --------------------------------------------------------------------------
// 2. QUÉ PUEDE HACER JAVASCRIPT EN EL NAVEGADOR
// --------------------------------------------------------------------------
// - Modificar el contenido y los estilos de la página (el DOM):
//       document.querySelector("h1").textContent = "Nuevo título";
// - Reaccionar a acciones del usuario: clics, teclado, scroll, envío de formularios.
// - Validar formularios antes de enviarlos.
// - Pedir datos a un servidor sin recargar la página (fetch / AJAX).
// - Guardar información en el navegador (localStorage, cookies).
// - Crear animaciones, juegos, mapas, gráficas.

const puedeHacer = [
  "Cambiar textos, imágenes y estilos de la página",
  "Responder a clics y al teclado",
  "Validar formularios antes de enviarlos",
  "Pedir datos al servidor con fetch (sin recargar)",
  "Guardar datos en localStorage",
  "Abrir ventanas y mostrar mensajes al usuario",
];

console.log("\n=== 2. Lo que SÍ puede hacer en el navegador ===");
puedeHacer.forEach((accion, i) => console.log(`  ${i + 1}. ${accion}`));


// --------------------------------------------------------------------------
// 3. QUÉ NO PUEDE HACER (por seguridad: el "sandbox")
// --------------------------------------------------------------------------
// El navegador encierra al JS en una caja de arena (sandbox). No puede:
// - Leer o escribir archivos de tu disco duro sin que TÚ los selecciones.
// - Ejecutar programas de tu computador.
// - Acceder a la webcam, el micrófono o tu ubicación sin permiso explícito.
// - Leer los datos de OTRA pestaña o de otro dominio
//   (política del mismo origen / CORS).
// - Conectarse directamente a una base de datos.

const noPuedeHacer = [
  "Leer archivos de tu disco sin tu autorización",
  "Instalar o ejecutar programas",
  "Usar cámara, micrófono o GPS sin permiso",
  "Leer el contenido de otra pestaña o de otro dominio",
  "Conectarse directamente a una base de datos",
];

console.log("\n=== 3. Lo que NO puede hacer ===");
noPuedeHacer.forEach((accion, i) => console.log(`  ${i + 1}. ${accion}`));


// --------------------------------------------------------------------------
// 4. LAS TRES VENTANAS DEL NAVEGADOR: alert, prompt, confirm
// --------------------------------------------------------------------------
// Son funciones del objeto window y SOLO existen en el navegador.
// Por eso este archivo, ejecutado con Node, no puede usarlas de verdad.
//
//   alert("texto")        -> muestra un mensaje. Devuelve undefined.
//   prompt("pregunta")    -> pide un dato. Devuelve STRING o null (si cancela).
//   confirm("pregunta")   -> pregunta sí/no. Devuelve true o false.
//
// Las tres son BLOQUEANTES: la página se congela hasta que el usuario responde.
// Por eso en aplicaciones reales se usan modales hechos con HTML/CSS.
//
// ATENCIÓN (error clásico de examen):
//   prompt SIEMPRE devuelve texto, aunque el usuario escriba un número.
//       const edad = prompt("Edad:");   // "20"  <- string
//       edad + 1                        // "201" <- concatenación, NO suma
//   Solución: convertir con Number(edad) o parseInt(edad).

console.log("\n=== 4. Simulación de prompt (sin navegador) ===");

// Simulamos lo que devolvería prompt("¿Cuál es tu edad?") si el usuario
// escribe 20, para ver el problema del tipo de dato:
const edadTexto = "20";                 // esto es lo que devuelve prompt
console.log("Valor devuelto:", edadTexto, "| tipo:", typeof edadTexto);
console.log("Sin convertir:  edadTexto + 1 =", edadTexto + 1, "  <-- ¡mal!");

const edadNumero = Number(edadTexto);   // conversión correcta
console.log("Convertido:     edadNumero + 1 =", edadNumero + 1, "  <-- bien");


// --------------------------------------------------------------------------
// 5. console.log NO ES alert
// --------------------------------------------------------------------------
// alert       -> lo ve el USUARIO. Interrumpe. Se usa poquísimo en producción.
// console.log -> lo ve el PROGRAMADOR en la consola (F12). No interrumpe.
//                Es la herramienta #1 para depurar (encontrar errores).
//
// Regla de clase: para probar y depurar, console.log.
//                 alert solo cuando queremos detener al usuario.

console.log("\n=== 5. Depurando con console.log ===");
const producto = { nombre: "Teclado", precio: 120000, stock: 8 };
console.log("Producto completo:", producto);
console.log("Solo el precio:", producto.precio);

console.log("\n=== Fin del tema 2 · abre demo.html para la parte del navegador ===");
