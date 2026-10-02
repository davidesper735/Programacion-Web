// ============================================================================
// Taller: directorio de usuarios — versión final
// ============================================================================

const API = "https://jsonplaceholder.typicode.com";

// --- Referencias al DOM -------------------------------------------------------
const contenedor = document.getElementById("usuarios");
const estado = document.getElementById("estado");
const buscador = document.getElementById("buscador");
const soloFavoritos = document.getElementById("solo-favoritos");
const plantilla = document.getElementById("tpl-usuario");

const detalle = document.getElementById("detalle");
const detalleTitulo = document.getElementById("detalle-titulo");
const detalleEstado = document.getElementById("detalle-estado");
const detalleLista = document.getElementById("detalle-lista");

// --- Estado de la aplicación: la fuente de verdad ------------------------------
const app = {
  usuarios: [],            // lo que devuelve la API
  texto: "",               // lo escrito en el buscador
  soloFavoritos: false,
  favoritos: new Set(leerFavoritos()),
  seleccionado: null,      // id del usuario cuyo detalle se muestra
};

// --- Utilidades ------------------------------------------------------------------
async function obtenerJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  return respuesta.json();
}

function debounce(fn, espera = 300) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => fn(...args), espera);
  };
}

function mostrarEstado(elemento, texto, tipo = "") {
  elemento.textContent = texto;
  elemento.className = tipo;
}

// Normaliza para buscar sin distinguir mayúsculas ni tildes
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function leerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("favoritos")) ?? [];
  } catch {
    return [];
  }
}

function guardarFavoritos() {
  try {
    localStorage.setItem("favoritos", JSON.stringify([...app.favoritos]));
  } catch {
    // Si el almacenamiento no está disponible, los favoritos duran solo esta sesión
  }
}

// --- Pintar ----------------------------------------------------------------------
function crearTarjeta(usuario) {
  const tarjeta = plantilla.content.firstElementChild.cloneNode(true);
  tarjeta.dataset.id = usuario.id;

  const avatar = tarjeta.querySelector(".avatar");
  avatar.textContent = usuario.name[0];
  avatar.style.setProperty("--tono", (usuario.id * 47) % 360);

  tarjeta.querySelector(".nombre").textContent = usuario.name;
  tarjeta.querySelector(".email").textContent = usuario.email;
  tarjeta.querySelector(".empresa").textContent = usuario.company.name;
  tarjeta.querySelector(".ciudad").textContent = `📍 ${usuario.address.city}`;

  const esFavorito = app.favoritos.has(usuario.id);
  tarjeta.querySelector(".favorito").setAttribute("aria-pressed", esFavorito);
  tarjeta.classList.toggle("seleccionada", usuario.id === app.seleccionado);
  return tarjeta;
}

function usuariosVisibles() {
  const texto = normalizar(app.texto.trim());
  return app.usuarios.filter((u) => {
    if (app.soloFavoritos && !app.favoritos.has(u.id)) return false;
    if (!texto) return true;
    return [u.name, u.email, u.company.name].some((campo) => normalizar(campo).includes(texto));
  });
}

function pintar() {
  const visibles = usuariosVisibles();
  contenedor.replaceChildren(...visibles.map(crearTarjeta));

  if (visibles.length === 0) {
    mostrarEstado(estado, "No hay usuarios que coincidan con la búsqueda.");
  } else {
    mostrarEstado(estado, `${visibles.length} de ${app.usuarios.length} usuarios`);
  }
}

// --- Cargar datos ------------------------------------------------------------------
async function cargarUsuarios() {
  mostrarEstado(estado, "Cargando usuarios…", "cargando");
  contenedor.replaceChildren();

  try {
    app.usuarios = await obtenerJSON(`${API}/users`);
    pintar();
  } catch (error) {
    mostrarEstado(estado, `No se han podido cargar los usuarios (${error.message}).`, "error");
  }
}

async function mostrarPublicaciones(id) {
  const usuario = app.usuarios.find((u) => u.id === id);
  app.seleccionado = id;
  pintar();

  detalle.hidden = false;
  detalleTitulo.textContent = `Publicaciones de ${usuario.name}`;
  detalleLista.replaceChildren();
  mostrarEstado(detalleEstado, "Cargando publicaciones…", "cargando");
  detalle.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const publicaciones = await obtenerJSON(`${API}/posts?userId=${id}`);
    // Si mientras tanto se ha elegido otro usuario, ignoramos esta respuesta
    if (app.seleccionado !== id) return;

    detalleLista.replaceChildren(...publicaciones.map((p) => {
      const li = document.createElement("li");
      const titulo = document.createElement("strong");
      const cuerpo = document.createElement("p");
      titulo.textContent = p.title;
      cuerpo.textContent = p.body;
      li.append(titulo, cuerpo);
      return li;
    }));
    mostrarEstado(detalleEstado, `${publicaciones.length} publicaciones`);
  } catch (error) {
    if (app.seleccionado !== id) return;
    mostrarEstado(detalleEstado, `No se han podido cargar (${error.message}).`, "error");
  }
}

function cerrarDetalle() {
  detalle.hidden = true;
  app.seleccionado = null;
  pintar();
}

// --- Eventos -----------------------------------------------------------------------

// Buscador: se filtra cuando el usuario deja de escribir 300 ms
buscador.addEventListener("input", debounce(() => {
  app.texto = buscador.value;
  pintar();
}));

soloFavoritos.addEventListener("change", () => {
  app.soloFavoritos = soloFavoritos.checked;
  pintar();
});

document.getElementById("btn-recargar").addEventListener("click", cargarUsuarios);
document.getElementById("btn-cerrar").addEventListener("click", cerrarDetalle);

// Delegación: un único listener para todas las tarjetas (presentes y futuras)
contenedor.addEventListener("click", (event) => {
  const boton = event.target.closest("[data-accion]");
  if (!boton) return;

  const id = Number(boton.closest(".tarjeta").dataset.id);

  switch (boton.dataset.accion) {
    case "favorito":
      if (app.favoritos.has(id)) app.favoritos.delete(id);
      else app.favoritos.add(id);
      guardarFavoritos();
      pintar();
      break;
    case "publicaciones":
      mostrarPublicaciones(id);
      break;
  }
});

// Atajos de teclado: "/" para buscar, Escape para cerrar el detalle
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !detalle.hidden) {
    cerrarDetalle();
    return;
  }
  const escribiendo = event.target.closest("input, textarea, select");
  if (event.key === "/" && !escribiendo) {
    event.preventDefault();
    buscador.focus();
  }
});

// --- Inicio --------------------------------------------------------------------------
cargarUsuarios();
