// --- 1. Posiciones de inserción ---------------------------------------------
const lista = document.getElementById("lista");
const htmlInicial = lista.innerHTML; // cadena fija nuestra: aquí innerHTML es seguro
let contador = 1;

function referencia() {
  return lista.querySelector(".referencia");
}

function crearNuevo() {
  const li = document.createElement("li");
  li.textContent = `Nuevo ${contador++}`;
  li.classList.add("nuevo");
  return li;
}

lista.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  referencia()?.classList.remove("referencia");
  li.classList.add("referencia");
});

document.querySelectorAll("[data-metodo]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const metodo = boton.dataset.metodo;
    const ref = referencia();
    const nuevo = crearNuevo();

    if (metodo === "prepend" || metodo === "append") {
      lista[metodo](nuevo);
      log(`lista.${metodo}(${nuevo.textContent})`);
      return;
    }
    if (!ref) return log("Elige primero una referencia haciendo clic en la lista");

    if (metodo === "replaceWith") nuevo.classList.add("referencia");
    ref[metodo](nuevo);
    log(`<li>${ref.textContent}</li>.${metodo}(${nuevo.textContent})`);
  });
});

document.getElementById("btn-mover").addEventListener("click", () => {
  const primera = lista.firstElementChild;
  if (!primera) return;
  lista.append(primera); // ya estaba en el DOM → se MUEVE, no se duplica
  log(`lista.append(primera) → "${primera.textContent}" se ha movido. Total: ${lista.children.length}`);
});

document.getElementById("btn-clonar").addEventListener("click", () => {
  const ref = referencia();
  if (!ref) return log("Elige primero una referencia");

  // Añadimos (una sola vez) un listener al original para comprobar que la copia NO lo hereda
  if (!ref.dataset.escucha) {
    ref.dataset.escucha = "sí";
    ref.addEventListener("dblclick", () => log(`dblclick en el ORIGINAL "${ref.textContent}"`));
  }

  const copia = ref.cloneNode(true);
  copia.classList.remove("referencia");
  delete copia.dataset.escucha; // el atributo sí se copia; el listener, no
  copia.textContent += " (copia)";
  ref.after(copia);
  log("cloneNode(true): haz doble clic en el original y en la copia. Solo el original responde.");
});

document.getElementById("btn-eliminar").addEventListener("click", () => {
  const ref = referencia();
  if (!ref) return log("Elige primero una referencia");
  ref.remove();
  log(`remove() → "${ref.textContent}" eliminado. ¿Sigue existiendo la variable? ${ref instanceof Node} · ¿Conectado? ${ref.isConnected}`);
});

document.getElementById("btn-reset").addEventListener("click", () => {
  lista.innerHTML = htmlInicial;
  contador = 1;
  limpiarLog();
});

// --- 2. Template ------------------------------------------------------------
const usuarios = [
  { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", color: "#3b5bdb" },
  { id: 2, nombre: "Luis Pérez", email: "luis@ejemplo.com", color: "#2b8a3e" },
  { id: 3, nombre: "<img src=x onerror=alert(1)>", email: "atacante@ejemplo.com", color: "#c92a2a" },
  { id: 4, nombre: "Marta Ruiz", email: "marta@ejemplo.com", color: "#e8590c" },
];

const tpl = document.getElementById("tpl-tarjeta");
const contenedorTarjetas = document.getElementById("tarjetas");

function crearTarjeta(usuario) {
  const tarjeta = tpl.content.firstElementChild.cloneNode(true);
  tarjeta.dataset.id = usuario.id;
  tarjeta.querySelector(".nombre").textContent = usuario.nombre; // seguro aunque traiga HTML
  tarjeta.querySelector(".email").textContent = usuario.email;
  const avatar = tarjeta.querySelector(".avatar");
  avatar.textContent = usuario.nombre[0];
  avatar.style.background = usuario.color;
  tarjeta.querySelector(".borrar").addEventListener("click", () => {
    tarjeta.remove();
    log(`Tarjeta ${usuario.id} eliminada`);
  });
  return tarjeta;
}

document.getElementById("btn-tarjetas").addEventListener("click", () => {
  contenedorTarjetas.replaceChildren(...usuarios.map(crearTarjeta));
  log(`replaceChildren(...usuarios.map(crearTarjeta)) → ${usuarios.length} tarjetas`);
  log("Fíjate en la tarjeta 3: su nombre contiene HTML, pero se muestra como texto.");
});

// --- 3. Rendimiento ---------------------------------------------------------
const masivo = document.getElementById("masivo");
const CANTIDAD = 2000;

function medir(nombre, fn) {
  masivo.replaceChildren();
  const t0 = performance.now();
  fn();
  masivo.offsetHeight; // fuerza al navegador a calcular la disposición ahora
  log(`${nombre}: ${(performance.now() - t0).toFixed(1)} ms`);
}

function crearFila(i) {
  const div = document.createElement("div");
  div.textContent = `Fila ${i}`;
  return div;
}

document.getElementById("btn-uno-a-uno").addEventListener("click", () => {
  medir("Uno a uno", () => {
    for (let i = 0; i < CANTIDAD; i++) {
      masivo.append(crearFila(i));
      masivo.offsetHeight; // lectura de layout dentro del bucle: el caso más desfavorable
    }
  });
});

document.getElementById("btn-fragmento").addEventListener("click", () => {
  medir("Fragmento", () => {
    const fragmento = document.createDocumentFragment();
    for (let i = 0; i < CANTIDAD; i++) fragmento.append(crearFila(i));
    masivo.append(fragmento);
  });
});
