const textosIniciales = ["Comprar pan", "Estudiar DOM", "Hacer deporte"];
let siguienteId = 1;

function crearTarea(texto, conAcciones) {
  const li = document.createElement("li");
  li.dataset.id = siguienteId++;

  const span = document.createElement("span");
  span.className = "texto";
  span.textContent = `#${li.dataset.id} ${texto}`;
  li.append(span);

  if (conAcciones) {
    li.append(crearBoton("✓", "completar"), crearBoton("↑", "subir"));
  }
  li.append(crearBoton("✕", "borrar"));
  return li;
}

function crearBoton(simbolo, accion) {
  const boton = document.createElement("button");
  boton.className = "secondary";
  boton.dataset.accion = accion;
  // El símbolo va dentro de un <span> para que event.target pueda ser el span y no el botón
  const span = document.createElement("span");
  span.textContent = simbolo;
  boton.append(span);
  boton.title = accion;
  return boton;
}

// ============================================================================
// ❌ Izquierda: un listener por botón
// ============================================================================
const listaIndividual = document.getElementById("lista-individual");
const contadorIndividual = document.getElementById("contador-individual");
let listenersIndividuales = 0;

function registrarListeners() {
  listaIndividual.querySelectorAll('[data-accion="borrar"]').forEach((boton) => {
    boton.addEventListener("click", () => {
      const li = boton.closest("li");
      log(`[individual] borrar tarea #${li.dataset.id}`);
      li.remove();
    });
    listenersIndividuales++;
  });
  contadorIndividual.textContent = `Listeners registrados: ${listenersIndividuales}`;
}

function pintarIndividual() {
  // Reutiliza los mismos <li> (los listeners antiguos siguen ahí) y vuelve a registrar
  registrarListeners();
  log("[individual] Repintado: se han vuelto a registrar los listeners… también en los botones que ya tenían uno");
}

textosIniciales.forEach((t) => listaIndividual.append(crearTarea(t, false)));
registrarListeners();

document.getElementById("btn-anadir-individual").addEventListener("click", () => {
  listaIndividual.append(crearTarea("Tarea nueva", false));
  log("[individual] Tarea añadida… pero su botón no tiene listener");
});

document.getElementById("btn-repintar-individual").addEventListener("click", pintarIndividual);

// ============================================================================
// ✅ Derecha: delegación
// ============================================================================
const listaDelegada = document.getElementById("lista-delegada");

listaDelegada.addEventListener("click", (event) => {
  const boton = event.target.closest("[data-accion]");
  if (!boton) return;

  const li = boton.closest("li");
  log(`[delegada] target: ${formatear(event.target)} → closest: <button data-accion="${boton.dataset.accion}"> en tarea #${li.dataset.id}`);

  switch (boton.dataset.accion) {
    case "completar":
      li.classList.toggle("hecha");
      break;
    case "subir":
      li.previousElementSibling?.before(li);
      break;
    case "borrar":
      li.remove();
      break;
  }
});

function pintarDelegada() {
  listaDelegada.replaceChildren(...textosIniciales.map((t) => crearTarea(t, true)));
}

pintarDelegada();

document.getElementById("btn-anadir-delegada").addEventListener("click", () => {
  listaDelegada.append(crearTarea("Tarea nueva", true));
  log("[delegada] Tarea añadida: funciona sin registrar nada");
});

document.getElementById("btn-repintar-delegada").addEventListener("click", () => {
  pintarDelegada();
  log("[delegada] Lista repintada desde cero: sigue habiendo 1 solo listener");
});

document.getElementById("btn-limpiar").addEventListener("click", limpiarLog);
