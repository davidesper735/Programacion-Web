# 3.1 `fetch` y `async/await`: traer datos y pintarlos

## Idea clave

> **Pedir datos lleva tiempo y puede fallar. `fetch` devuelve una promesa; con `await` esperamos el resultado sin bloquear la página. Una interfaz bien hecha muestra siempre en qué estado está: cargando, error, sin resultados o con datos.**

## 1. Por qué hace falta algo "asíncrono"

Una petición a un servidor puede tardar desde milisegundos hasta varios segundos. Si JavaScript se quedara **esperando parado**, la página se congelaría: no se podría hacer clic, ni hacer *scroll*, ni ver animaciones.

Por eso las operaciones lentas son **asíncronas**: se lanzan, el programa sigue, y cuando llega el resultado se ejecuta el código que lo procesa. Ya lo hemos visto con los eventos (lección 2.1): registrar ahora y ejecutar después.

## 2. Promesas en 2 minutos

Una **promesa** (`Promise`) es un objeto que representa un valor que **llegará más adelante**. Está en uno de tres estados:

```
pending (pendiente)  ──►  fulfilled (cumplida, con un valor)
                     └─►  rejected  (rechazada, con un error)
```

Forma clásica de usarlas, con `.then()` y `.catch()`:

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((respuesta) => respuesta.json())
  .then((usuarios) => console.log(usuarios))
  .catch((error) => console.error(error));
```

## 3. `async` / `await` ✅

La misma lógica, escrita como si fuera secuencial:

```js
async function cargarUsuarios() {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await respuesta.json();
  console.log(usuarios);
}

cargarUsuarios();
```

- `await` **pausa la función** (solo esa función, no la página) hasta que la promesa se resuelva, y devuelve su valor.
- `await` solo se puede usar dentro de una función `async` (o en el nivel superior de un **módulo**, `type="module"`).
- Una función `async` **siempre devuelve una promesa**.

```js
console.log("1");
cargarUsuarios();          // lanza la petición y sigue
console.log("2");          // se imprime ANTES que los usuarios
// 1, 2, [usuarios…]
```

## 4. `fetch` paso a paso

```js
const respuesta = await fetch(url);
```

`respuesta` es un objeto `Response`:

| Propiedad / método | Qué da |
|---|---|
| `respuesta.ok` | `true` si el código HTTP está entre 200 y 299 |
| `respuesta.status` | El código: `200`, `404`, `500`… |
| `respuesta.json()` | **Otra promesa** con el cuerpo interpretado como JSON |
| `respuesta.text()` | El cuerpo como texto |

¿Por qué dos `await`? Porque primero llegan las **cabeceras** (y con ellas `status` y `ok`) y después el **cuerpo**, que puede ser grande.

### ⚠️ La trampa: `fetch` no falla con un 404

`fetch` **solo rechaza la promesa si hay un error de red** (sin conexión, DNS, CORS…). Un **404 o un 500 son respuestas válidas** para `fetch`: hay que comprobar `ok` a mano.

```js
async function obtenerJSON(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }
  return respuesta.json();
}
```

## 5. Gestionar errores con `try / catch`

```js
async function cargarUsuarios() {
  try {
    const usuarios = await obtenerJSON("https://jsonplaceholder.typicode.com/users");
    pintar(usuarios);
  } catch (error) {
    mostrarError(`No se han podido cargar los usuarios (${error.message})`);
  }
}
```

Sin `try/catch`, un error dentro de una función `async` acaba en la consola como *"Uncaught (in promise)"* y el usuario no ve nada.

## 6. Los cuatro estados de la interfaz

Toda pantalla que carga datos debe contemplar:

| Estado | Qué ve el usuario |
|---|---|
| **Cargando** | Un indicador ("Cargando…", un *spinner*, un esqueleto) |
| **Error** | Un mensaje comprensible y, a ser posible, un botón "Reintentar" |
| **Vacío** | "No hay resultados" (no una pantalla en blanco) |
| **Datos** | El contenido |

```js
const estado = document.getElementById("estado");
const lista = document.getElementById("lista");

async function cargar() {
  estado.textContent = "Cargando…";
  lista.replaceChildren();

  try {
    const usuarios = await obtenerJSON(URL_USUARIOS);

    if (usuarios.length === 0) {
      estado.textContent = "No hay usuarios.";
      return;
    }
    estado.textContent = "";
    lista.replaceChildren(...usuarios.map(crearItem));
  } catch (error) {
    estado.textContent = `Error: ${error.message}`;
  }
}
```

Y **pintamos con lo aprendido en el tema 1**: `createElement` / `<template>` + `textContent`. Los datos vienen de fuera, así que **nada de `innerHTML` con ellos** (lección 1.5).

## 7. Enviar datos (POST)

```js
const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hola", body: "Mi primer post", userId: 1 }),
});
const creado = await respuesta.json(); // { id: 101, title: "Hola", … }
```

Para enviar un formulario directamente: `fetch(url, { method: "POST", body: new FormData(form) })` (sin la cabecera `Content-Type`: el navegador la pone).

> JSONPlaceholder es una API de pruebas: responde como si guardara los datos, pero no los guarda de verdad.

## 8. CORS en una frase

Por seguridad, el navegador solo permite leer respuestas de **otro dominio** si ese servidor lo autoriza con la cabecera `Access-Control-Allow-Origin`. Las APIs públicas de pruebas lo hacen. Si aparece un error de CORS, **el problema no se arregla en el cliente**: es el servidor el que tiene que permitirlo.

---

## Pruébalo tú

Abre [demos/01-fetch.html](demos/01-fetch.html) (con conexión a Internet).

1. **Cargar usuarios**: se ve el estado "Cargando…" (hay un retardo artificial de 1 s para que dé tiempo a verlo) y después la lista.
2. Pestaña **Network** de DevTools: localiza la petición, su código 200 y la respuesta JSON.
3. **Provocar un 404**: pide una URL que no existe. Sin comprobar `ok` (casilla desmarcada) el código intenta pintar y falla de forma confusa; con la comprobación, aparece un mensaje claro.
4. **Provocar un error de red**: activa *Offline* en la pestaña Network y pulsa Cargar: salta el `catch`.
5. **Orden de ejecución**: el registro muestra que "después de llamar a cargar()" aparece antes que los datos.

## Errores frecuentes

- Olvidar un `await` y trabajar con una `Promise` en vez de con los datos (`usuarios.map is not a function`).
- No comprobar `respuesta.ok`.
- Usar `await` fuera de una función `async` en un script clásico (`SyntaxError`).
- No mostrar nada mientras carga ni cuando hay un error.
- Pintar los datos de la API con `innerHTML`.

## Resumen

```
async function cargar() {
  try {
    mostrar("Cargando…")
    const r = await fetch(url)
    if (!r.ok) throw new Error(r.status)     ← fetch NO falla con 404/500
    const datos = await r.json()
    datos.length ? pintar(datos) : mostrar("Vacío")
  } catch (e) {
    mostrar("Error")                          ← red caída, 404, JSON inválido…
  }
}
```
