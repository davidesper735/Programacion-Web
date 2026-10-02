# 1.6 Atributos, propiedades, clases y estilos

## Idea clave

> **Un atributo es lo que escribes en el HTML; una propiedad es el valor que tiene el objeto en memoria. Suelen estar sincronizados, pero no siempre. Para el estado actual (p. ej. lo que ha escrito el usuario) se lee la propiedad.**

## 1. Métodos de atributos

Funcionan con **cualquier** atributo, incluidos los inventados:

```html
<a id="enlace" href="/contacto" title="Contacto">Contacto</a>
```

```js
const a = document.getElementById("enlace");

a.getAttribute("href");            // "/contacto"   (tal cual está en el HTML)
a.setAttribute("title", "Escríbenos");
a.hasAttribute("target");          // false
a.removeAttribute("title");
a.toggleAttribute("hidden");       // lo pone si no está y lo quita si está (atributos booleanos)
a.getAttributeNames();             // ["id", "href"]
```

## 2. Propiedades

La mayoría de atributos estándar tienen una **propiedad** equivalente en el objeto:

```js
a.id;        // "enlace"
a.href;      // "http://localhost:5500/contacto"  ← ¡URL absoluta!
a.title = "Nuevo título";

img.src; img.alt; input.type; input.disabled; label.htmlFor;
```

### Diferencias que hay que conocer

| | Atributo | Propiedad |
|---|---|---|
| Tipo | Siempre **cadena** | El tipo "natural": `boolean`, `number`, cadena… |
| `href`, `src` | Como se escribió: `"/contacto"` | URL **resuelta** (absoluta) |
| Atributos booleanos | `getAttribute("disabled")` → `""` o `null` | `el.disabled` → `true`/`false` |
| `class` | `getAttribute("class")` | `el.className` (porque `class` es palabra reservada) |
| `for` | `getAttribute("for")` | `label.htmlFor` |
| `style` | La cadena CSS | Un objeto (`CSSStyleDeclaration`) |

### El caso importante: `value`

```html
<input id="nombre" value="Ana">
```

El usuario borra y escribe "Luis":

```js
const input = document.getElementById("nombre");

input.value;                  // "Luis" ← el valor ACTUAL (propiedad)
input.getAttribute("value");  // "Ana"  ← el valor INICIAL (atributo)
input.defaultValue;           // "Ana"
```

➡️ **Para leer lo que ha escrito el usuario: `input.value`, nunca `getAttribute("value")`.** Lo mismo con `checkbox.checked` frente a `getAttribute("checked")`.

### Regla práctica

- Atributos **estándar** → usar la **propiedad** (`el.id`, `el.href`, `input.value`, `btn.disabled = true`).
- Atributos **no estándar** o `aria-*` → `getAttribute`/`setAttribute`.
- Atributos de **datos propios** → `dataset` (siguiente apartado).

## 3. `data-*` y `dataset`

HTML5 permite guardar datos propios en atributos que empiezan por `data-`:

```html
<li id="producto" data-id="42" data-precio="19.99" data-en-stock="true">Teclado</li>
```

```js
const li = document.getElementById("producto");

li.dataset.id;        // "42"
li.dataset.precio;    // "19.99"   ← siempre cadenas: Number(li.dataset.precio)
li.dataset.enStock;   // "true"    ← data-en-stock  →  dataset.enStock (camelCase)

li.dataset.categoria = "periféricos"; // crea data-categoria="periféricos"
delete li.dataset.enStock;            // elimina el atributo
```

Uso típico: **asociar un identificador** a un elemento de la interfaz para saber a qué dato corresponde cuando el usuario hace clic (lo usaremos en la delegación de eventos, lección 2.4).

## 4. Clases: `classList` ✅

```js
const caja = document.querySelector(".caja");

caja.classList.add("activa");               // añade (varias: add("a", "b"))
caja.classList.remove("activa");
caja.classList.toggle("abierta");           // pone o quita; devuelve true si queda puesta
caja.classList.toggle("error", hayError);   // pone si hayError es true y quita si es false
caja.classList.contains("abierta");         // true / false
caja.classList.replace("azul", "rojo");
```

