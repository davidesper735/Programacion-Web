const estado = document.getElementById("estado");
const lista = document.getElementById("lista");
const selectUrl = document.getElementById("url");
const chkOk = document.getElementById("chk-ok");

// Retardo artificial para que se vea el estado "Cargando…" (en una app real no existe)
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

function mostrarEstado(texto, tipo = "") {
  estado.textContent = texto;
  estado.className = tipo;
}

function crearItem(usuario) {
  const li = document.createElement("li");
  const nombre = document.createElement("strong");
  const detalle = document.createElement("small");
  nombre.textContent = usuario.name;
  detalle.textContent = ` · ${usuario.email} · ${usuario.address.city}`;
  li.append(nombre, detalle);
  return li;
}

async function cargar() {
  const url = selectUrl.value;
  mostrarEstado("Cargando…", "cargando");
  lista.replaceChildren();

  try {
    log(`→ await fetch("${url}")`);
    await esperar(1000);
    const respuesta = await fetch(url);
    log(`← Response  status: ${respuesta.status}  ok: ${respuesta.ok}`);

    if (chkOk.checked && !respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    const usuarios = await respuesta.json();
    log(`← await respuesta.json() → ${Array.isArray(usuarios) ? `array de ${usuarios.length}` : JSON.stringify(usuarios)}`);

    if (usuarios.length === 0) {
      mostrarEstado("No hay usuarios.");
      return;
    }

    lista.replaceChildren(...usuarios.map(crearItem));
    mostrarEstado(`${usuarios.length} usuarios`);
  } catch (error) {
    log(`✖ catch → ${error.name}: ${error.message}`);
    mostrarEstado(`No se han podido cargar los usuarios (${error.message})`, "error");
  }
}

document.getElementById("btn-cargar").addEventListener("click", () => {
  limpiarLog();
  log("antes de llamar a cargar()");
  cargar();
  log("después de llamar a cargar()  ← se imprime antes que los datos");
});
