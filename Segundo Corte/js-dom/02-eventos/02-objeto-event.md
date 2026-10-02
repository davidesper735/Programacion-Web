# 2.2 El objeto `event`

## Idea clave

> **El navegador llama al manejador pasándole un objeto con toda la información del evento: qué ha pasado, dónde, cuándo y con qué teclas o botones. `target` es dónde se originó el evento; `currentTarget`, el elemento que tiene el listener.**

## 1. El manejador recibe el evento

```js
boton.addEventListener("click", (event) => {
  console.log(event);        // PointerEvent {type: "click", target: button, …}
  console.log(event.type);   // "click"
});
```

El nombre del parámetro es libre (`event`, `evento`, `e`, `ev`). En el curso usamos **`event`** para que sea explícito.

> En código antiguo se ve `window.event` o `event = event || window.event`. Era para Internet Explorer; hoy no hace falta.

## 2. Propiedades comunes a todos los eventos

| Propiedad | Qué contiene |
|---|---|
| `type` | El tipo: `"click"`, `"keydown"`… |
| `target` | El elemento **donde se originó** el evento (el más interno) |
| `currentTarget` | El elemento **cuyo listener se está ejecutando** ahora |
| `timeStamp` | Milisegundos desde que cargó la página |
| `isTrusted` | `true` si lo generó el usuario, `false` si se disparó desde código |
| `bubbles` / `cancelable` | Si el evento sube por el árbol y si se puede cancelar su acción por defecto |
| `preventDefault()` / `stopPropagation()` | Métodos que veremos en 2.3 |

### `target` frente a `currentTarget`

```html
<button id="comprar">
  <img src="carrito.svg" alt=""> Comprar
</button>
```

```js
document.getElementById("comprar").addEventListener("click", (event) => {
  event.currentTarget; // <button>  ← siempre el elemento con el listener
  event.target;        // <img> si se hizo clic en el icono, <button> si fue en el texto
});
```

➡️ Si quieres "el elemento al que le puse el listener", usa **`currentTarget`**. `target` es clave para la **delegación de eventos** (2.4).

> ⚠️ `currentTarget` solo vale algo **mientras** se ejecuta el manejador. Si haces `console.log(event)` y lo despliegas después en la consola, verás `currentTarget: null`. Para verlo, haz `console.log(event.currentTarget)`.

## 3. Propiedades según el tipo de evento

Cada familia de eventos añade sus propias propiedades.

### Ratón / puntero (`MouseEvent`, `PointerEvent`)

| Propiedad | Qué contiene |
|---|---|
| `clientX`, `clientY` | Posición respecto a la **ventana** visible |
| `pageX`, `pageY` | Posición respecto al **documento** (incluye el *scroll*) |
| `offsetX`, `offsetY` | Posición respecto al **elemento** `target` |
| `button` | Qué botón: `0` principal, `1` central, `2` secundario |
| `altKey`, `ctrlKey`, `shiftKey`, `metaKey` | Si había modificadores pulsados |
| `pointerType` | `"mouse"`, `"pen"` o `"touch"` (solo `PointerEvent`) |

```js
document.addEventListener("click", (event) => {
  if (event.ctrlKey) console.log("Ctrl+clic en", event.clientX, event.clientY);
});
```

### Teclado (`KeyboardEvent`)

| Propiedad | Qué contiene | Ejemplo |
|---|---|---|
| `key` | El **carácter o tecla lógica** producido | `"a"`, `"A"`, `"Enter"`, `"ArrowUp"`, `"Escape"`, `" "` |
| `code` | La **tecla física**, independiente del idioma del teclado | `"KeyA"`, `"Enter"`, `"Space"`, `"Digit1"` |
| `repeat` | `true` si se genera por mantener pulsada la tecla | |
| Modificadores | `altKey`, `ctrlKey`, `shiftKey`, `metaKey` | |

> `keyCode` y `which` (números) están **obsoletos**. Aparecen mucho en código antiguo; hoy se usa `key` (o `code` para juegos y atajos por posición).

### Formularios

```js
input.addEventListener("input", (event) => {
  console.log(event.target.value); // valor actual del campo
});
```

## 4. Tipos de objeto evento

```
Event
├── UIEvent
│   ├── MouseEvent
│   │   └── PointerEvent   (click, pointerdown…)
│   ├── KeyboardEvent      (keydown, keyup)
│   ├── FocusEvent         (focus, blur, focusin, focusout)
│   └── InputEvent         (input)
├── SubmitEvent            (submit)
└── CustomEvent            (eventos propios, 2.6)
```

Útil para buscar en MDN: si `event.key` no aparece en `Event`, búscalo en `KeyboardEvent`.

## 5. Un mismo manejador para varios elementos

Gracias al objeto `event`, una sola función puede servir para varios elementos:

```js
function mostrarColor(event) {
  document.body.style.background = event.currentTarget.dataset.color;
}

document.querySelectorAll("[data-color]").forEach((boton) => {
  boton.addEventListener("click", mostrarColor);
});
```

---

## Pruébalo tú

Abre [demos/02-objeto-event.html](demos/02-objeto-event.html).

1. **Inspector de eventos**: haz clic en distintas partes de la tarjeta (en el icono, el texto o el borde). El panel muestra `type`, `target`, `currentTarget` y las coordenadas.
2. Repite con <kbd>Ctrl</kbd> o <kbd>Shift</kbd> pulsadas, y con el botón derecho.
3. **Teclado**: escribe en el campo con distintas teclas (letras, <kbd>Shift</kbd>+letra, flechas, <kbd>Espacio</kbd>). Compara `key` y `code`. Si cambias la distribución del teclado (p. ej. a inglés), verás que `key` cambia y `code` no.
4. **`isTrusted`**: el botón "Simular clic" hace `tarjeta.click()` y muestra `isTrusted: false`.

## Errores frecuentes

- Usar `event.target` esperando el elemento del listener y recibir un hijo (`<img>`, `<span>`, `<strong>`).
- Leer `event.currentTarget` de forma asíncrona (dentro de un `setTimeout` o tras un `await`): ya vale `null`. Guárdalo antes en una constante.
- Usar `keyCode === 13` en lugar de `key === "Enter"`.

## Resumen

```
(event) => { ... }
event.type            "click", "keydown"…
event.target          dónde se ORIGINÓ (puede ser un hijo)
event.currentTarget   quién tiene el LISTENER
Ratón:   clientX/Y · pageX/Y · offsetX/Y · button · ctrlKey/shiftKey/altKey
Teclado: key ("Enter", "a") · code ("KeyA")      (keyCode ❌ obsoleto)
```
