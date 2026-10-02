# 1.7 Crear, insertar y eliminar nodos

## Idea clave

> **Crear un elemento no lo muestra: primero se crea (existe solo en memoria) y después se inserta en el DOM. Un mismo nodo solo puede estar en un sitio: insertarlo otra vez lo mueve.**

## 1. Crear

```js
const li = document.createElement("li");     // <li></li> en memoria, fuera del DOM
li.textContent = "Nueva tarea";
li.classList.add("tarea");
li.dataset.id = 7;

li.isConnected; // false → todavía no está en la página
```

También existen `document.createTextNode("texto")` y `document.createComment("…")`, pero casi nunca hacen falta: `textContent` y `append("texto")` crean el nodo de texto por nosotros.

## 2. Insertar: los métodos modernos ✅

Todos aceptan **uno o varios** nodos **o cadenas** (las cadenas se insertan como **texto**, no como HTML → seguro):

```js
const lista = document.querySelector("#lista");

lista.append(li);                  // al FINAL, dentro de la lista
lista.prepend(li);                 // al PRINCIPIO, dentro
referencia.before(li);             // justo ANTES de referencia, fuera (como hermano)
referencia.after(li);              // justo DESPUÉS de referencia, fuera
referencia.replaceWith(li);        // SUSTITUYE a referencia

lista.append(li1, li2, "texto suelto"); // varios de una vez
lista.replaceChildren(li1, li2);   // sustituye todos los hijos
lista.replaceChildren();           // ✅ vacía el elemento
```

Esquema de posiciones:

```
          before()
<ul>  ←── referencia
  prepend()
  <li>…</li>
  <li>…</li>
  append()
</ul>
          after()
```

### Los métodos clásicos (código antiguo)

| Clásico | Moderno |
|---|---|
| `padre.appendChild(nodo)` | `padre.append(nodo)` |
| `padre.insertBefore(nodo, referencia)` | `referencia.before(nodo)` |
| `padre.removeChild(nodo)` | `nodo.remove()` |
| `padre.replaceChild(nuevo, viejo)` | `viejo.replaceWith(nuevo)` |

La diferencia es que los clásicos obligan a pasar por el **padre**, solo aceptan un nodo y no aceptan cadenas. Se siguen viendo mucho, así que conviene reconocerlos.

## 3. Insertar HTML en una posición: `insertAdjacentHTML`

Interpreta una cadena como HTML **sin destruir** lo que ya hay (a diferencia de `innerHTML +=`):

```js
lista.insertAdjacentHTML("beforeend", `<li class="tarea">Nueva</li>`);
```

| Posición | Equivale a |
|---|---|
| `"beforebegin"` | `before` |
| `"afterbegin"` | `prepend` |
| `"beforeend"` | `append` |
| `"afterend"` | `after` |

> ⚠️ Sigue siendo HTML interpretado: **el mismo riesgo de XSS que `innerHTML`** (lección 1.5). Solo con contenido controlado.

Existen también `insertAdjacentElement(posicion, nodo)` e `insertAdjacentText(posicion, texto)`.

## 4. Mover

Un nodo **solo puede estar en un sitio**. Insertar un nodo que ya está en el DOM lo **mueve**:

```js
const primera = lista.firstElementChild;
lista.append(primera);  // la primera tarea pasa a ser la última (no se duplica)
```

## 5. Eliminar

```js
li.remove();                   // ✅ se elimina a sí mismo
lista.replaceChildren();       // ✅ vacía la lista
lista.innerHTML = "";          // también vacía (habitual en código existente)
```

Un nodo eliminado **sigue existiendo** si guardamos una referencia en una variable: podemos volver a insertarlo.

## 6. Clonar

```js
const copia = li.cloneNode(true);  // true = copia profunda (con todos sus descendientes)
const vacia = li.cloneNode();      // solo el elemento, sin hijos
```

⚠️ `cloneNode` copia atributos y contenido, pero **no** los *listeners* añadidos con `addEventListener`. Cuidado también con los `id`: la copia tendrá el mismo, y los `id` deben ser únicos.

## 7. `<template>`: HTML inerte para reutilizar ✅

Escribir estructuras grandes con `createElement` es muy verboso. Con `<template>` escribimos el HTML **en el HTML**; el navegador lo analiza pero **no lo muestra** ni carga sus recursos:

```html
<template id="tpl-tarjeta">
  <article class="tarjeta">
    <img class="avatar" alt="">
    <h3 class="nombre"></h3>
    <p class="email"></p>
    <button class="borrar">Borrar</button>
  </article>
</template>
```

