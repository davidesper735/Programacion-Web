# 1.1 Qué es el DOM: árbol de nodos y tipos de nodos

## Idea clave

> **El HTML es texto. El DOM es un árbol de objetos que vive en memoria. JavaScript no toca el HTML: toca el DOM, y el navegador repinta la página según el DOM.**

## 1. Del HTML al DOM

Cuando el navegador recibe un documento HTML:

1. **Lee** el texto (el _parsing_).
2. **Construye** un árbol de objetos: el **DOM** (_Document Object Model_).
3. **Pinta** la página a partir de ese árbol (y del CSS).

```
  index.html  ──parse──▶  DOM (árbol en memoria)  ──render──▶  píxeles en pantalla
   (texto)                     ▲
                               │ lee y modifica
                          JavaScript
```

El DOM es una **API estándar** (definida por el WHATWG en el _DOM Living Standard_): el mismo código funciona en Chrome, Firefox y Safari. No forma parte del lenguaje JavaScript; es algo que **el navegador ofrece** a JavaScript. Por eso en Node.js no existe `document`.

### El DOM no es igual al HTML fuente

El navegador **corrige y completa** el HTML:

```html
<!-- Fichero original -->
<table>
  <tr>
    <td>Hola</td>
  </tr>
</table>
<p>Párrafo sin cerrar</p>
```

En el DOM aparecen un `<tbody>` que nadie escribió, `<html>`, `<head>` y `<body>` aunque falten, y el `<p>` cerrado.
➡️ **"Ver código fuente"** (`Ctrl+U`) abre una pestaña nueva con el **HTML** tal como llegó del servidor. Para ver el **DOM**, vuelve a la pestaña de la página y abre DevTools (`F12`) → pestaña **Elements**.

## 2. El árbol

Tomemos este documento:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <title>Mi página</title>
  </head>
  <body>
    <h1>Hola</h1>
    <p>Esto es <strong>importante</strong>.</p>
    <!-- un comentario -->
  </body>
</html>
```

Su árbol simplificado (sin los nodos de espacio en blanco):

```
document
└── html
    ├── head
    │   └── title
    │       └── "Mi página"
    └── body
        ├── h1
        │   └── "Hola"
        ├── p
        │   ├── "Esto es "
        │   ├── strong
        │   │   └── "importante"
        │   └── "."
        └── <!-- un comentario -->
```

Vocabulario que usaremos todo el curso:

| Término                   | Significado                     | Ejemplo                              |
| ------------------------- | ------------------------------- | ------------------------------------ |
| **Raíz**                  | El nodo del que cuelga todo     | `document`                           |
| **Padre** (_parent_)      | Nodo inmediatamente superior    | `p` es el padre de `strong`          |
| **Hijos** (_children_)    | Nodos inmediatamente inferiores | `h1` y `p` son hijos de `body`       |
| **Hermanos** (_siblings_) | Nodos con el mismo padre        | `h1` y `p`                           |
| **Descendientes**         | Hijos, nietos…                  | `"importante"` desciende de `body`   |
| **Ancestros**             | Padre, abuelo…                  | `body` y `html` son ancestros de `p` |

## 3. Tipos de nodos

**Todo** en el árbol es un **nodo** (`Node`), pero no todos los nodos son iguales:

| Tipo       | `nodeType` | Constante                     | `nodeName`             | Ejemplo           |
| ---------- | ---------- | ----------------------------- | ---------------------- | ----------------- |
| Elemento   | `1`        | `Node.ELEMENT_NODE`           | `"P"`, `"DIV"`…        | `<p>`             |
| Texto      | `3`        | `Node.TEXT_NODE`              | `"#text"`              | `"Hola"`          |
| Comentario | `8`        | `Node.COMMENT_NODE`           | `"#comment"`           | `<!-- … -->`      |
| Documento  | `9`        | `Node.DOCUMENT_NODE`          | `"#document"`          | `document`        |
| Doctype    | `10`       | `Node.DOCUMENT_TYPE_NODE`     | `"html"`               | `<!DOCTYPE html>` |
| Fragmento  | `11`       | `Node.DOCUMENT_FRAGMENT_NODE` | `"#document-fragment"` | lo veremos en 1.7 |

```js
const p = document.querySelector("p");

