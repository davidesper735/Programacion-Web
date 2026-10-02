# 1.5 Leer y modificar contenido (y XSS)

## Idea clave

> **`textContent` trata el contenido como texto; `innerHTML` lo interpreta como HTML. Si el contenido viene del usuario o de fuera, usa `textContent`.**

## 1. Las tres propiedades

HTML de referencia:

```html
<p id="parrafo">
  Hola <strong>mundo</strong>
  <span style="display:none">oculto</span>
</p>
```

| Propiedad | Lectura | Escritura |
|---|---|---|
| `textContent` | Todo el texto de los descendientes, **tal cual** (incluye el oculto y los espacios del HTML) | Sustituye todo el contenido por **un nodo de texto**. Las etiquetas aparecen literalmente. |
| `innerText` | El texto **tal como se ve** en pantalla: respeta el CSS (omite lo oculto, aplica saltos de línea) | Parecido a `textContent`, pero convierte `\n` en `<br>` |
| `innerHTML` | El HTML interno **como cadena** | **Interpreta** la cadena como HTML y crea los nodos |

```js
const p = document.getElementById("parrafo");

p.textContent; // "\n  Hola mundo\n  oculto\n"
p.innerText;   // "Hola mundo"
p.innerHTML;   // '\n  Hola <strong>mundo</strong>\n  <span style="display:none">oculto</span>\n'
```

Escritura:

```js
p.textContent = "Adiós <em>mundo</em>"; // se ve literalmente: Adiós <em>mundo</em>
p.innerHTML   = "Adiós <em>mundo</em>"; // se ve: Adiós *mundo* (en cursiva)
```

### ¿Cuál elegir?

- **`textContent`**: la opción por defecto para leer y escribir texto. Es rápida y segura.
- **`innerText`**: cuando necesitas el texto **visible** (p. ej. para copiar al portapapeles). Es más lenta, porque obliga al navegador a calcular el CSS.
- **`innerHTML`**: cuando necesitas insertar **HTML que tú controlas** (una plantilla fija). Nunca con datos del usuario sin escapar.

### `outerHTML`

Igual que `innerHTML` pero **incluye el propio elemento**:

```js
p.outerHTML; // '<p id="parrafo">…</p>'
p.outerHTML = "<div>Nuevo</div>"; // sustituye el <p> entero por un <div>
```

## 2. Efectos secundarios de asignar `innerHTML`

Asignar `innerHTML` **destruye y recrea** todos los hijos:

```js
const lista = document.querySelector("ul");
const primero = lista.firstElementChild;
primero.addEventListener("click", () => alert("clic"));

lista.innerHTML += "<li>Nuevo</li>"; // ⚠️ parece que "añade"…
// …pero en realidad: lee el HTML, le concatena texto y vuelve a crear TODOS los <li>
primero.isConnected; // false: el <li> original ya no está en el DOM
// El listener se ha perdido, y también lo que el usuario hubiera escrito en un <input>
```

**`innerHTML +=` es un antipatrón.** Para añadir contenido usaremos `append` o `insertAdjacentHTML` (lección 1.7).

## 3. XSS: por qué `innerHTML` con datos del usuario es peligroso

**XSS** (*Cross-Site Scripting*): un atacante consigue que **su** código JavaScript se ejecute en **tu** página, en el navegador de **otro** usuario. Con ello puede robar la sesión, hacer acciones en su nombre, mostrar formularios falsos…

Ejemplo: un sistema de comentarios.

```js
// ❌ VULNERABLE
function mostrarComentario(texto) {
  comentarios.innerHTML += `<li>${texto}</li>`;
}
```

Un "comentario" como este:

```html
<img src="x" onerror="alert('Tu sesión: ' + document.cookie)">
```

…se interpreta como HTML: la imagen no carga, se dispara `onerror` y **se ejecuta el código del atacante**. Si el comentario se guarda en el servidor, se ejecutará en el navegador de **todos** los que lo lean.

> Curiosidad: `innerHTML` **no** ejecuta etiquetas `<script>` insertadas, pero eso no protege de nada: hay decenas de vías alternativas (`onerror`, `onload`, `<a href="javascript:...">`, `<svg onload>`…).

### Cómo evitarlo

```js
// ✅ SEGURO: crear el elemento y asignar el texto
function mostrarComentario(texto) {
  const li = document.createElement("li");
  li.textContent = texto;       // se muestra literalmente, nunca se interpreta
  comentarios.append(li);
}
```

Reglas:

1. **Datos de fuera** (formularios, URL, APIs, base de datos) → `textContent`, o atributos con `setAttribute`.
2. **`innerHTML` solo con cadenas fijas** escritas por ti, o con los datos **escapados**.
3. Si de verdad hay que insertar HTML del usuario (p. ej. un editor de texto enriquecido), usar una librería de saneamiento como **DOMPurify**. Existe además la *Sanitizer API* del navegador (`element.setHTML()`), que se está incorporando progresivamente a los navegadores.

> Frameworks como React, Vue o Angular escapan el texto por defecto precisamente por esto. Sus vías para insertar HTML tienen nombres que avisan: `dangerouslySetInnerHTML`, `v-html`…

## 4. Plantillas con `innerHTML`: sí, pero con cuidado

Construir HTML con *template literals* es cómodo y legítimo **si los datos son de confianza o se escapan**:

```js
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML; // "<" → "&lt;", "&" → "&amp;"…
}

tarjeta.innerHTML = `
  <h3>${escaparHTML(usuario.nombre)}</h3>
  <p>${escaparHTML(usuario.bio)}</p>
`;
```

En la lección 1.7 veremos alternativas que evitan el problema de raíz (`createElement` y `<template>`).

---

## Pruébalo tú

Abre [demos/05-contenido.html](demos/05-contenido.html).

1. **Las tres propiedades**: pulsa "Leer" y compara las tres salidas. Fíjate en el texto oculto y en los espacios.
2. **Escribir**: escribe `Hola <em>mundo</em>` y aplícalo con cada propiedad.
3. **XSS**: en el "libro de visitas", publica el comentario malicioso que viene precargado con el botón **vulnerable** (`innerHTML`): aparece un `alert`. Publica el mismo texto con el botón **seguro** (`textContent`): se muestra como texto.
4. **`innerHTML +=`**: escribe algo en el `<input>` de la lista y pulsa "Añadir con innerHTML +=": lo que habías escrito desaparece. Repite con `append`: se conserva.

## Errores frecuentes

- Usar `innerHTML` "por costumbre" para poner texto plano.
- `innerHTML +=` dentro de un bucle: lento y destruye el estado.
- Pensar que "como `<script>` no se ejecuta, `innerHTML` es seguro".

## Resumen

```
textContent → texto (rápido, seguro)         ← por defecto
innerText   → texto visible (respeta el CSS, más lento)
innerHTML   → interpreta HTML → ⚠️ XSS con datos externos

Datos del usuario → textContent / createElement
innerHTML += …    → NO (recrea todo, pierde listeners y estado)
```