```js
const tpl = document.getElementById("tpl-tarjeta");

function crearTarjeta(usuario) {
  const tarjeta = tpl.content.firstElementChild.cloneNode(true);
  tarjeta.querySelector(".nombre").textContent = usuario.nombre; // ✅ textContent: seguro
  tarjeta.querySelector(".email").textContent = usuario.email;
  tarjeta.querySelector(".avatar").src = usuario.foto;
  tarjeta.dataset.id = usuario.id;
  return tarjeta;
}

contenedor.append(crearTarjeta({ id: 1, nombre: "Ana", email: "ana@ejemplo.com", foto: "ana.png" }));
```

Ventajas: el HTML se queda en el HTML (legible, con resaltado de sintaxis), los datos se insertan con `textContent` (sin XSS) y se clona muy rápido.

## 8. Rendimiento: `DocumentFragment`

Cada inserción en el DOM puede provocar que el navegador recalcule la disposición (*reflow*). Si insertamos 1000 elementos uno a uno, pueden ser 1000 recálculos.

```js
// ⚠️ Inserta de uno en uno
for (const tarea of tareas) {
  lista.append(crearItem(tarea));
}

// ✅ Construir fuera del DOM e insertar una sola vez
const fragmento = document.createDocumentFragment();
for (const tarea of tareas) {
  fragmento.append(crearItem(tarea));
}
lista.append(fragmento); // el fragmento "se vacía": sus hijos pasan a la lista

// ✅ Equivalente moderno y muy legible
lista.append(...tareas.map(crearItem));
// o, para sustituir todo el contenido:
lista.replaceChildren(...tareas.map(crearItem));
```

> Los navegadores modernos agrupan muchos cambios por sí solos, así que la diferencia no siempre es grande. Aun así, **"construir fuera e insertar una vez"** es un buen hábito, y es la forma natural de pintar listas a partir de datos (tema 3).

## 9. Patrón: pintar una lista a partir de datos

Resume toda la lección y es la base del taller del tema 3:

```js
const tareas = [
  { id: 1, texto: "Comprar pan", hecha: true },
  { id: 2, texto: "Estudiar DOM", hecha: false },
];

function crearItem(tarea) {
  const li = document.createElement("li");
  li.textContent = tarea.texto;
  li.dataset.id = tarea.id;
  li.classList.toggle("hecha", tarea.hecha);
  return li;
}

function pintar() {
  lista.replaceChildren(...tareas.map(crearItem));
}

pintar();
```

**Los datos son la fuente de verdad; el DOM es su reflejo.** Cuando cambian los datos, se vuelve a llamar a `pintar()`. Es la idea en la que se basan frameworks como React o Vue.

---

## Pruébalo tú

Abre [demos/07-crear.html](demos/07-crear.html).

1. **Posiciones**: selecciona una referencia y usa `before`, `after`, `prepend`, `append` y `replaceWith`. El nuevo elemento aparece resaltado.
2. **Mover**: pulsa "Mover la primera al final" y comprueba que no se duplica.
3. **Clonar**: clona un elemento que tiene un *listener* y comprueba que la copia no responde al clic.
4. **Template**: genera tarjetas a partir de un array de datos con `<template>`.
5. **Rendimiento**: inserta 2000 elementos uno a uno y con un fragmento, y compara los tiempos (varían según el navegador). La versión "uno a uno" lee `offsetHeight` en cada vuelta, lo que obliga a recalcular la disposición cada vez: es el peor caso (*layout thrashing*) y muestra por qué no conviene mezclar lecturas y escrituras del DOM dentro de un bucle.

## Errores frecuentes

- Crear el elemento y olvidarse de insertarlo ("no aparece nada").
- Esperar que `append` de un nodo existente lo **copie** (lo mueve).
- `append("<b>hola</b>")` esperando negrita: las cadenas se insertan como texto.
- Clonar y esperar que se copien los *listeners*.
- Clonar un `<template>` usando `tpl.cloneNode(true)` en vez de `tpl.content…cloneNode(true)`.

## Resumen

```
crear   createElement(tag) → configurar (textContent, classList, dataset…) → insertar
insertar  append · prepend · before · after · replaceWith · replaceChildren
HTML      insertAdjacentHTML(pos, html)  ⚠️ XSS
eliminar  nodo.remove()   ·  padre.replaceChildren()
clonar    nodo.cloneNode(true)   (sin listeners)
<template> + content.firstElementChild.cloneNode(true) + textContent  ← plantillas seguras
Muchos elementos → construir fuera y append una vez (fragmento o ...array)
```