p.nodeType; // 1
p.nodeType === Node.ELEMENT_NODE; // true  ← mejor usar la constante que el número
p.nodeName; // "P"  (en mayúsculas en documentos HTML)
p.firstChild.nodeType; // 3  → el texto "Esto es "
p.firstChild.nodeValue; // "Esto es "
```

> **¿Y los atributos?** En el estándar actual los atributos (`Attr`) **no forman parte del árbol**: no son hijos de nadie. Se accede a ellos desde el elemento (lo veremos en la lección 1.6). Muchos materiales antiguos los incluyen como nodo tipo 2 del árbol; hoy no es así.

### La trampa de los espacios en blanco

Los saltos de línea y la indentación del HTML **también son nodos de texto**:

```html
<ul id="lista">
  <li>Uno</li>
  <li>Dos</li>
</ul>
```

```js
const ul = document.getElementById("lista");
ul.childNodes.length; // 5 → #text, li, #text, li, #text
ul.children.length; // 2 → solo los elementos
```

Esto explica por qué en la práctica casi siempre usamos las propiedades de **elementos** (`children`, `firstElementChild`…) en lugar de las de **nodos** (`childNodes`, `firstChild`…). Lo veremos en detalle en la lección 1.4.

## 4. Jerarquía de objetos (para entender los nombres)

Cada nodo es un objeto con una "herencia" de interfaces:

```
EventTarget            ← puede recibir eventos (tema 2)
└── Node               ← nodeType, parentNode, childNodes, textContent…
    ├── Text
    ├── Comment
    ├── Document       ← document
    └── Element        ← id, classList, querySelector, getAttribute…
        └── HTMLElement        ← style, dataset, hidden, click()…
            ├── HTMLInputElement   ← value, checked…
            ├── HTMLAnchorElement  ← href…
            └── …
```

💡 **Cuando busques en MDN una propiedad y no aparezca en `HTMLInputElement`, sube a `HTMLElement`, `Element` o `Node`.**

## 5. Los objetos de entrada

| Objeto                            | Qué es                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `window`                          | La pestaña del navegador. Objeto global: `alert`, `setTimeout`, `innerWidth`… |
| `document`                        | La raíz del DOM. Punto de entrada para todo lo del temario.                   |
| `document.documentElement`        | El elemento `<html>`                                                          |
| `document.head` / `document.body` | Accesos directos a `<head>` y `<body>`                                        |

---

## Pruébalo tú

Abre [demos/01-arbol.html](demos/01-arbol.html) con DevTools abierto.

1. Pulsa **"Dibujar árbol completo"**: muestra **todos** los nodos, incluidos los de texto vacíos. Fíjate en los `#text "\n  "`: son los saltos de línea y la indentación del HTML.
2. Pulsa **"Solo elementos"**: el mismo árbol sin ruido.
3. Pestaña **Elements** de DevTools: localiza el `<tbody>` que el navegador ha añadido. Compáralo con el código fuente (`Ctrl+U`), donde no aparece.
4. Selecciona un nodo en **Elements** y escribe `$0` en la consola: es una referencia al nodo seleccionado. Prueba `$0.nodeType`, `$0.nodeName`, `$0.parentNode`.
5. Ejecuta en consola `document.body.childNodes` frente a `document.body.children`.

## Errores frecuentes

- Pensar que JS modifica el fichero `.html`. **No**: modifica el DOM en memoria; al recargar se pierde todo.
- Confundir _nodo_ y _elemento_. Todo elemento es un nodo, pero no todo nodo es un elemento (texto, comentarios…).
- Sorprenderse porque `firstChild` devuelve un texto vacío en lugar del primer elemento.

## Resumen

```
HTML (texto) → navegador → DOM (árbol de objetos) → pantalla
                              ↑ JavaScript lo lee y lo modifica

Nodo = cualquier cosa del árbol    Elemento = nodo que es una etiqueta
nodeType: 1 elemento · 3 texto · 8 comentario · 9 documento
Los espacios en blanco del HTML también son nodos de texto
```
