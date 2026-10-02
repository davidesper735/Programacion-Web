# 2.6 Teclado, puntero, ventana y eventos personalizados

## Idea clave

> **Teclado: `keydown` + `event.key`. Puntero: los eventos `pointer*` cubren ratón, dedo y lápiz. Ventana: `resize` y `scroll` se disparan decenas de veces por segundo, así que hay que limitar el trabajo que se hace en ellos.**

## 1. Teclado

| Evento | Cuándo |
|---|---|
| `keydown` | Al pulsar una tecla (se **repite** si se mantiene pulsada; `event.repeat === true`) |
| `keyup` | Al soltarla |
| ~~`keypress`~~ | **Obsoleto**. No usar. |

Los eventos de teclado van al elemento que tiene el **foco** y suben hasta `document`. Para atajos globales, se escucha en `document`:

```js
document.addEventListener("keydown", (event) => {
  // Cerrar un modal con Escape
  if (event.key === "Escape") cerrarModal();

  // Atajo Ctrl+K (o Cmd+K en Mac) para abrir el buscador
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault();   // evita la acción del navegador para ese atajo
    abrirBuscador();
  }
});
```

### `key` frente a `code`

| | `key` | `code` |
|---|---|---|
| Qué representa | El **carácter** o la tecla lógica | La **posición física** en el teclado |
| <kbd>A</kbd> en QWERTY | `"a"` (o `"A"` con Shift) | `"KeyA"` |
| La misma tecla en AZERTY | `"q"` | `"KeyA"` |
| Uso | Texto, atajos con letras, `Enter`, `Escape`, flechas | Juegos (WASD), atajos por posición |

Valores útiles de `key`: `"Enter"`, `"Escape"`, `"Tab"`, `" "` (espacio), `"ArrowUp"`, `"ArrowDown"`, `"ArrowLeft"`, `"ArrowRight"`, `"Backspace"`, `"Delete"`, `"Shift"`, `"Control"`.

### No romper la escritura

Si hay un atajo con una letra (p. ej. `/` para buscar), hay que **ignorarlo cuando el usuario está escribiendo** en un campo:

```js
document.addEventListener("keydown", (event) => {
  const escribiendo = event.target.closest("input, textarea, select, [contenteditable]");
  if (escribiendo) return;
  if (event.key === "/") { event.preventDefault(); buscador.focus(); }
});
```

> **Accesibilidad**: los elementos interactivos nativos (`<button>`, `<a href>`, `<input>`) ya funcionan con teclado (Enter, Espacio, Tab). Si se hace "un botón" con un `<div>` y `click`, no funciona con teclado. **Usa `<button>`.**

## 2. Puntero: ratón, dedo y lápiz

### Eventos de ratón clásicos

`click`, `dblclick`, `contextmenu`, `mousedown`, `mouseup`, `mousemove`, `mouseover`/`mouseout` (suben), `mouseenter`/`mouseleave` (no suben).

### Pointer Events ✅

Los **Pointer Events** unifican ratón, pantalla táctil y lápiz en una sola API:

| Pointer | Equivalente de ratón |
|---|---|
| `pointerdown` | `mousedown` / `touchstart` |
| `pointermove` | `mousemove` / `touchmove` |
| `pointerup` | `mouseup` / `touchend` |
| `pointerenter` / `pointerleave` | `mouseenter` / `mouseleave` |
| `pointercancel` | `touchcancel` (el sistema interrumpe el gesto) |

Propiedades adicionales: `pointerType` (`"mouse"`, `"touch"`, `"pen"`), `pointerId`, `pressure`, `width`/`height` (área de contacto).

➡️ **Para interacciones de arrastrar, dibujar o deslizar, usa `pointer*`** y funcionarán en móvil sin escribir código aparte para `touch*`.

### Ejemplo: arrastrar un elemento

```js
const ficha = document.querySelector(".ficha");
let inicio = null;

ficha.addEventListener("pointerdown", (event) => {
  inicio = { x: event.clientX - ficha.offsetLeft, y: event.clientY - ficha.offsetTop };
  ficha.setPointerCapture(event.pointerId); // sigue recibiendo eventos aunque el puntero salga de la ficha
});

ficha.addEventListener("pointermove", (event) => {
  if (!inicio) return;
  ficha.style.left = `${event.clientX - inicio.x}px`;
  ficha.style.top = `${event.clientY - inicio.y}px`;
});

ficha.addEventListener("pointerup", () => (inicio = null));
```

