// --- 1. Leer ----------------------------------------------------------------
const parrafo = document.getElementById("parrafo");

document.getElementById("btn-leer").addEventListener("click", () => {
  limpiarLog();
  log("textContent →", JSON.stringify(parrafo.textContent));
  log("innerText   →", JSON.stringify(parrafo.innerText));
  log("innerHTML   →", JSON.stringify(parrafo.innerHTML));
});

// --- 2. Escribir ------------------------------------------------------------
const destino = document.getElementById("destino");
const campoNuevo = document.getElementById("nuevo");

document.querySelectorAll("[data-propiedad]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const propiedad = boton.dataset.propiedad;
    destino[propiedad] = campoNuevo.value;
    log(`destino.${propiedad} = ${JSON.stringify(campoNuevo.value)}`);
    log(`   → hijos resultantes: ${formatear(destino.childNodes)}`);
  });
});

// --- 3. XSS -----------------------------------------------------------------
const comentarios = document.getElementById("comentarios");
const campoComentario = document.getElementById("comentario");

document.getElementById("btn-vulnerable").addEventListener("click", () => {
  // ❌ NUNCA hagas esto con datos del usuario
  comentarios.innerHTML += `<li>${campoComentario.value}</li>`;
  log("Publicado con innerHTML (vulnerable)");
});

document.getElementById("btn-seguro").addEventListener("click", () => {
  // ✅ El texto se muestra tal cual, nunca se interpreta como HTML
  const li = document.createElement("li");
  li.textContent = campoComentario.value;
  comentarios.append(li);
  log("Publicado con textContent (seguro)");
});

document.getElementById("btn-vaciar").addEventListener("click", () => {
  comentarios.replaceChildren();
});

// --- 4. innerHTML += ---------------------------------------------------------
const lista = document.getElementById("lista");
let n = 1;

document.getElementById("btn-inner-mas").addEventListener("click", () => {
  const primerInput = lista.querySelector("input");
  lista.innerHTML += `<li>Elemento ${n++} (innerHTML +=)</li>`;
  log(`innerHTML += → ¿el <input> original sigue en el DOM? ${primerInput.isConnected}`);
});

document.getElementById("btn-append").addEventListener("click", () => {
  const primerInput = lista.querySelector("input");
  const li = document.createElement("li");
  li.textContent = `Elemento ${n++} (append)`;
  lista.append(li);
  log(`append()     → ¿el <input> original sigue en el DOM? ${primerInput.isConnected}`);
});
