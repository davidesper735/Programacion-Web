# 3.2 Taller: directorio de usuarios

## Qué vamos a construir

Un directorio con los 10 usuarios de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users):

- Tarjetas con avatar, nombre, email, empresa y ciudad.
- Buscador en vivo (por nombre, email o empresa, sin distinguir mayúsculas ni tildes).
- Marcar favoritos (★) y filtrar "Solo favoritos". Los favoritos se recuerdan al recargar.
- "Ver publicaciones": segunda petición a la API y panel de detalle.
- Estados de carga, error y sin resultados.
- Atajos de teclado: <kbd>/</kbd> para buscar y <kbd>Esc</kbd> para cerrar el detalle.

## Qué repasa cada paso

| Paso | Contenido | Lecciones |
|---|---|---|
| 0 | Estructura del punto de partida | 1.2 |
| 1 | `fetch` + `async/await` | 3.1 |
| 2 | `<template>`, `cloneNode`, `textContent`, `replaceChildren` | 1.3, 1.5, 1.6, 1.7 |
| 3 | Estados de la interfaz, `try/catch` | 3.1 |
| 4 | Estado de la aplicación, evento `input`, *debounce* | 2.1, 2.5, 2.6 |
| 5 | Delegación, `data-*`, `closest`, `aria-pressed` | 1.6, 2.2, 2.4 |
| 6 | Segunda petición, mostrar y ocultar, carreras de peticiones | 1.6, 3.1 |
| 7 | Atajos de teclado, `localStorage` | 2.6 |

## Cómo seguir el taller

- **Punto de partida:** [demos/taller-inicio.html](demos/taller-inicio.html). El HTML y el CSS ya están hechos; tú escribes el JavaScript en [demos/taller-inicio.js](demos/taller-inicio.js).
- **Solución:** [demos/taller-final.html](demos/taller-final.html) + [taller-final.js](demos/taller-final.js). Consúltala solo si te atascas.
- **Necesitas** conexión a Internet (los datos vienen de una API pública) y, preferiblemente, un servidor local: la extensión *Live Server* de VS Code o `npx serve`.
- Antes de escribir cada paso, piensa qué necesitas y qué lección lo resuelve. Al terminar cada paso, recarga la página y haz la comprobación ✅.

---

## Paso 0 · El punto de partida

Abre [demos/taller-inicio.html](demos/taller-inicio.html) y repasa lo que ya está hecho:

- El script se carga con **`defer`** (lección 1.2).
- La **barra** con el buscador (`#buscador`), la casilla `#solo-favoritos` y el botón `#btn-recargar`.
- `#estado`: un párrafo para los mensajes de estado. Tiene `role="status"` para que los lectores de pantalla anuncien los cambios.
- `#usuarios`: el contenedor vacío donde irán las tarjetas.
- `#detalle`: el panel de publicaciones, oculto con `hidden`.
- El **`<template id="tpl-usuario">`**: la estructura de una tarjeta. Fíjate en los `data-accion` de los botones: los usaremos en el paso 5.

El CSS se da hecho: el taller es de JavaScript.

---

## Paso 1 · Pedir los datos

Primero, comprobar que llegan. Nada de interfaz todavía:

```js
const API = "https://jsonplaceholder.typicode.com";

async function obtenerJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  return respuesta.json();
}

async function cargarUsuarios() {
  const usuarios = await obtenerJSON(`${API}/users`);
  console.log(usuarios);
}

cargarUsuarios();
```

✅ **Comprobar:** en la consola aparece un array de 10 objetos. Despliega uno y localiza `name`, `email`, `company.name` y `address.city`: son los campos que vamos a pintar. Busca también la petición en la pestaña **Network**.

---

## Paso 2 · Pintar las tarjetas con `<template>`

