// --- 1. Teclado ----------------------------------------------------------------
const spanTecla = document.getElementById("tecla");
const buscador = document.getElementById("buscador");

document.addEventListener("keydown", (event) => {
  spanTecla.textContent = `key: ${JSON.stringify(event.key)} · code: "${event.code}" · repeat: ${event.repeat}`;

  const escribiendo = event.target.closest("input, textarea, select, [contenteditable]");
  if (escribiendo) return; // no interferir con la escritura

  if (event.key === "/") {
    event.preventDefault(); // si no, el "/" se escribiría en el buscador al enfocarlo
    buscador.focus();
    log('Atajo "/" → buscador enfocado');
  }
});

// --- 2. Pointer Events + teclado para mover la ficha ------------------------
const tablero = document.getElementById("tablero");
const ficha = document.getElementById("ficha");
const infoPuntero = document.getElementById("info-puntero");
let inicio = null;

function colocar(x, y) {
  // Mantener la ficha dentro del tablero
  const maxX = tablero.clientWidth - ficha.offsetWidth;
  const maxY = tablero.clientHeight - ficha.offsetHeight;
  ficha.style.left = `${Math.min(Math.max(0, x), maxX)}px`;
  ficha.style.top = `${Math.min(Math.max(0, y), maxY)}px`;
}

ficha.addEventListener("pointerdown", (event) => {
  inicio = { x: event.clientX - ficha.offsetLeft, y: event.clientY - ficha.offsetTop };
  ficha.setPointerCapture(event.pointerId);
  infoPuntero.textContent = `pointerdown · pointerType: "${event.pointerType}" · pressure: ${event.pressure}`;
});

ficha.addEventListener("pointermove", (event) => {
  if (!inicio) return;
  colocar(event.clientX - inicio.x, event.clientY - inicio.y);
});

ficha.addEventListener("pointerup", (event) => {
  inicio = null;
  infoPuntero.textContent = `pointerup · pointerType: "${event.pointerType}"`;
});

// Con el foco en la ficha (Tab), se mueve con las flechas
const PASO = 20;
const DIRECCIONES = {
  ArrowUp: [0, -PASO],
  ArrowDown: [0, PASO],
  ArrowLeft: [-PASO, 0],
  ArrowRight: [PASO, 0],
};

ficha.addEventListener("keydown", (event) => {
  const direccion = DIRECCIONES[event.key];
  if (!direccion) return;
  event.preventDefault(); // que las flechas no hagan scroll de la página
  colocar(ficha.offsetLeft + direccion[0], ficha.offsetTop + direccion[1]);
});

// --- 3. Throttle y debounce -------------------------------------------------------
function debounce(fn, espera = 300) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => fn(...args), espera);
  };
}

function throttle(fn, intervalo = 100) {
  let ultima = 0;
  return (...args) => {
    const ahora = Date.now();
    if (ahora - ultima >= intervalo) {
      ultima = ahora;
      fn(...args);
    }
  };
}

const contadores = { total: 0, throttle: 0, debounce: 0 };

function incrementar(nombre) {
  contadores[nombre]++;
  document.getElementById(`c-${nombre}`).textContent = contadores[nombre];
}

const conThrottle = throttle(() => incrementar("throttle"), 200);
const conDebounce = debounce(() => incrementar("debounce"), 300);

for (const tipo of ["resize", "scroll"]) {
  window.addEventListener(tipo, () => {
    incrementar("total");
    conThrottle();
    conDebounce();
  }, { passive: true });
}

// --- 4. CustomEvent ----------------------------------------------------------------
document.getElementById("productos").addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-id]");
  if (!boton) return;

  boton.dispatchEvent(new CustomEvent("carrito:añadido", {
    detail: { id: Number(boton.dataset.id), nombre: boton.dataset.nombre },
    bubbles: true,
  }));
});

// Otra parte de la aplicación, que no sabe nada de los botones
let unidades = 0;
document.addEventListener("carrito:añadido", (event) => {
  unidades++;
  document.getElementById("carrito").textContent = `🛒 ${unidades}`;
  log(`document ← "carrito:añadido" · detail: ${JSON.stringify(event.detail)}`);
});
