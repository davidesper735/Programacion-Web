/* ==========================================================================
   TEMA 2 · DEMO EN EL NAVEGADOR
   Este archivo SOLO funciona abriendo demo.html (no con Node).
   ========================================================================== */

// Guardamos la referencia al div donde vamos a escribir.
const salida = document.querySelector("#salida");


// --------------------------------------------------------------------------
// alert(): muestra un mensaje. NO devuelve nada útil (undefined).
// --------------------------------------------------------------------------
document.querySelector("#btn-alert").addEventListener("click", function () {
  const resultado = alert("Soy un alert: bloqueo la página hasta que aceptes.");
  console.log("alert() devolvió:", resultado); // undefined
  salida.textContent = "alert() no devuelve ningún dato (undefined).";
});


// --------------------------------------------------------------------------
// prompt(): pide un dato. Devuelve STRING, o null si el usuario cancela.
// --------------------------------------------------------------------------
document.querySelector("#btn-prompt").addEventListener("click", function () {
  const edad = prompt("¿Cuántos años tienes?");

  console.log("prompt() devolvió:", edad, "| tipo:", typeof edad);

  if (edad === null) {
    salida.textContent = "Cancelaste el prompt (devolvió null).";
    return;
  }

  // ERROR CLÁSICO: sumar sin convertir.
  console.log("Sin convertir:", edad + 1);          // "201" -> concatena
  const edadNum = Number(edad);                      // conversión correcta
  console.log("Convertido:", edadNum + 1);           // 21   -> suma

  salida.textContent =
    `Escribiste "${edad}" (un ${typeof edad}). ` +
    `El año que viene tendrás ${edadNum + 1} años.`;
});


// --------------------------------------------------------------------------
// confirm(): pregunta sí/no. Devuelve true o false (booleano).
// --------------------------------------------------------------------------
document.querySelector("#btn-confirm").addEventListener("click", function () {
  const seguro = confirm("¿Deseas borrar el registro?");
  console.log("confirm() devolvió:", seguro, "| tipo:", typeof seguro);

  salida.textContent = seguro
    ? "Confirmaste: devolvió true."
    : "Cancelaste: devolvió false.";
});


// --------------------------------------------------------------------------
// Lo que de verdad hace JS en el cliente: MODIFICAR LA PÁGINA (el DOM).
// Esto es lo que Node.js NO puede hacer.
// --------------------------------------------------------------------------
document.querySelector("#btn-dom").addEventListener("click", function () {
  const titulo = document.querySelector("h1");

  titulo.textContent = "¡El DOM cambió desde JavaScript!";
  titulo.style.color = "#b45309";

  salida.innerHTML =
    "<strong>Esto es lado cliente:</strong> cambiamos el texto y el color " +
    "del &lt;h1&gt; sin recargar la página y sin pedirle nada al servidor.";
});


// Este mensaje se imprime al cargar la página, no al pulsar un botón.
console.log("demo.js cargado. Existe el objeto window:", typeof window !== "undefined");
