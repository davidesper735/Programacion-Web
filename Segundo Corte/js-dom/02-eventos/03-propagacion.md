# 2.3 Propagación: captura, burbuja y acciones por defecto

## Idea clave

> **Un clic en un botón también es un clic en su `<div>`, en el `<body>` y en todo el documento. El evento baja desde `window` hasta el elemento pulsado y luego sube de vuelta. `stopPropagation()` corta ese viaje; `preventDefault()` cancela lo que el navegador haría por defecto. Son cosas distintas.**

## 1. Las tres fases

```html
<div id="abuelo">
  <div id="padre">
    <button id="hijo">Clic</button>
  </div>
</div>
```

Al hacer clic en el botón:

```
              window
                │   ▲
                ▼   │
             document
                │   ▲
  1. CAPTURA    ▼   │   3. BURBUJA (bubbling)
             #abuelo
                │   ▲
                ▼   │
              #padre
                │   ▲
                ▼   │
          ┌──────────────┐
          │   #hijo      │  2. OBJETIVO (target)
          └──────────────┘
```

1. **Captura**: el evento baja desde `window` hasta el padre del objetivo.
2. **Objetivo**: llega al elemento donde se originó (`event.target`).
3. **Burbuja**: sube de vuelta hasta `window`.

Por defecto, `addEventListener` escucha en la fase de **burbuja**. Con `{ capture: true }` (o `true` como tercer argumento) escucha en la de **captura**.

```js
for (const id of ["abuelo", "padre", "hijo"]) {
  const el = document.getElementById(id);
  el.addEventListener("click", () => console.log("burbuja:", id));
  el.addEventListener("click", () => console.log("captura:", id), { capture: true });
}
```

Clic en el botón:

```
captura: abuelo
captura: padre
captura: hijo      ← en el objetivo se ejecutan los dos (primero los de captura)
burbuja: hijo
burbuja: padre
burbuja: abuelo
```

> En la práctica, el **95 % del tiempo trabajaremos con la burbuja**. La captura se usa en casos concretos (p. ej. interceptar un evento antes que nadie). Lo importante es entender que **el evento sube**.

`event.eventPhase` indica la fase actual: `1` captura, `2` objetivo, `3` burbuja.

## 2. ¿Por qué es útil la burbuja?

Porque permite escuchar en un **ancestro** los eventos de **todos sus descendientes**, incluidos los que se creen más tarde. Es la base de la **delegación de eventos** (lección 2.4).

```js
document.querySelector("ul").addEventListener("click", (event) => {
  console.log("Clic en", event.target); // el <li> concreto
});
```

## 3. Detener la propagación: `stopPropagation()`

```js
padre.addEventListener("click", () => console.log("padre"));

hijo.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("hijo"); // "padre" ya no se imprimirá
});
```

- `stopPropagation()`: el evento no sigue hacia otros elementos, pero **los demás listeners del mismo elemento sí se ejecutan**.
- `stopImmediatePropagation()`: además, impide que se ejecuten los listeners restantes **del mismo elemento**.

### ⚠️ Úsalo con moderación

Detener la propagación tiene efectos colaterales: rompe cualquier código que escuche más arriba. Ejemplo típico: un menú desplegable que se cierra con "clic fuera" escuchando en `document`. Si algún botón hace `stopPropagation()`, pulsarlo **no cerrará el menú**. También afecta a herramientas de analítica.

Casi siempre hay una alternativa mejor: comprobar `event.target` en el listener de arriba:

```js
// En vez de stopPropagation en el hijo…
padre.addEventListener("click", (event) => {
  if (event.target.closest("button")) return; // ignorar clics que vienen de un botón
  // …lógica del padre
});
```

## 4. Acciones por defecto: `preventDefault()`

Muchos eventos tienen un comportamiento **por defecto** del navegador:

| Evento | Acción por defecto |
|---|---|
| `click` en `<a href>` | Navegar al enlace |
| `submit` en `<form>` | Enviar el formulario y **recargar la página** |
| `click` en un *checkbox* | Marcarlo o desmarcarlo |
| `keydown` en un `<input>` | Escribir el carácter |
| `contextmenu` | Mostrar el menú contextual |
| `wheel`/`touchmove` | Desplazar la página |

`preventDefault()` la **cancela**:

```js
formulario.addEventListener("submit", (event) => {
  event.preventDefault();    // no recargar la página
  // validar y enviar con fetch (tema 3)
});

enlace.addEventListener("click", (event) => {
  event.preventDefault();    // no navegar
  abrirModal(enlace.href);
});
```

- `event.defaultPrevented` → `true` si alguien ya la ha cancelado.
- Solo funciona si `event.cancelable` es `true` (no se puede cancelar, por ejemplo, un `scroll` ya ocurrido).
- Con `{ passive: true }`, el navegador **ignora** `preventDefault()` (ver 2.1).
- `return false` en un listener de `addEventListener` **no hace nada**. Solo funcionaba en los `onclick` antiguos (y en jQuery). No lo uses.

## 5. `stopPropagation` frente a `preventDefault`

| | `stopPropagation()` | `preventDefault()` |
|---|---|---|
| ¿Qué detiene? | El **viaje** del evento por el árbol | La **acción del navegador** |
| ¿Otros listeners más arriba se enteran? | No | Sí |
| ¿Se navega / se envía / se marca? | Sí (si no se cancela aparte) | No |

Son **independientes**: se puede usar uno, el otro o los dos.

## 6. Eventos que no suben

La mayoría de eventos hacen burbuja, pero **no todos**: `focus`, `blur`, `mouseenter`, `mouseleave`, `load`, `scroll` (en elementos)…

Para algunos existe una versión que sí sube:

| No sube | Sí sube |
|---|---|
| `focus` | `focusin` |
| `blur` | `focusout` |
| `mouseenter` | `mouseover` |
| `mouseleave` | `mouseout` |

`event.bubbles` indica si un evento sube.

---

## Pruébalo tú

Abre [demos/03-propagacion.html](demos/03-propagacion.html).

1. Haz clic en el botón interior con la captura desactivada: se ve la burbuja **hijo → padre → abuelo** (cada caja se ilumina en orden).
2. Activa **"Escuchar también en captura"** y repite: aparece la bajada completa.
3. Activa **`stopPropagation` en el padre**: la burbuja se corta ahí.
4. Sección de acciones por defecto: el enlace, el formulario y el *checkbox*, con y sin `preventDefault()`.
5. Sección **"el menú y el clic fuera"**: con `stopPropagation` activado en el botón, el menú ya no se cierra al pulsarlo: es el efecto colateral de cortar la propagación.

## Errores frecuentes

- Usar `stopPropagation()` cuando lo que se quería era `preventDefault()` (o al revés).
- `return false` esperando que cancele el envío del formulario.
- Olvidar `preventDefault()` en `submit`: la página se recarga y "no pasa nada" (en realidad, pasa y se borra al recargar).
- Añadir `stopPropagation()` "por si acaso" en todas partes.

## Resumen

```
CAPTURA ↓ (window → … → padre)   OBJETIVO (target)   BURBUJA ↑ (padre → … → window)
addEventListener(tipo, fn)                  → burbuja (por defecto)
addEventListener(tipo, fn, {capture:true})  → captura

event.stopPropagation()  → el evento deja de viajar
event.preventDefault()   → el navegador no hace su acción (navegar, enviar, marcar…)
focus/blur no suben → focusin/focusout sí
```
