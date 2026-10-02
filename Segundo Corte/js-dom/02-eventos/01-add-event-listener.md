# 2.1 Escuchar eventos: `addEventListener`

## Idea clave

> **Un evento es un aviso de que algo ha pasado (un clic, una tecla, la página ha cargado…). Nuestro código no se ejecuta "de arriba abajo y termina": registra funciones que el navegador llamará cuando ocurra cada evento.**

## 1. Programación dirigida por eventos

```js
console.log("1. Registro el listener");

boton.addEventListener("click", () => {
  console.log("3. ¡Clic!"); // se ejecuta más tarde, cuando el usuario haga clic
});

console.log("2. Fin del script");
```

El script termina enseguida. La función que pasamos (el **manejador**, *handler* o *listener*) queda **registrada** y el navegador la llama **cada vez** que ocurre el evento.

Algunos eventos habituales:

| Categoría | Eventos |
|---|---|
| Ratón / puntero | `click`, `dblclick`, `contextmenu`, `pointerdown`, `pointermove`, `pointerup`, `mouseenter`, `mouseleave` |
| Teclado | `keydown`, `keyup` |
| Formularios | `input`, `change`, `submit`, `focus`, `blur`, `reset` |
| Documento / ventana | `DOMContentLoaded`, `load`, `resize`, `scroll` |
| Otros | `transitionend`, `animationend`, `copy`, `paste`, `dragstart`, `drop`… |

## 2. Tres formas de asignar un manejador

### a) Atributo HTML ❌ (conocerlo, no usarlo)

```html
<button onclick="saludar()">Saludar</button>
```

- Mezcla HTML y JS.
- La función tiene que ser **global**.
- El código es una cadena: sin resaltado ni comprobación de errores.
- Suele bloquearse con políticas de seguridad (CSP).

Aparece en mucho código antiguo y en tutoriales, así que hay que saber reconocerlo.

### b) Propiedad `on<evento>` ⚠️ (válido, pero limitado)

```js
boton.onclick = () => console.log("A");
boton.onclick = () => console.log("B"); // ❌ SUSTITUYE al anterior: solo se verá "B"
boton.onclick = null;                   // lo quita
```

Solo admite **un** manejador por evento y elemento. Si dos partes del código (o dos librerías) usan `onclick`, una pisa a la otra.

### c) `addEventListener` ✅

```js
boton.addEventListener("click", () => console.log("A"));
boton.addEventListener("click", () => console.log("B")); // ✅ se ejecutan los dos, en orden
```

- Permite **varios** manejadores para el mismo evento.
- Se pueden quitar de forma selectiva.
- Admite opciones (`once`, `passive`, `signal`, `capture`).
- Funciona igual en **cualquier** objeto que emita eventos: elementos, `document`, `window`, `XMLHttpRequest`, `WebSocket`…

> Fíjate en el nombre: **`"click"`, no `"onclick"`**. `addEventListener("onclick", …)` no da error, pero nunca se ejecuta.

## 3. Pasar la función, no llamarla

```js
function saludar() { console.log("Hola"); }

boton.addEventListener("click", saludar);    // ✅ se pasa la función
boton.addEventListener("click", saludar());  // ❌ se EJECUTA ahora y se registra su resultado (undefined)
```

¿Y si necesito pasarle argumentos? Con una función flecha que envuelva la llamada:

```js
boton.addEventListener("click", () => saludar("Ana"));
```

## 4. Quitar un manejador: `removeEventListener`

Hay que pasar **la misma referencia** de función:

```js
function alHacerClic() { console.log("clic"); }

boton.addEventListener("click", alHacerClic);
boton.removeEventListener("click", alHacerClic);    // ✅ se quita

boton.addEventListener("click", () => console.log("clic"));
boton.removeEventListener("click", () => console.log("clic")); // ❌ no hace nada: es OTRA función
```

➡️ Si piensas quitarlo más tarde, **guarda la función en una constante**.

## 5. Opciones de `addEventListener`

```js
elemento.addEventListener(tipo, manejador, opciones);
```

| Opción | Efecto |
|---|---|
| `once: true` | Se ejecuta **una sola vez** y se elimina solo |
| `passive: true` | Promete que no llamará a `preventDefault()`; mejora la fluidez del *scroll* en `touchmove`/`wheel` |
| `capture: true` | Escucha en la fase de **captura** (lección 2.3) |
| `signal: controlador.signal` | Permite quitar el listener (o **muchos a la vez**) con un `AbortController` |

```js
// Solo la primera vez
boton.addEventListener("click", () => console.log("Bienvenida"), { once: true });

// Quitar varios listeners de golpe
const controlador = new AbortController();

window.addEventListener("resize", ajustar, { signal: controlador.signal });
document.addEventListener("keydown", atajos, { signal: controlador.signal });
boton.addEventListener("click", () => { /* ... */ }, { signal: controlador.signal });

controlador.abort(); // quita los tres (útil al cerrar un modal o un componente)
```

## 6. `this` dentro del manejador

```js
boton.addEventListener("click", function () {
  console.log(this);   // el botón (función normal)
});

boton.addEventListener("click", () => {
  console.log(this);   // NO es el botón (las flechas no tienen su propio this)
});
```

➡️ **Recomendación**: no depender de `this`; usar `event.currentTarget` (lección 2.2), que funciona igual con flechas y con funciones normales.

## 7. Disparar un evento desde código

```js
boton.click();                  // simula un clic (ejecuta sus listeners y la acción por defecto)
input.focus();                  // da el foco
formulario.requestSubmit();     // envía el formulario pasando por el evento submit y la validación
```

Los eventos personalizados (`CustomEvent` + `dispatchEvent`) se verán en la lección 2.6.

---

## Pruébalo tú

Abre [demos/01-listeners.html](demos/01-listeners.html).

1. **Orden de ejecución**: el registro muestra que "Fin del script" aparece antes de cualquier clic.
2. **`onclick` frente a `addEventListener`**: el botón A tiene dos `onclick` (solo funciona el último); el B tiene dos `addEventListener` (funcionan ambos).
3. **`removeEventListener`**: activa y desactiva un listener guardado en una constante. Luego prueba el botón "quitar (función anónima)": no quita nada.
4. **`once`** y **`AbortController`**: el botón de un solo uso deja de responder; "Parar todo" desactiva de golpe los tres listeners del rastreador.

## Errores frecuentes

- `addEventListener("onclick", …)`.
- `addEventListener("click", fn())`: llamar a la función en lugar de pasarla.
- Intentar quitar un listener anónimo.
- Añadir listeners dentro de una función que se ejecuta muchas veces, acumulando duplicados (cada clic "hace" la acción 2, 3, 4… veces).

## Resumen

```
elemento.addEventListener("click", manejador, { once, passive, capture, signal })
elemento.removeEventListener("click", manejador)   ← misma referencia

onclick="..." en HTML  → ❌
el.onclick = fn        → ⚠️ solo uno
addEventListener       → ✅ varios, opciones, se pueden quitar
```