```js
const contenedor = document.getElementById("usuarios");
const plantilla = document.getElementById("tpl-usuario");

function crearTarjeta(usuario) {
  const tarjeta = plantilla.content.firstElementChild.cloneNode(true);
  tarjeta.dataset.id = usuario.id;

  const avatar = tarjeta.querySelector(".avatar");
  avatar.textContent = usuario.name[0];
  avatar.style.setProperty("--tono", (usuario.id * 47) % 360); // un color distinto por usuario

  tarjeta.querySelector(".nombre").textContent = usuario.name;
  tarjeta.querySelector(".email").textContent = usuario.email;
  tarjeta.querySelector(".empresa").textContent = usuario.company.name;
  tarjeta.querySelector(".ciudad").textContent = `📍 ${usuario.address.city}`;
  return tarjeta;
}
```

Y en `cargarUsuarios`, en lugar del `console.log`:

```js
contenedor.replaceChildren(...usuarios.map(crearTarjeta));
```

Fíjate en:

- **`textContent`, nunca `innerHTML`**: los datos vienen de fuera (lección 1.5).
- `tarjeta.dataset.id`: guardamos a qué usuario corresponde cada tarjeta. Lo necesitaremos en el paso 5.
- `replaceChildren(...array)`: sustituye todo el contenido de una vez (lección 1.7).
- `--tono` es una **variable CSS** que usa el `.avatar` del CSS (lección 1.6).

✅ **Comprobar:** aparecen 10 tarjetas.

---

## Paso 3 · Estados: cargando, error y vacío

```js
const estado = document.getElementById("estado");

function mostrarEstado(elemento, texto, tipo = "") {
  elemento.textContent = texto;
  elemento.className = tipo; // "cargando", "error" o ninguna (el CSS ya tiene los estilos)
}

async function cargarUsuarios() {
  mostrarEstado(estado, "Cargando usuarios…", "cargando");
  contenedor.replaceChildren();

  try {
    const usuarios = await obtenerJSON(`${API}/users`);
    contenedor.replaceChildren(...usuarios.map(crearTarjeta));
    mostrarEstado(estado, `${usuarios.length} usuarios`);
  } catch (error) {
    mostrarEstado(estado, `No se han podido cargar los usuarios (${error.message}).`, "error");
  }
}

document.getElementById("btn-recargar").addEventListener("click", cargarUsuarios);
```

> `mostrarEstado` recibe el elemento como parámetro porque en el paso 6 la reutilizaremos para el panel de detalle.

✅ **Comprobar:**

- En Network, aplica *Slow 4G* y recarga: se ve "Cargando usuarios…".
- Activa *Offline* y pulsa "Recargar": aparece el error. Desactívalo y pulsa "Recargar": vuelve a funcionar.
- Cambia la URL a `/usersX` para ver el 404 y deshaz el cambio.

---

## Paso 4 · Buscador: el estado de la aplicación

Para filtrar necesitamos **guardar los usuarios** y **saber qué hay escrito**. Introducimos un objeto con el **estado de la aplicación**: la fuente de verdad. El DOM es solo su reflejo.

```js
const buscador = document.getElementById("buscador");

const app = {
  usuarios: [],
  texto: "",
};
```

Separamos **cargar** de **pintar**:

```js
// Normaliza para buscar sin distinguir mayúsculas ni tildes: "José" → "jose"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function usuariosVisibles() {
  const texto = normalizar(app.texto.trim());
  if (!texto) return app.usuarios;
  return app.usuarios.filter((u) =>
    [u.name, u.email, u.company.name].some((campo) => normalizar(campo).includes(texto))
  );
}

function pintar() {
  const visibles = usuariosVisibles();
  contenedor.replaceChildren(...visibles.map(crearTarjeta));

  if (visibles.length === 0) {
    mostrarEstado(estado, "No hay usuarios que coincidan con la búsqueda.");  // estado VACÍO
  } else {
    mostrarEstado(estado, `${visibles.length} de ${app.usuarios.length} usuarios`);
  }
}
```

En `cargarUsuarios`, dentro del `try`:

```js
app.usuarios = await obtenerJSON(`${API}/users`);
pintar();
```

Y el evento:

```js
buscador.addEventListener("input", () => {
  app.texto = buscador.value;
  pintar();
});
```

✅ **Comprobar:** escribe "clementina", "biz", "ROMAGUERA"… Escribe algo que no existe: se ve el estado vacío.

