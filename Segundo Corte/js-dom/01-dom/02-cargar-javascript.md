# 1.2 Cargar JavaScript correctamente

## Idea clave

> **Un script solo puede tocar los elementos que ya existen en el DOM. Si el script se ejecuta antes de que el navegador haya leído ese HTML, el elemento "no existe" todavía.**

## 1. El problema

```html
<head>
  <script>
    const titulo = document.querySelector("h1");
    titulo.textContent = "Cambiado"; // ❌ TypeError: Cannot set properties of null
  </script>
</head>
<body>
  <h1>Original</h1>
</body>
```

El navegador lee el HTML **de arriba abajo**. Cuando encuentra un `<script>` normal:

1. **Detiene** la construcción del DOM.
2. Descarga el script (si es externo) y lo **ejecuta**.
3. Continúa leyendo el HTML.

En el ejemplo, el `<h1>` aún no se ha leído, así que `querySelector` devuelve `null`.

## 2. Las soluciones, de la más antigua a la recomendada

### a) Script al final del `<body>` (la solución clásica)

```html
<body>
  <h1>Original</h1>
  <script src="app.js"></script>  <!-- aquí el <h1> ya existe -->
</body>
```

Funciona, pero el navegador no empieza a **descargar** el script hasta llegar al final del HTML.

### b) `DOMContentLoaded`

```js
document.addEventListener("DOMContentLoaded", () => {
  // Aquí el DOM completo ya está construido
  document.querySelector("h1").textContent = "Cambiado";
});
```

Útil cuando no controlamos dónde se incluye el script.

### c) `defer` ✅ **recomendado para scripts clásicos**

```html
<head>
  <script src="app.js" defer></script>
</head>
```

- El script se **descarga en paralelo** mientras se construye el DOM (sin bloquearlo).
- Se **ejecuta cuando el DOM está completo**, justo antes de `DOMContentLoaded`.
- Varios scripts con `defer` se ejecutan **en el orden en que aparecen**.
- Solo funciona con scripts externos (`src`).

### d) `type="module"` ✅ **recomendado si usamos `import`/`export`**

```html
<head>
  <script type="module" src="app.js"></script>
</head>
```

Los módulos se comportan como `defer` **de forma automática**. Además tienen su propio ámbito (las variables no son globales), activan el modo estricto y permiten `import`/`export`.

> ⚠️ Los módulos no funcionan abriendo el fichero con doble clic (`file://`): necesitan un servidor local (Live Server, `npx serve`…).

### e) `async` (para scripts independientes)

```html
<script src="analytics.js" async></script>
```

Se descarga en paralelo y se ejecuta **en cuanto llega**, interrumpiendo la construcción del DOM si hace falta. **No garantiza ni el orden ni que el DOM esté listo.** Sirve para scripts que no dependen de nada, como analítica o publicidad. **No lo uses para código que manipula el DOM.**

## 3. Resumen visual

```
Script normal en <head>
  HTML:   ████▌ (pausa) ░░░░░░░░ ▐██████████
  JS:          ↓descarga ▶ejecuta

defer / type="module"
  HTML:   ████████████████████████
  JS:     ↓descarga (en paralelo)   ▶ejecuta → DOMContentLoaded

async
  HTML:   ██████████▌(pausa)▐████████
  JS:     ↓descarga   ▶ejecuta (cuando llega)
```

## 4. `DOMContentLoaded` frente a `load`

| Evento | Se dispara cuando… | Uso típico |
|---|---|---|
| `document` → `DOMContentLoaded` | el DOM está construido y los scripts `defer` se han ejecutado. **No espera** a imágenes ni hojas de estilo. | Inicializar la interfaz |
| `window` → `load` | además han cargado **todas** las imágenes, iframes, CSS… | Medir el tamaño de imágenes, ocultar un *loader* de página completa |

```js
document.addEventListener("DOMContentLoaded", () => console.log("DOM listo"));
window.addEventListener("load", () => console.log("Todo cargado (imágenes incluidas)"));
```

## 5. ¿Y `window.onload = function () {...}`?

Está en muchos tutoriales antiguos. Problemas:

- Espera a **todas** las imágenes: la interfaz tarda más en responder.
- Si otro script asigna también `window.onload`, **sobrescribe** el anterior. Con `addEventListener` pueden convivir varios (lo veremos en 2.1).

## Regla práctica para el curso

> **Scripts externos en el `<head>` con `defer` (o `type="module"`). Nada de JavaScript en línea en el HTML.**

---

## Pruébalo tú

Abre [demos/02-carga.html](demos/02-carga.html) con la consola abierta y **recarga** varias veces.

1. Observa el orden de los mensajes en el registro, con el tiempo en milisegundos: script normal en el `<head>`, script normal al final del `<body>`, script con `defer`, `DOMContentLoaded` y `load`.
2. El script normal del `<head>` informa de que el `<h1>` es `null`; el del final del `<body>` y el de `defer` sí lo encuentran.
3. La imagen es "pesada" (un SVG con miles de círculos): se ve que `load` llega después de `DOMContentLoaded`.
4. Abre el código fuente de la demo (`Ctrl+U`) y relaciona cada mensaje con su `<script>`.

## Errores frecuentes

- `Cannot read properties of null` al hacer `querySelector` desde un script en el `<head>` sin `defer`.
- Poner `defer` en un `<script>` sin `src`: **se ignora**.
- Usar `async` para el código principal de la aplicación y obtener errores intermitentes.

## Resumen

```
<script src="app.js" defer>        → descarga en paralelo, ejecuta con el DOM listo, en orden
<script type="module" src="app.js"> → igual que defer + import/export
<script async>                      → cuando llegue, sin orden (solo scripts independientes)
DOMContentLoaded → DOM listo        load → todo cargado (imágenes incluidas)
```
