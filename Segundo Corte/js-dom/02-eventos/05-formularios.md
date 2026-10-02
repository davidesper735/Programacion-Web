# 2.5 Eventos de formulario, `FormData` y validación

## Idea clave

> **El formulario se gestiona desde el evento `submit` del `<form>`, no desde el clic del botón. Se cancela el envío por defecto, se recogen los datos con `FormData` y se deja que HTML haga la mayor parte de la validación.**

## 1. Eventos de los campos

| Evento | Cuándo se dispara | Uso típico |
|---|---|---|
| `input` | **Cada vez** que cambia el valor (cada tecla, pegar, autocompletar…) | Búsqueda en vivo, contador de caracteres, validar mientras se escribe |
| `change` | Cuando el cambio se **confirma**: al salir del campo de texto, o al momento en *checkbox*, *radio*, `<select>`, `range` al soltar… | Guardar una preferencia, reaccionar a un `<select>` |
| `focus` / `blur` | El campo gana o pierde el foco (**no suben**) | Mostrar ayuda, validar al salir |
| `focusin` / `focusout` | Igual, pero **sí suben** → aptos para delegación | |
| `submit` | Se envía el formulario (en el **`<form>`**) | Procesar el formulario |
| `reset` | Se restablece el formulario | |

```js
const nombre = document.querySelector("#nombre");

nombre.addEventListener("input", () => console.log("input:", nombre.value));  // H, Ho, Hol, Hola
nombre.addEventListener("change", () => console.log("change:", nombre.value)); // Hola (al salir)
```

### Leer el valor según el tipo de campo

```js
input.value;           // texto, email, password, number (¡cadena!), date ("2026-09-29")…
input.valueAsNumber;   // number y range → número (NaN si está vacío)
checkbox.checked;      // true / false
select.value;          // value de la <option> elegida
document.querySelector('input[name="talla"]:checked')?.value; // grupo de radios
```

## 2. El evento `submit` ✅

```html
<form id="registro">
  <input name="email" type="email" required>
  <button>Registrarse</button> <!-- dentro de un form, un <button> es type="submit" por defecto -->
</form>
```

```js
const form = document.getElementById("registro");

form.addEventListener("submit", (event) => {
  event.preventDefault();   // ¡imprescindible! si no, la página se recarga
  // …procesar los datos
});
```

¿Por qué `submit` y no `click` en el botón?

- `submit` se dispara también al pulsar **Enter** en un campo.
- Solo se dispara **si la validación HTML se supera** (campos `required`, `type="email"`…).
- Es lo **accesible** y lo semántico.

> ⚠️ Si dentro del formulario hay un botón que **no** debe enviarlo (p. ej. "Mostrar contraseña"), hay que declararlo `type="button"`.

## 3. Recoger los datos: `FormData` ✅

En lugar de leer los campos uno a uno:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const datos = new FormData(form);

  datos.get("email");              // valor de un campo (por su atributo name)
  datos.getAll("intereses");       // varios checkboxes con el mismo name → array
  datos.has("acepto");             // un checkbox sin marcar NO aparece

  const objeto = Object.fromEntries(datos); // { email: "...", edad: "20", ... }
  console.log(objeto);
});
```

- Usa el atributo **`name`** de cada campo: **sin `name`, el campo no se incluye**.
- Todos los valores son **cadenas** (o `File` para `type="file"`).
- `Object.fromEntries` se queda solo con el **último** valor de los campos repetidos: para ellos, usar `getAll`.
- Se puede enviar tal cual con `fetch` (tema 3): `fetch(url, { method: "POST", body: datos })`.

También se puede acceder a los campos por nombre desde el formulario: `form.elements.email.value`.

## 4. Validación nativa de HTML5

Antes de escribir validación en JavaScript, conviene aprovechar la que trae HTML:

```html
<input name="nombre"   required minlength="2" maxlength="40">
<input name="email"    type="email" required>
<input name="edad"     type="number" min="16" max="120">
<input name="codigo"   pattern="[0-9]{5}" title="5 dígitos">
<input name="web"      type="url">
```

El navegador impide el envío y muestra un mensaje si algo no cumple. Además, el CSS puede reaccionar:

```css
input:user-invalid { border-color: crimson; }  /* inválido y el usuario ya ha interactuado */
input:valid        { border-color: seagreen; }
```

> `:user-invalid` es la versión moderna de `:invalid` que **no** marca los campos en rojo nada más cargar la página.

### La API de validación desde JS (*Constraint Validation API*)

```js
email.checkValidity();     // true/false (y dispara el evento "invalid" si es false)
email.reportValidity();    // igual, pero además muestra el mensaje al usuario
email.validity;            // { valueMissing, typeMismatch, tooShort, patternMismatch, … , valid }
email.validationMessage;   // el mensaje que mostraría el navegador

