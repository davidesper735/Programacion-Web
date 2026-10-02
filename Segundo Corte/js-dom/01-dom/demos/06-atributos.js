// --- 1. Atributo frente a propiedad ------------------------------------------
const nombre = document.getElementById("nombre");
const acepto = document.getElementById("acepto");
const enlace = document.getElementById("enlace");

document.getElementById("btn-comparar").addEventListener("click", () => {
  limpiarLog();
  log(`input.value                → ${JSON.stringify(nombre.value)}`);
  log(`input.getAttribute("value") → ${JSON.stringify(nombre.getAttribute("value"))}`);
  log("");
  log(`checkbox.checked                 → ${acepto.checked}`);
  log(`checkbox.getAttribute("checked") → ${JSON.stringify(acepto.getAttribute("checked"))}`);
  log("");
  log(`a.href                → ${JSON.stringify(enlace.href)}`);
  log(`a.getAttribute("href") → ${JSON.stringify(enlace.getAttribute("href"))}`);
});

// --- 2. dataset ---------------------------------------------------------------
document.querySelectorAll(".producto").forEach((boton) => {
  boton.addEventListener("click", () => {
    limpiarLog();
    const { id, precio, enStock } = boton.dataset;
    log(`dataset → ${JSON.stringify(boton.dataset)}`);
    log(`dataset.enStock → ${JSON.stringify(enStock)}  (tipo: ${typeof enStock})`);
    log(`precio + 1          → ${JSON.stringify(precio + 1)}   ❌ concatena cadenas`);
    log(`Number(precio) + 1  → ${Number(precio) + 1}          ✅`);
    log(`id del producto: ${id}`);
  });
});

// --- 3. classList -------------------------------------------------------------
const tarjeta = document.getElementById("tarjeta");

document.querySelectorAll("[data-clase]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const clase = boton.dataset.clase;
    const quedaPuesta = tarjeta.classList.toggle(clase);
    log(`classList.toggle("${clase}") → ${quedaPuesta}   class="${tarjeta.className}"`);
  });
});

// --- 4. style y variables CSS -------------------------------------------------
const barraStyle = document.getElementById("barra-style");
const barraVariable = document.getElementById("barra-variable");

document.getElementById("rango-style").addEventListener("input", (event) => {
  barraStyle.style.width = event.target.value + "%"; // ¡con unidad!
  log(`barra.style.width = "${barraStyle.style.width}"   · computado: ${getComputedStyle(barraStyle).width}`);
});

document.getElementById("rango-variable").addEventListener("input", (event) => {
  barraVariable.style.setProperty("--progreso", event.target.value);
  log(`setProperty("--progreso", ${event.target.value})   · computado: width ${getComputedStyle(barraVariable).width}`);
});

document.getElementById("rango-tono").addEventListener("input", (event) => {
  barraVariable.style.setProperty("--tono", event.target.value);
  log(`setProperty("--tono", ${event.target.value})   · computado: ${getComputedStyle(barraVariable).backgroundColor}`);
});
