# 1.4 Recorrer el árbol

## Idea clave

> **Cada nodo sabe quién es su padre, sus hijos y sus hermanos. Hay dos juegos de propiedades: uno que incluye textos y comentarios (nodos) y otro que solo ve etiquetas (elementos). En el día a día usamos el de elementos.**

## 1. HTML de referencia

```html
<ul id="lista">
  <li>Uno</li>
  <li id="dos">Dos</li>
  <!-- comentario -->
  <li>Tres</li>
</ul>
```

Árbol real (con los nodos de espacio en blanco):

```
ul#lista
├── #text "\n  "
├── li  "Uno"
├── #text "\n  "
├── li#dos  "Dos"
├── #text "\n  "
├── #comment " comentario "
├── #text "\n  "
├── li  "Tres"
└── #text "\n"
```

## 2. Las dos familias de propiedades

| Relación | Todos los **nodos** | Solo **elementos** ✅ |
|---|---|---|
| Padre | `parentNode` | `parentElement` |
| Hijos | `childNodes` (NodeList viva) | `children` (HTMLCollection viva) |
| Primer hijo | `firstChild` | `firstElementChild` |
| Último hijo | `lastChild` | `lastElementChild` |
| Hermano siguiente | `nextSibling` | `nextElementSibling` |
| Hermano anterior | `previousSibling` | `previousElementSibling` |
| Nº de hijos | `childNodes.length` | `childElementCount` / `children.length` |

```js
const lista = document.getElementById("lista");

lista.firstChild;          // #text "\n  "   ← sorpresa
lista.firstElementChild;   // <li>Uno</li>   ← lo que queríamos

const dos = document.getElementById("dos");
dos.nextSibling;           // #text "\n  "
dos.nextElementSibling;    // <li>Tres</li>  (se salta el texto Y el comentario)
dos.previousElementSibling;// <li>Uno</li>

dos.parentElement;         // <ul id="lista">
lista.children.length;     // 3
lista.childNodes.length;   // 9
```

### ¿Cuándo difieren `parentNode` y `parentElement`?

Casi nunca. La única diferencia práctica: el padre de `<html>` es `document`, que es un nodo pero **no** un elemento.

```js
document.documentElement.parentNode;    // #document
document.documentElement.parentElement; // null
```

## 3. Recorrer hijos

```js
// ✅ Con for...of (children es iterable)
for (const li of lista.children) {
  console.log(li.textContent);
}

// ✅ Convertir a array para usar métodos de array
const textos = [...lista.children].map((li) => li.textContent); // ["Uno", "Dos", "Tres"]

// ⚠️ HTMLCollection NO tiene forEach
lista.children.forEach(...);           // ❌ TypeError
```

## 4. Recorrer hermanos

```js
// Todos los hermanos siguientes de #dos
let actual = dos.nextElementSibling;
while (actual) {
  console.log(actual.textContent);
  actual = actual.nextElementSibling;
}
```

## 5. Subir hasta un ancestro

```js
dos.parentElement.parentElement;  // frágil: depende de la estructura exacta
dos.closest("section");           // ✅ robusto: el <section> más cercano hacia arriba
```

> Si el HTML cambia (se añade un `<div>` intermedio), las cadenas de `parentElement` se rompen; `closest` sigue funcionando. **Prefiere `closest` para subir y `querySelector` para bajar.**

## 6. ¿Recorrer o seleccionar?

| Situación | Mejor opción |
|---|---|
| Buscar algo en la página | `querySelector` / `querySelectorAll` |
| Tengo un elemento y quiero su padre, su hermano o su primer hijo | Propiedades de recorrido |
| Tengo un elemento y quiero un ancestro concreto | `closest()` |
| Recorrer un árbol completo (p. ej. para generar un índice) | Recursión sobre `children` |

Ejemplo de recorrido recursivo (el que usa la demo de 1.1):

```js
function recorrer(elemento, nivel = 0) {
  console.log("  ".repeat(nivel) + elemento.tagName);
  for (const hijo of elemento.children) {
    recorrer(hijo, nivel + 1);
  }
}
recorrer(document.body);
```

---

## Pruébalo tú

Abre [demos/04-recorrer.html](demos/04-recorrer.html).

1. Haz clic en cualquier elemento de la zona de pruebas: queda como **elemento actual** (resaltado).
2. Usa los botones (`parentElement`, `firstElementChild`, `nextElementSibling`…) para "navegar" por el árbol. El registro muestra cada paso.
3. Cambia al modo **"nodos"** y repite: aparecen los `#text` y el `#comment`, que no se pueden resaltar. Así se ve por qué es incómodo trabajar con nodos.

## Errores frecuentes

- Usar `firstChild`/`nextSibling` esperando un elemento y recibir un texto de espacios.
- `children.forEach`: `HTMLCollection` no tiene `forEach`.
- Largas cadenas de `.parentElement.parentElement.parentElement` en vez de `closest`.

## Resumen

```
         parentElement
               ↑
previousElementSibling ← [ elemento ] → nextElementSibling
               ↓
   firstElementChild … children … lastElementChild

Sin "Element" en el nombre → incluye textos y comentarios
```