### Mejora: *debounce*

Añade un `console.log("pintar")` al principio de `pintar()` y escribe rápido: se pinta **en cada tecla**. Con 10 usuarios no importa, pero con 10 000, o si cada búsqueda fuera una petición al servidor, sí. Aplicamos el *debounce* de la lección 2.6:

```js
function debounce(fn, espera = 300) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => fn(...args), espera);
  };
}

buscador.addEventListener("input", debounce(() => {
  app.texto = buscador.value;
  pintar();
}));
```

✅ **Comprobar:** ahora `pintar` solo aparece en la consola cuando se deja de escribir.

---

## Paso 5 · Favoritos con delegación

Cada tarjeta tiene un botón ★ con `data-accion="favorito"`. **No** añadimos un listener por tarjeta: las tarjetas se recrean cada vez que se pinta (lección 2.4). Ponemos **uno solo en el contenedor**:

```js
// Añadir al estado:
const app = {
  usuarios: [],
  texto: "",
  soloFavoritos: false,
  favoritos: new Set(),   // ids de los favoritos
};
```

```js
contenedor.addEventListener("click", (event) => {
  const boton = event.target.closest("[data-accion]");
  if (!boton) return;

  const id = Number(boton.closest(".tarjeta").dataset.id); // dataset siempre es cadena

  switch (boton.dataset.accion) {
    case "favorito":
      if (app.favoritos.has(id)) app.favoritos.delete(id);
      else app.favoritos.add(id);
      pintar();
      break;
  }
});
```

¿Cómo se ve la estrella encendida? Lo decide `crearTarjeta` **a partir del estado**. Añade antes del `return`:

```js
tarjeta.querySelector(".favorito").setAttribute("aria-pressed", app.favoritos.has(usuario.id));
```

`aria-pressed` le dice a los lectores de pantalla que es un botón que se activa y desactiva; y el CSS lo usa para darle color (`.favorito[aria-pressed="true"]`). **Un solo atributo sirve para la accesibilidad y para el estilo.**

Filtro "Solo favoritos":

```js
const soloFavoritos = document.getElementById("solo-favoritos");

soloFavoritos.addEventListener("change", () => {
  app.soloFavoritos = soloFavoritos.checked;
  pintar();
});
```

Y en `usuariosVisibles`, el filtro combinado:

```js
function usuariosVisibles() {
  const texto = normalizar(app.texto.trim());
  return app.usuarios.filter((u) => {
    if (app.soloFavoritos && !app.favoritos.has(u.id)) return false;
    if (!texto) return true;
    return [u.name, u.email, u.company.name].some((campo) => normalizar(campo).includes(texto));
  });
}
```

✅ **Comprobar:** marca dos o tres favoritos, activa "Solo favoritos" y combínalo con el buscador.

> **Idea clave del taller:** fíjate en el patrón. Ningún evento toca el DOM directamente: **cambian el estado y llaman a `pintar()`**. Es la idea central de React, Vue y compañía.

---

## Paso 6 · Ver publicaciones: segunda petición

Nueva acción en el `switch`:

```js
case "publicaciones":
  mostrarPublicaciones(id);
  break;
```

Referencias al panel y estado del usuario seleccionado:

```js
const detalle = document.getElementById("detalle");
const detalleTitulo = document.getElementById("detalle-titulo");
const detalleEstado = document.getElementById("detalle-estado");
const detalleLista = document.getElementById("detalle-lista");

// en app:  seleccionado: null,
```

```js
async function mostrarPublicaciones(id) {
  const usuario = app.usuarios.find((u) => u.id === id);
  app.seleccionado = id;
  pintar();                                   // para resaltar la tarjeta seleccionada

  detalle.hidden = false;
  detalleTitulo.textContent = `Publicaciones de ${usuario.name}`;
  detalleLista.replaceChildren();
  mostrarEstado(detalleEstado, "Cargando publicaciones…", "cargando");
  detalle.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const publicaciones = await obtenerJSON(`${API}/posts?userId=${id}`);
    if (app.seleccionado !== id) return;       // ← ver "carreras de peticiones"

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
```

