# JavaScript y el DOM

Guía para aprender a manipular páginas web con JavaScript: cómo el navegador representa el HTML (el DOM), cómo leerlo y modificarlo, cómo reaccionar a lo que hace el usuario (eventos) y cómo pintar datos que llegan de un servidor.

Cada lección incluye:

- **Explicación** de los conceptos, con ejemplos de código.
- **Pruébalo tú**: una demo en HTML (carpeta `demos/`) para abrir en el navegador y ver cada concepto funcionando.
- **Errores frecuentes**, para reconocerlos cuando te pasen.
- **Resumen** con lo esencial de la lección.

## Antes de empezar

Necesitas conocer HTML y CSS básicos (etiquetas, atributos, selectores CSS) y los fundamentos de JavaScript: variables (`let`/`const`), funciones (incluidas las funciones flecha), arrays (`forEach`, `map`, `filter`), objetos y *template literals*.

## Cómo usar las demos

Abre los `.html` directamente en el navegador (doble clic) y abre DevTools (`F12`). Todas las demos comparten la hoja de estilos [assets/demo.css](assets/demo.css).
Las demos del tema 3 usan `fetch` contra una API pública, así que necesitan conexión a Internet. Para ellas se recomienda un servidor local (`npx serve .` o la extensión *Live Server* de VS Code).

---

## Temario

### 1. Manejo del DOM

| # | Lección | Demo |
|---|---|---|
| 1.1 | [Qué es el DOM: árbol de nodos y tipos de nodos](01-dom/01-arbol-y-tipos-de-nodos.md) | [demo](01-dom/demos/01-arbol.html) |
| 1.2 | [Cargar JavaScript correctamente](01-dom/02-cargar-javascript.md) | [demo](01-dom/demos/02-carga.html) |
| 1.3 | [Seleccionar elementos](01-dom/03-seleccionar-elementos.md) | [demo](01-dom/demos/03-seleccionar.html) |
| 1.4 | [Recorrer el árbol](01-dom/04-recorrer-el-arbol.md) | [demo](01-dom/demos/04-recorrer.html) |
| 1.5 | [Leer y modificar contenido (y XSS)](01-dom/05-contenido-y-seguridad.md) | [demo](01-dom/demos/05-contenido.html) |
| 1.6 | [Atributos, propiedades, clases y estilos](01-dom/06-atributos-y-propiedades.md) | [demo](01-dom/demos/06-atributos.html) |
| 1.7 | [Crear, insertar y eliminar nodos](01-dom/07-crear-insertar-eliminar.md) | [demo](01-dom/demos/07-crear.html) |
| 1.8 | Ejercicios sobre DOM | *próximamente* |

### 2. Eventos

| # | Lección | Demo |
|---|---|---|
| 2.1 | [Escuchar eventos: `addEventListener`](02-eventos/01-add-event-listener.md) | [demo](02-eventos/demos/01-listeners.html) |
| 2.2 | [El objeto `event`](02-eventos/02-objeto-event.md) | [demo](02-eventos/demos/02-objeto-event.html) |
| 2.3 | [Propagación: captura, burbuja y acciones por defecto](02-eventos/03-propagacion.md) | [demo](02-eventos/demos/03-propagacion.html) |
| 2.4 | [Delegación de eventos](02-eventos/04-delegacion.md) | [demo](02-eventos/demos/04-delegacion.html) |
| 2.5 | [Eventos de formulario, `FormData` y validación](02-eventos/05-formularios.md) | [demo](02-eventos/demos/05-formularios.html) |
| 2.6 | [Teclado, puntero, ventana y eventos personalizados](02-eventos/06-teclado-puntero-ventana.md) | [demo](02-eventos/demos/06-teclado-puntero.html) |
| 2.7 | Ejercicios sobre eventos | *próximamente* |

### 3. DOM + datos (taller)

| # | Lección | Demo |
|---|---|---|
| 3.1 | [`fetch` y `async/await`: traer datos y pintarlos](03-dom-y-datos/01-fetch-async-await.md) | [demo](03-dom-y-datos/demos/01-fetch.html) |
| 3.2 | [Taller: directorio de usuarios](03-dom-y-datos/02-taller-directorio.md) | [punto de partida](03-dom-y-datos/demos/taller-inicio.html) |
