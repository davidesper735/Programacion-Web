// --- 1. Captura y burbuja ---------------------------------------------------
const chkCaptura = document.getElementById("chk-captura");
const chkStop = document.getElementById("chk-stop");
const cajas = ["abuelo", "padre", "hijo"].map((id) => document.getElementById(id));

const FASES = { 1: "CAPTURA ", 2: "OBJETIVO", 3: "BURBUJA " };
let retardo = 0; // para iluminar las cajas una detrás de otra

function iluminar(caja, clase) {
  retardo += 350;
  setTimeout(() => caja.classList.add(clase), retardo);
  setTimeout(() => caja.classList.remove(clase), retardo + 300);
}

for (const caja of cajas) {
  caja.addEventListener("click", (event) => {
    if (!chkCaptura.checked) return;
    log(`${FASES[event.eventPhase]}  #${caja.id}`);
    iluminar(caja, "captura");
  }, { capture: true });

  caja.addEventListener("click", (event) => {
    log(`${FASES[event.eventPhase]}  #${caja.id}`);
    iluminar(caja, "burbuja");

    if (caja.id === "padre" && chkStop.checked) {
      event.stopPropagation();
      log("          ✋ stopPropagation(): el evento no llega a #abuelo");
    }
  });
}

document.getElementById("boton").addEventListener("click", (event) => {
  log(`${FASES[event.eventPhase]}  <button>  ← target`);
});

// Cada nuevo clic empieza con el registro limpio. Usamos pointerdown, que ocurre
// antes que click, para no borrar lo que registran las fases de captura.
cajas[0].addEventListener("pointerdown", () => {
  retardo = 0;
  limpiarLog();
});

// --- 2. Acciones por defecto ------------------------------------------------
const chkPrevent = document.getElementById("chk-prevent");

document.getElementById("enlace").addEventListener("click", (event) => {
  if (chkPrevent.checked) event.preventDefault();
  log(`click en <a> → defaultPrevented: ${event.defaultPrevented} (${event.defaultPrevented ? "no navega" : "navega"})`);
});

document.getElementById("formulario").addEventListener("submit", (event) => {
  if (chkPrevent.checked) event.preventDefault();
  log(`submit → defaultPrevented: ${event.defaultPrevented} (${event.defaultPrevented ? "no recarga" : "la página se recarga"})`);
});

document.getElementById("casilla").addEventListener("click", (event) => {
  if (chkPrevent.checked) event.preventDefault();
  log(`click en checkbox → defaultPrevented: ${event.defaultPrevented} (${event.defaultPrevented ? "no cambia" : "cambia"})`);
});

// --- 3. Menú y clic fuera -----------------------------------------------------
const menu = document.getElementById("menu");
const menuLista = document.getElementById("menu-lista");

document.getElementById("btn-menu").addEventListener("click", () => {
  menuLista.hidden = !menuLista.hidden;
});

// "Clic fuera": escuchamos en document gracias a la burbuja
document.addEventListener("click", (event) => {
  if (!menuLista.hidden && !menu.contains(event.target)) {
    menuLista.hidden = true;
    log("document → clic fuera del menú: se cierra");
  }
});

document.getElementById("btn-otra").addEventListener("click", (event) => {
  if (document.getElementById("chk-stop-menu").checked) {
    event.stopPropagation();
    log("Otra acción con stopPropagation() → document no se entera: el menú sigue abierto");
  } else {
    log("Otra acción");
  }
});

document.getElementById("btn-limpiar").addEventListener("click", limpiarLog);
