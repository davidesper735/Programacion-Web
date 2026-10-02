# 2.4 Delegación de eventos

## Idea clave

> **En lugar de poner un listener en cada hijo, se pone uno en el contenedor. Cuando llega el evento (por la burbuja), se mira `event.target` para saber qué hijo lo originó y se actúa en consecuencia.**

## 1. El problema

Una lista de tareas en la que cada tarea tiene un botón "Borrar":

```js
// ❌ Un listener por botón
document.querySelectorAll(".borrar").forEach((boton) => {
  boton.addEventListener("click", () => boton.closest("li").remove());
});
```

Problemas:

1. **Las tareas nuevas no funcionan**: los botones que se añadan después no tienen listener. Habría que acordarse de añadirlo cada vez que se crea uno.
2. **Muchos listeners**: con 1000 tareas, 1000 funciones en memoria.
3. Si se vuelve a pintar la lista (`replaceChildren`, `innerHTML`), hay que volver a registrar todo, y es fácil **duplicar** listeners.

## 2. La solución: delegar en el contenedor

```html
<ul id="tareas">
  <li data-id="1">Comprar pan <button class="borrar">✕</button></li>
  <li data-id="2">Estudiar DOM <button class="borrar">✕</button></li>
</ul>
```

```js
const lista = document.getElementById("tareas");

lista.addEventListener("click", (event) => {
  const boton = event.target.closest(".borrar"); // ¿el clic viene de (o de dentro de) un .borrar?
  if (!boton || !lista.contains(boton)) return;  // no: ignorar

  const li = boton.closest("li");
  console.log("Borrar tarea", li.dataset.id);
  li.remove();
});
```

- **Un solo listener**, pase lo que pase con la lista.
- Funciona con los elementos **que aún no existen**: cualquier `.borrar` que se añada después.
- La lista se puede volver a pintar entera sin tocar los eventos.

## 3. ¿Por qué `closest` y no `event.target` directamente?

Si el botón tiene contenido (un icono, un `<span>`), `event.target` puede ser ese hijo:

```html
<button class="borrar"><svg>…</svg> Borrar</button>
```

```js
event.target.matches(".borrar");  // ❌ false si se hizo clic en el <svg>
event.target.closest(".borrar");  // ✅ el <button>, tanto si el clic fue en él como en su icono
```

`closest` empieza por el propio elemento y sube: cubre los dos casos.

> La comprobación `lista.contains(boton)` es una precaución: evita reaccionar a un `.borrar` que esté **fuera** de la lista, en el caso (raro) de que la propia lista esté dentro de otro `.borrar`. En la mayoría de casos se puede omitir.

## 4. Varias acciones en un mismo listener

Con atributos `data-accion`, un único listener puede despachar varias acciones:

```html
<li data-id="7">
  <span class="texto">Estudiar DOM</span>
  <button data-accion="completar">✓</button>
  <button data-accion="editar">✎</button>
  <button data-accion="borrar">✕</button>
</li>
```

```js
lista.addEventListener("click", (event) => {
  const boton = event.target.closest("[data-accion]");
  if (!boton) return;

  const li = boton.closest("li");
  const id = Number(li.dataset.id);

  switch (boton.dataset.accion) {
    case "completar": li.classList.toggle("hecha"); break;
    case "editar":    editarTarea(id); break;
    case "borrar":    li.remove(); break;
  }
});
```

## 5. Delegación con otros eventos

Funciona con cualquier evento que **haga burbuja**:

```js
// Un listener para todos los campos de un formulario
formulario.addEventListener("input", (event) => {
  console.log(event.target.name, "=", event.target.value);
});

// Foco: focus no sube → usar focusin
formulario.addEventListener("focusin", (event) => {
  event.target.closest(".campo")?.classList.add("con-foco");
});
```

## 6. ¿Cuándo delegar?

| Situación | ¿Delegar? |
|---|---|
| Lista, tabla o rejilla de elementos del mismo tipo | ✅ Sí |
| Elementos que se crean y destruyen dinámicamente | ✅ Sí |
| Un botón concreto y único ("Guardar", "Abrir menú") | No hace falta: listener directo |
| Eventos que no suben (`focus`, `mouseenter`…) | Usar sus equivalentes que suben (`focusin`, `mouseover`) |
| Eventos muy frecuentes (`pointermove`) sobre un área enorme | Con cuidado: el listener se ejecuta muchísimas veces |

---

## Pruébalo tú

Abre [demos/04-delegacion.html](demos/04-delegacion.html). Tiene dos listas idénticas, lado a lado:

1. **Izquierda: un listener por botón**. Añade tareas nuevas y prueba a borrarlas: **no funcionan**. El contador muestra cuántos listeners hay.
2. **Derecha: delegación**. Añade tareas y bórralas: funcionan todas. El contador muestra 1 listener.
3. Pulsa **"Volver a pintar"** en la lista de la izquierda: si se vuelven a registrar los listeners sin cuidado, se **duplican** (el registro muestra que un clic se procesa varias veces).
4. En la lista de la derecha, prueba los botones de acción (completar, subir, borrar) y fíjate en el `switch` del código.

## Errores frecuentes

- Usar `event.target.classList.contains(...)` o `matches(...)` y fallar cuando el clic cae en un hijo del botón.
- Olvidar el `if (!boton) return;`: cualquier clic en la lista (en el texto, en los huecos) intenta ejecutar la acción y da `TypeError`.
- Delegar en `document` todo lo de la página: funciona, pero es mejor delegar en el **contenedor más cercano**, que deja más claro qué gestiona cada listener.

## Resumen

```
contenedor.addEventListener("click", (event) => {
  const el = event.target.closest(".selector");   // 1. ¿de dónde viene?
  if (!el) return;                                // 2. si no nos interesa, salir
  // 3. actuar (usar el.dataset para saber qué dato es)
});

✅ 1 listener · ✅ elementos futuros · ✅ repintar sin miedo
```
