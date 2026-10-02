const zona = document.getElementById("zona");
const campoSelector = document.getElementById("selector");

// --- Probador de selectores -------------------------------------------------

function probarSelector() {
  limpiarLog();
  zona.querySelectorAll(".resaltado").forEach((el) => el.classList.remove("resaltado"));

  const selector = campoSelector.value.trim();
  if (!selector) return;

  try {
    // Buscamos solo dentro de la zona de pruebas
    const encontrados = zona.querySelectorAll(selector);
    encontrados.forEach((el) => el.classList.add("resaltado"));
    log(`zona.querySelectorAll('${selector}')`);
    log(encontrados);
    log(`\nzona.querySelector('${selector}') →`, zona.querySelector(selector));
  } catch (error) {
    log(`${error.name}: ${error.message}`);
  }
}

campoSelector.addEventListener("input", probarSelector);

// --- Colecciones vivas y estáticas -----------------------------------------

const lista = zona.querySelector(".tareas");

// Las dos colecciones se crean UNA sola vez, al cargar la página
const viva = lista.getElementsByTagName("li");     // HTMLCollection (viva)
const estatica = lista.querySelectorAll("li");     // NodeList (estática)

function mostrarContadores(accion) {
  limpiarLog();
  log(accion);
  log(`getElementsByTagName("li").length → ${viva.length}   (HTMLCollection VIVA)`);
  log(`querySelectorAll("li").length     → ${estatica.length}   (NodeList ESTÁTICA)`);
}

let contador = 4;

document.getElementById("btn-anadir").addEventListener("click", () => {
  const li = document.createElement("li");
  li.dataset.id = contador;
  li.textContent = `Tarea nueva ${contador}`;
  contador++;
  lista.append(li);
  mostrarContadores("Se ha añadido un <li>");
});

document.getElementById("btn-quitar").addEventListener("click", () => {
  lista.lastElementChild?.remove();
  mostrarContadores("Se ha quitado el último <li>");
});

probarSelector();
