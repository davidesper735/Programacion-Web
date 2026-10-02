log("1. Empieza el script: se registran los listeners");

// --- 1. onclick frente a addEventListener -------------------------------------
const btnA = document.getElementById("btn-a");
btnA.onclick = () => log("A → primer onclick");
btnA.onclick = () => log("A → segundo onclick (el primero se ha perdido)");

const btnB = document.getElementById("btn-b");
btnB.addEventListener("click", () => log("B → primer listener"));
btnB.addEventListener("click", () => log("B → segundo listener"));

// --- 2. removeEventListener -----------------------------------------------------
const objetivo = document.getElementById("btn-objetivo");

function alHacerClic() {
  log("Objetivo → alHacerClic()");
}

objetivo.addEventListener("click", alHacerClic);
objetivo.addEventListener("click", () => log("Objetivo → listener anónimo (imposible de quitar)"));

document.getElementById("btn-quitar").addEventListener("click", () => {
  objetivo.removeEventListener("click", alHacerClic);
  log('removeEventListener("click", alHacerClic) ✅');
});

document.getElementById("btn-poner").addEventListener("click", () => {
  objetivo.addEventListener("click", alHacerClic); // si ya estaba, no se duplica
  log('addEventListener("click", alHacerClic)');
});

document.getElementById("btn-quitar-anonimo").addEventListener("click", () => {
  objetivo.removeEventListener("click", () => log("Objetivo → listener anónimo (imposible de quitar)"));
  log("removeEventListener con una flecha nueva → no quita nada (es otra función) ❌");
});

// --- 3. once -------------------------------------------------------------------
document.getElementById("btn-once").addEventListener(
  "click",
  (event) => {
    log("once → ¡hola! A partir de ahora ya no respondo");
    event.currentTarget.textContent = "Ya no respondo";
  },
  { once: true }
);

// --- 4. AbortController ---------------------------------------------------------
const rastreador = document.getElementById("rastreador");
let controlador;

function activarRastreador() {
  controlador = new AbortController();
  const { signal } = controlador;

  rastreador.addEventListener("pointermove", (e) => {
    rastreador.textContent = `pointermove → x: ${e.offsetX}, y: ${e.offsetY}`;
  }, { signal });

  rastreador.addEventListener("click", () => log("rastreador → click"), { signal });

  document.addEventListener("keydown", (e) => log(`document → keydown "${e.key}"`), { signal });

  log("Rastreador ACTIVADO (3 listeners)");
}

document.getElementById("btn-parar").addEventListener("click", () => {
  controlador.abort();
  rastreador.textContent = "Listeners eliminados";
  log("controlador.abort() → los 3 listeners eliminados de golpe");
});

document.getElementById("btn-reanudar").addEventListener("click", () => {
  controlador.abort(); // por si ya estaba activo: evita duplicar listeners
  activarRastreador();
});

document.getElementById("btn-limpiar").addEventListener("click", limpiarLog);

activarRastreador();
log("2. Fin del script. A partir de aquí todo ocurre cuando el usuario interactúa.");
