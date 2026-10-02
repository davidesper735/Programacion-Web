# 1.3 Seleccionar elementos

## Idea clave

> **Si sabes escribir un selector CSS, sabes seleccionar elementos con JavaScript.** `querySelector` devuelve el primero que coincide (o `null`); `querySelectorAll`, todos (una `NodeList`, posiblemente vacía).

## 1. HTML de referencia para toda la lección

```html
<nav id="menu">
  <a href="/" class="enlace activo">Inicio</a>
  <a href="/blog" class="enlace">Blog</a>
  <a href="https://mdn.dev" class="enlace externo" target="_blank">MDN</a>
</nav>

<ul class="tareas">
  <li data-id="1" class="hecha">Comprar pan</li>
  <li data-id="2">Estudiar DOM</li>
  <li data-id="3">Hacer deporte</li>
</ul>

<form id="registro">
  <input type="email" name="email" required>
  <input type="checkbox" name="acepto">
</form>
```

## 2. `querySelector` y `querySelectorAll` ✅

```js
// El PRIMER elemento que coincide, o null
const menu    = document.querySelector("#menu");
const primera = document.querySelector(".tareas li");
const activo  = document.querySelector(".enlace.activo");
const email   = document.querySelector('input[name="email"]');

// TODOS los que coinciden → NodeList (vacía si no hay ninguno)
const enlaces  = document.querySelectorAll("#menu a");
const externos = document.querySelectorAll('a[target="_blank"]');
const pendientes = document.querySelectorAll(".tareas li:not(.hecha)");
```

Admiten **cualquier selector CSS válido**: combinadores (`>`, espacio, `+`, `~`), atributos (`[type="email"]`), pseudoclases (`:first-child`, `:not()`, `:checked`, `:nth-child(2)`)…

```js
document.querySelector(".tareas > li:nth-child(2)");   // "Estudiar DOM"
document.querySelectorAll('input:required');            // campos obligatorios
document.querySelector('input[name="acepto"]:checked'); // null si no está marcado
```

> Las pseudoclases que dependen de la interacción (como `:hover`) funcionan, pero solo reflejan el estado **en el momento** de la llamada.

### Recorrer una `NodeList`

```js
const enlaces = document.querySelectorAll("#menu a");

enlaces.length;        // 3
enlaces[0];            // primer enlace
enlaces.forEach((a) => console.log(a.href)); // ✅ NodeList tiene forEach

for (const a of enlaces) { /* ... */ }        // ✅ también es iterable

enlaces.map(...)       // ❌ TypeError: NO es un array
[...enlaces].map((a) => a.textContent);       // ✅ convertir a array
Array.from(enlaces).filter((a) => a.classList.contains("externo"));
```

## 3. Buscar **dentro de** un elemento

`querySelector` y `querySelectorAll` existen en **cualquier elemento**, no solo en `document`. La búsqueda se limita a sus descendientes:

```js
const menu = document.querySelector("#menu");
const enlacesDelMenu = menu.querySelectorAll("a"); // solo los de dentro de #menu

const form = document.querySelector("#registro");
form.querySelector('[name="email"]');
```

Es más eficiente y, sobre todo, **evita coger elementos de otra parte de la página** con el mismo selector.

## 4. Los métodos clásicos

Siguen funcionando y aparecen en mucho código existente:

| Método | Devuelve | Notas |
|---|---|---|
| `document.getElementById("menu")` | Elemento o `null` | **Sin `#`**. Muy rápido. Solo existe en `document`. |
| `getElementsByClassName("enlace")` | `HTMLCollection` **viva** | **Sin `.`** |
| `getElementsByTagName("li")` | `HTMLCollection` **viva** | |
| `document.getElementsByName("email")` | `NodeList` **viva** | Por el atributo `name` |

```js
document.getElementById("menu");          // ✅
document.getElementById("#menu");         // ❌ null: busca un id que se llame "#menu"
document.querySelector("menu");           // ❌ busca la etiqueta <menu>, no el id
document.querySelector("#menu");          // ✅
```