Frente a `className`:

```js
caja.className = "activa";   // ⚠️ SUSTITUYE todas las clases por "activa"
caja.className += " activa"; // funciona, pero es frágil (espacios, duplicados)
```

### El patrón recomendado: **JS cambia clases, CSS decide el aspecto**

```css
.menu { display: none; }
.menu.abierto { display: block; }
```

```js
boton.addEventListener("click", () => menu.classList.toggle("abierto"));
```

Así el diseño sigue en el CSS, es fácil añadir transiciones y el código JS es más corto.

## 5. Estilos en línea: `style`

```js
caja.style.backgroundColor = "tomato";   // background-color → backgroundColor
caja.style.width = "200px";              // ⚠️ con unidad: "200" no funciona
caja.style.setProperty("margin-top", "1rem");
caja.style.backgroundColor = "";         // quita el estilo en línea
caja.style.cssText = "color: red; padding: 8px"; // sustituye todos los estilos en línea
```

- `style` **solo** lee y escribe el atributo `style` del elemento (**estilos en línea**), no lo que venga de las hojas CSS.
- Para leer el estilo **final** aplicado: `getComputedStyle`.

```js
getComputedStyle(caja).fontSize; // "16px"  (siempre en unidades absolutas; solo lectura)
```

¿Cuándo usar `style` y no clases? Cuando el valor es **dinámico y continuo**: una posición calculada, un porcentaje de progreso, un color elegido por el usuario…

### Variables CSS desde JS

Combinan lo mejor de ambos mundos: JS pone el valor y CSS decide dónde se usa.

```css
.barra { width: calc(var(--progreso) * 1%); background: var(--color, steelblue); }
```

```js
barra.style.setProperty("--progreso", 75);
document.documentElement.style.setProperty("--color", "tomato"); // para toda la página
getComputedStyle(barra).getPropertyValue("--progreso"); // "75"
```

## 6. Atributos útiles para mostrar y ocultar

```js
el.hidden = true;           // atributo HTML hidden → equivale a display: none
boton.disabled = true;      // desactiva botones y campos
```

> ⚠️ Si el CSS le da un `display` al elemento (p. ej. `display: flex`), ese CSS gana a `hidden`. Solución habitual: `[hidden] { display: none !important; }`.

---

## Pruébalo tú

Abre [demos/06-atributos.html](demos/06-atributos.html).

1. **Atributo o propiedad**: escribe en el `<input>` y pulsa "Comparar": `value` cambia, `getAttribute("value")` no. Lo mismo con el *checkbox* y con el `href` relativo frente al absoluto.
2. **dataset**: los botones de producto muestran sus `data-*` en camelCase y tipo cadena.
3. **classList**: cambia el aspecto de la tarjeta con `toggle`. Mira en DevTools (Elements) cómo cambia el atributo `class` en tiempo real.
4. **style y variables CSS**: mueve los *sliders*. Uno usa `style.width` y el otro una variable CSS. El registro muestra con `getComputedStyle` el valor final.

## Errores frecuentes

- Leer `getAttribute("value")` para saber qué ha escrito el usuario.
- `el.style.width = 200` (sin unidad): no hace nada.
- `el.style.color` devuelve `""` aunque el texto sea rojo: el rojo viene del CSS, no del estilo en línea.
- `className = "x"` borrando sin querer las demás clases.
- `dataset.precio + 1` → `"19.991"` (concatenación de cadenas).

## Resumen

```
Atributo (HTML, cadena)          Propiedad (objeto JS, tipo real, estado actual)
getAttribute / setAttribute      el.id · el.href · input.value · input.checked

data-foo-bar="x"  →  el.dataset.fooBar  (siempre cadena)
classList.add / remove / toggle / contains     ← el modo preferido de cambiar el aspecto
style.prop = "valor+unidad"  (solo en línea)   getComputedStyle(el)  (valor final, solo lectura)
style.setProperty("--variable", valor)
```
