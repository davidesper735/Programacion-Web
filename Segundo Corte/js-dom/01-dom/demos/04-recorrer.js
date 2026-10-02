const zona = document.getElementById("zona");
const spanActual = document.getElementById("actual");
const navegacion = document.getElementById("navegacion");

const PROPIEDADES = {
  elementos: ["parentElement", "firstElementChild", "lastElementChild", "previousElementSibling", "nextElementSibling"],
  nodos: ["parentNode", "firstChild", "lastChild", "previousSibling", "nextSibling"],
};

let actual = document.getElementById("dos");

function modo() {
  return document.querySelector('input[name="modo"]:checked').value;
}

function seleccionar(nodo) {
  zona.querySelectorAll(".resaltado").forEach((el) => el.classList.remove("resaltado"));
  actual = nodo;
  // Los nodos de texto y comentario no tienen classList: solo podemos nombrarlos
  if (nodo.nodeType === Node.ELEMENT_NODE) {
    nodo.classList.add("resaltado");
    spanActual.textContent = formatear(nodo);
  } else {
    spanActual.textContent = `${formatear(nodo)}  (no es un elemento: no se puede resaltar)`;
  }
}

function pintarBotones() {
  navegacion.replaceChildren();
  for (const propiedad of PROPIEDADES[modo()]) {
    const boton = document.createElement("button");
    boton.textContent = propiedad;
    boton.className = "secondary";
    boton.addEventListener("click", () => navegar(propiedad));
    navegacion.append(boton);
  }
}

function navegar(propiedad) {
  const destino = actual[propiedad];
  log(`${formatear(actual)}.${propiedad} → ${formatear(destino)}`);

  if (!destino) return;
  // No dejamos salir de la zona de pruebas para no perdernos por la página
  if (!zona.contains(destino)) {
    log("   (fuera de la zona de pruebas: no nos movemos)");
    return;
  }
  seleccionar(destino);
}

zona.addEventListener("click", (event) => {
  seleccionar(event.target);
  log(`clic → ${formatear(event.target)}`);
});

document.querySelectorAll('input[name="modo"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    pintarBotones();
    log(`\n— Modo ${modo()} —`);
  });
});

pintarBotones();
seleccionar(actual);