Resaltar la tarjeta seleccionada, en `crearTarjeta`:

```js
tarjeta.classList.toggle("seleccionada", usuario.id === app.seleccionado);
```

Cerrar:

```js
function cerrarDetalle() {
  detalle.hidden = true;
  app.seleccionado = null;
  pintar();
}

document.getElementById("btn-cerrar").addEventListener("click", cerrarDetalle);
```

### Carreras de peticiones (*race conditions*)

Con la red lenta (*Slow 4G*), pulsa "Ver publicaciones" del usuario 1 e inmediatamente del usuario 2. Sin la línea `if (app.seleccionado !== id) return;`, si la respuesta del usuario 1 llega **después**, el panel diría "Publicaciones de Ervin Howell" (usuario 2) mostrando las de Leanne Graham (usuario 1). **Las respuestas no tienen por qué llegar en el orden en que se pidieron.** La comprobación descarta las respuestas que ya no interesan.

> Para ir más allá: la alternativa profesional es **cancelar** la petición anterior con `AbortController` (el mismo que en la lección 2.1), pasando `{ signal }` a `fetch`.

✅ **Comprobar:** abre y cierra el detalle de varios usuarios, también con la red lenta.

---

## Paso 7 · Toques finales

### Atajos de teclado (lección 2.6)

```js
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
```

### Recordar los favoritos con `localStorage`

`localStorage` guarda **cadenas** en el navegador, por dominio, y sobreviven al recargar la página. Un `Set` no se puede guardar tal cual: lo convertimos a array y a JSON.

```js
function leerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("favoritos")) ?? [];
  } catch {
    return [];      // JSON corrupto o almacenamiento bloqueado (modo privado…)
  }
}

function guardarFavoritos() {
  try {
    localStorage.setItem("favoritos", JSON.stringify([...app.favoritos]));
  } catch {
    // Si no hay almacenamiento, los favoritos duran solo esta sesión
  }
}

// en app:  favoritos: new Set(leerFavoritos()),
// en el case "favorito", antes de pintar():  guardarFavoritos();
```

✅ **Comprobar:** marca favoritos, recarga la página y siguen marcados. En DevTools → **Application** → *Local Storage* se ve la clave `favoritos`.

---

## Errores frecuentes

- Olvidar un `await`: trabajas con una `Promise` en vez de con los datos (`usuarios.map is not a function`).
- Comparar `dataset.id` (cadena) con un id numérico: `"3" === 3` es `false`. Convierte con `Number(...)`.
- Un `id` mal escrito en `getElementById`: devuelve `null` y el error aparece más tarde (`Cannot read properties of null`).
- Pintar los datos de la API con `innerHTML` en lugar de `textContent`.

Cuando algo falle, **lee el error en la consola**: indica el fichero y la línea exacta.

## Resultado final

Compara con [demos/taller-final.js](demos/taller-final.js). La estructura del código quedó así:

```
Referencias al DOM
Estado de la aplicación (app)         ← fuente de verdad
Utilidades (obtenerJSON, debounce, normalizar, localStorage)
Pintar    (crearTarjeta, usuariosVisibles, pintar)            ← estado → DOM
Cargar    (cargarUsuarios, mostrarPublicaciones)              ← API → estado
Eventos   (input, change, click delegado, keydown)            ← usuario → estado → pintar()
Inicio    cargarUsuarios()
```

```
      ┌──────────── eventos del usuario ────────────┐
      ▼                                             │
  cambian `app`  ──►  pintar()  ──►  DOM  ──►  el usuario ve e interactúa
      ▲
      └── fetch (datos de la API)
```

## Ideas para ampliar

- Ordenar por nombre o por ciudad con un `<select>`.
- Resaltar en las tarjetas el texto buscado (con `<mark>`, **creando nodos**, no con `innerHTML`).
- Paginación o "cargar más" con `/posts?_page=1&_limit=5`.
- Formulario para "crear" una publicación con `POST` (JSONPlaceholder la simula).
- Mostrar el detalle en un `<dialog>` nativo (`dialog.showModal()`).