form.checkValidity();      // ¿es válido el formulario entero?
```

### Validaciones personalizadas: `setCustomValidity`

Para reglas que HTML no puede expresar (p. ej. "las contraseñas coinciden"):

```js
const clave = form.elements.clave;
const repetir = form.elements.repetir;

repetir.addEventListener("input", () => {
  repetir.setCustomValidity(
    repetir.value === clave.value ? "" : "Las contraseñas no coinciden"
  );
});
```

- Un mensaje **no vacío** marca el campo como inválido: el formulario no se envía y el mensaje aparece como si fuera nativo.
- Cadena **vacía** = válido. **Hay que limpiarlo**, o el campo quedará inválido para siempre.

### Mensajes propios en lugar de los globos del navegador

Con el atributo `novalidate` en el `<form>`, el navegador **no** bloquea el envío ni muestra sus globos, pero la API sigue funcionando. Así podemos pintar nuestros mensajes:

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    for (const campo of form.elements) {
      const error = campo.parentElement.querySelector(".error"); // <small class="error">
      if (error) error.textContent = campo.validationMessage;
    }
    return;
  }
  enviar(new FormData(form));
});
```

> ⚠️ **La validación en el cliente es para la comodidad del usuario, no para la seguridad.** Cualquiera puede saltársela (DevTools, `curl`…). El servidor **siempre** debe volver a validar.

## 5. Patrón completo

```js
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;          // 1. validar

  const datos = Object.fromEntries(new FormData(form)); // 2. recoger
  const boton = form.querySelector("button");
  boton.disabled = true;                       // 3. evitar dobles envíos

  try {
    await enviarAlServidor(datos);             // 4. enviar (tema 3)
    form.reset();                              // 5. limpiar
  } finally {
    boton.disabled = false;
  }
});
```

---

## Pruébalo tú

Abre [demos/05-formularios.html](demos/05-formularios.html).

1. **`input` frente a `change`**: escribe en el campo de nombre y observa el registro. Luego cambia el `<select>` y el *range*.
2. **Contador de caracteres** en la biografía (evento `input`).
3. **Envío**: rellena mal el formulario y pulsa Enviar. Se muestran los mensajes propios (el formulario tiene `novalidate`) y el registro muestra el `campo.validity` de cada campo con error.
4. **Contraseñas**: pon dos distintas y observa `setCustomValidity`.
5. **Envío correcto**: se muestra el objeto de `Object.fromEntries(new FormData(form))` y `getAll("intereses")`. La página **no** se recarga.

## Errores frecuentes

- Escuchar `click` en el botón en vez de `submit` en el formulario (y romper el Enter).
- Olvidar `preventDefault()`: la página se recarga y los datos "desaparecen".
- Campos sin `name` que no aparecen en `FormData`.
- Tratar `input.value` de un `type="number"` como número: es una cadena.
- `setCustomValidity("…")` sin volver a ponerlo a `""`: el formulario nunca se puede enviar.

## Resumen

```
input  → cada cambio         change → al confirmar         submit → en el <form>
form.addEventListener("submit", (e) => { e.preventDefault(); ... })
new FormData(form) → get(name) · getAll(name) · Object.fromEntries(datos)
HTML: required · type · min/max · minlength · pattern     CSS: :user-invalid / :valid
JS: checkValidity() · reportValidity() · validity · setCustomValidity("msg" | "")
Validar en cliente = comodidad · Validar en servidor = seguridad
```