> `getElementById` sigue siendo perfectamente válido para seleccionar por id. Lo importante es **no mezclar** la sintaxis de ambos (con y sin `#`).

## 5. Colecciones vivas frente a estáticas

Es la diferencia más sutil de la lección y merece una demo:

- **`HTMLCollection`** (de `getElementsBy...`) es **viva**: se actualiza sola cuando el DOM cambia.
- **`NodeList`** de `querySelectorAll` es **estática**: es una "foto" del momento en que se hizo la consulta.

```js
const vivas     = document.getElementsByTagName("li"); // HTMLCollection
const estaticas = document.querySelectorAll("li");     // NodeList

console.log(vivas.length, estaticas.length); // 3 3

document.querySelector(".tareas").append(document.createElement("li"));

console.log(vivas.length, estaticas.length); // 4 3  ← la viva ha cambiado
```

Consecuencia práctica: si recorres una colección **viva** mientras añades o eliminas elementos, el bucle puede saltarse elementos o no terminar nunca. Con `querySelectorAll` no pasa.

> ⚠️ Excepción: `childNodes` (lección 1.4) es una `NodeList` **viva**. La regla "NodeList = estática" solo vale para `querySelectorAll`.

## 6. Hacia arriba: `closest` y `matches`

```js
const enlace = document.querySelector(".externo");

enlace.closest("nav");        // el <nav id="menu"> más cercano hacia arriba (incluye al propio elemento)
enlace.closest(".no-existe"); // null

enlace.matches(".enlace");    // true: ¿este elemento cumple el selector?
enlace.matches("#menu a");    // true
```

`closest` será **imprescindible** en la delegación de eventos (lección 2.4).

## 7. Comprobar siempre el `null`

```js
const aviso = document.querySelector(".aviso");
aviso.textContent = "Hola"; // ❌ si no existe: TypeError: Cannot set properties of null

// Opción 1: comprobar
if (aviso) aviso.textContent = "Hola";

// Opción 2: encadenamiento opcional (solo para LEER)
const texto = document.querySelector(".aviso")?.textContent;
```

## 8. ¿Qué método uso?

```
¿Un solo elemento?      → querySelector(selector)      (o getElementById si es por id)
¿Varios elementos?      → querySelectorAll(selector)   → forEach / for...of / [...lista]
¿Dentro de una zona?    → zona.querySelector(...)
¿El ancestro más cercano que cumple X? → elemento.closest(X)
```

---

## Pruébalo tú

Abre [demos/03-seleccionar.html](demos/03-seleccionar.html).

1. **Probador de selectores**: escribe selectores en el campo (`li`, `.tareas li:not(.hecha)`, `a[target="_blank"]`, `#menu > a:first-child`…). La demo resalta los elementos encontrados y muestra cuántos hay. Inventa tus propios selectores y predice qué van a encontrar antes de escribirlos.
2. Escribe un selector inválido (`li[`): se muestra el `SyntaxError` que lanza `querySelectorAll`.
3. **Viva frente a estática**: pulsa "Añadir tarea" varias veces y observa cómo cambian los contadores de las dos colecciones creadas al cargar la página.

## Errores frecuentes

- `getElementById("#id")` o `querySelector("id")`: mezclar sintaxis.
- Llamar a `.map()` o `.filter()` sobre una `NodeList`.
- Olvidar que `querySelectorAll` **nunca** devuelve `null`: devuelve una lista vacía. Se comprueba con `lista.length === 0`.
- Intentar cambiar algo en la colección entera: `document.querySelectorAll("li").style.color = "red"` no hace nada útil. Hay que recorrerla.

## Resumen

```
querySelector(css)     → 1 elemento | null
querySelectorAll(css)  → NodeList estática (forEach sí, map no → [...lista])
getElementById(id)     → 1 elemento | null (sin #)
getElementsBy...       → HTMLCollection VIVA
elemento.closest(css)  → ancestro más cercano | null
elemento.matches(css)  → true | false
```