```css
.ficha { position: absolute; touch-action: none; } /* evita que el dedo haga scroll al arrastrar */
```

## 3. Ventana: `resize` y `scroll`

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth, window.innerHeight);
});

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
}, { passive: true });  // passive: no vamos a llamar a preventDefault → scroll más fluido
```

Estos eventos se disparan **muchísimas veces por segundo**. Si el manejador hace trabajo pesado (recalcular una disposición, pedir datos al servidor), la página va a tirones.

### *Debounce*: esperar a que el usuario pare

Ejecuta la función **solo cuando han pasado X ms sin nuevos eventos**. Ideal para `resize` y para la **búsqueda mientras se escribe** (lo usaremos en el taller):

```js
function debounce(fn, espera = 300) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => fn(...args), espera);
  };
}

buscador.addEventListener("input", debounce((event) => {
  buscar(event.target.value); // solo se ejecuta cuando el usuario deja de escribir 300 ms
}));
```

### *Throttle*: como máximo una vez cada X ms

Ejecuta la función **a intervalos regulares** mientras duren los eventos. Útil para `scroll` (p. ej. una barra de progreso de lectura):

```js
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
```

> Muchas cosas que antes se hacían escuchando `scroll` o `resize` hoy tienen APIs mejores: **media queries en CSS** o `matchMedia` para los cambios de tamaño, `IntersectionObserver` para saber cuándo un elemento entra en pantalla (carga diferida, *scroll* infinito) y `ResizeObserver` para el tamaño de un elemento concreto. Son un buen siguiente paso cuando domines lo básico.

## 4. Eventos personalizados: `CustomEvent`

Además de escuchar eventos del navegador, podemos **crear y disparar los nuestros**. Sirve para que partes independientes de la aplicación se comuniquen sin conocerse:

```js
// Un componente avisa de que se ha añadido algo al carrito
const evento = new CustomEvent("carrito:añadido", {
  detail: { id: 42, nombre: "Teclado", precio: 19.99 }, // datos que viajan con el evento
  bubbles: true,                                        // para que suba (por defecto NO sube)
});
boton.dispatchEvent(evento);

// En otra parte de la aplicación, sin saber qué botón fue
document.addEventListener("carrito:añadido", (event) => {
  contador.textContent = Number(contador.textContent) + 1;
  console.log("Añadido:", event.detail.nombre);
});
```

- El nombre es libre (conviene un prefijo, como `carrito:`, para no chocar con eventos nativos).
- `detail` lleva los datos.
- Sin `bubbles: true`, solo lo oyen los listeners del elemento que lo dispara.

---

## Pruébalo tú

Abre [demos/06-teclado-puntero.html](demos/06-teclado-puntero.html).

1. **Teclado**: pulsa teclas con el foco fuera de los campos. Se muestran `key`, `code` y `repeat` (mantén una tecla pulsada). Prueba el atajo <kbd>/</kbd> para enfocar el buscador; luego escribe `/` dentro del buscador: no se activa.
2. **Arrastrar y mover con flechas**: arrastra la ficha con el ratón o con el dedo (Pointer Events); se muestra el `pointerType`. Después dale el foco (clic o <kbd>Tab</kbd>) y muévela con las flechas: es el mismo movimiento hecho accesible por teclado.
3. **Contador de eventos**: redimensiona la ventana o haz *scroll*. Se comparan tres contadores: eventos recibidos, ejecuciones con *throttle* y ejecuciones con *debounce*.
4. **CustomEvent**: los botones "Añadir al carrito" disparan un evento propio; el contador del carrito lo escucha en `document`.

## Errores frecuentes

- Usar `keypress` o `keyCode` (obsoletos).
- Atajos de teclado que se activan mientras el usuario escribe en un campo.
- `div` con `click` en lugar de `<button>`: no funciona con teclado.
- Trabajo pesado en `scroll`/`resize` sin *debounce* ni *throttle*.
- Olvidar `bubbles: true` en un `CustomEvent` que se escucha en un ancestro.

## Resumen

```
Teclado:  keydown / keyup  ·  event.key ("Enter", "a")  ·  event.code ("KeyA")  ·  ctrlKey/metaKey
Puntero:  pointerdown / pointermove / pointerup  ·  pointerType  → ratón + táctil + lápiz
Ventana:  resize · scroll ({ passive: true })  →  debounce (al parar) / throttle (cada X ms)
Propios:  el.dispatchEvent(new CustomEvent("nombre", { detail, bubbles: true }))
```
