# Fundamentos de JavaScript

Guía para aprender los fundamentos de JavaScript: desde qué es el lenguaje hasta
crear tus propias funciones.

Aquí no vas a encontrar diapositivas: vas a encontrar **código que se ejecuta**.
Cada tema tiene la explicación escrita dentro de un archivo `.js` que puedes
correr, modificar y romper las veces que quieras. Esa es justamente la idea.

---

## Antes de empezar

Necesitas dos cosas:

1. **Un navegador** (Chrome o Firefox). Ya lo tienes.
2. **Node.js**, para ejecutar código sin abrir una página web.
   Descárgalo en <https://nodejs.org> (versión LTS) y comprueba que quedó
   instalado abriendo una terminal y escribiendo:

```bash
node --version
```

Si te responde con un número de versión, estás listo.

---

## Cómo estudiar cada tema

Entra a la carpeta del tema y ejecuta la teoría:

```bash
cd 03-variables
node teoria.js
```

Vas a ver en la terminal el resultado de cada ejemplo explicado en el archivo.
Después abre `teoria.js` en tu editor y sigue las secciones numeradas mientras
comparas con lo que imprimió.

Cuando termines la teoría, trabaja los ejercicios:

```bash
node ejercicios.js
```

El archivo trae los enunciados y los espacios marcados con `TODO` donde
escribes tu código. Ejecútalo cada vez que completes un ejercicio para ver
si funciona.

> **El paso que más te va a enseñar:** cambia los valores de los ejemplos de
> `teoria.js` y vuelve a ejecutar. Predecir qué va a pasar *antes* de correr el
> código es la mejor forma de comprobar si de verdad entendiste.

---

## Qué hay en cada carpeta

| Archivo | Qué contiene |
|---|---|
| `teoria.js` | La explicación del tema en código comentado, con ejemplos que imprimen su resultado. |
| `ejercicios.js` | Los ejercicios que debes resolver, marcados con `TODO`. |
| `demo.html` | Solo en los temas 1 y 2: la parte que necesita navegador. |

Los temas 1 y 2 traen `demo.html` porque `<script>`, `defer`, `alert` y
`prompt` **solo existen en el navegador**, no en Node. Para esos, abre el
archivo en Chrome y presiona **F12** para ver la consola.

---

## Los 12 temas

| # | Carpeta | Qué vas a aprender |
|---|---|---|
| 1 | [01-introduccion](01-introduccion/) | Qué es JavaScript, de dónde viene, dónde se ejecuta, cómo se enlaza al HTML (`<script>`, `src`, `defer`/`async`) y cómo usar la consola del navegador |
| 2 | [02-javascript-cliente](02-javascript-cliente/) | Qué puede y qué no puede hacer JavaScript en el navegador, en qué se diferencia del servidor, y `alert`, `prompt` y `console.log` |
| 3 | [03-variables](03-variables/) | `var`, `let` y `const`, dónde "vive" cada variable (ámbito), qué es el hoisting y cómo nombrar bien |
| 4 | [04-tipos-de-datos](04-tipos-de-datos/) | `string`, `number`, `boolean`, `null`, `undefined`, template literals y por qué `"5" + 3` no da 8 |
| 5 | [05-objetos](05-objetos/) | Cómo agrupar datos en objetos, acceder a sus propiedades, anidarlos y qué significa `this` |
| 6 | [06-metodos-nativos](06-metodos-nativos/) | Los métodos que ya trae el lenguaje: `String`, `Number`, `Math` y `Date` |
| 7 | [07-arreglos](07-arreglos/) | Listas de datos: crearlas, recorrerlas y transformarlas con `push`, `splice`, `map`, `filter` y `forEach` |
| 8 | [08-operadores](08-operadores/) | Operadores aritméticos, de asignación, de comparación (`==` vs `===`), lógicos y el ternario |
| 9 | [09-condicionales](09-condicionales/) | Tomar decisiones con `if`, `else if` y `switch`, y qué valores JavaScript considera verdaderos o falsos |
| 10 | [10-bucles-for](10-bucles-for/) | Repetir con `for` y recorrer arreglos y textos con `for...of` |
| 11 | [11-bucles-while](11-bucles-while/) | `while`, `do...while`, `for...in`, y cómo cortar o saltar vueltas con `break` y `continue` |
| 12 | [12-funciones](12-funciones/) | Crear tus propias funciones, pasarles datos, devolver resultados y usar arrow functions |

Los temas están numerados en orden: cada uno usa lo del anterior, así que
conviene no saltárselos.

---

## Errores que te van a pasar (a todos nos pasan)

Están explicados dentro de los archivos. Cuando algo no funcione, revisa
primero esta lista:

| Lo que ves | Qué está pasando | Tema |
|---|---|---|
| `"20" + 1` da `"201"` | `prompt()` siempre devuelve **texto**, no números. Conviértelo con `Number()` | 2 |
| Una variable vale `undefined` sin razón | Usaste `var` o la leíste antes de declararla | 3 |
| `"5" + 3` da `"53"` pero `"5" - 3` da `2` | El `+` concatena si hay texto; los demás operadores convierten a número | 4 |
| Cambiaste una copia y se dañó el original | Los objetos se copian **por referencia**, no por valor | 5 |
| `0.1 + 0.2` no da `0.3` | Así funcionan los decimales en binario. Usa `toFixed()` | 4 y 6 |
| `[10, 9, 100].sort()` da `[10, 100, 9]` | `sort()` ordena como texto. Pásale `(a, b) => a - b` | 7 |
| Tu `else if` siempre entra al mismo lado | Pusiste la condición más amplia de primera | 9 |
| Un `switch` ejecuta varios casos | Te faltó el `break` | 9 |
| Al final del recorrido aparece `undefined` | Usaste `<=` en vez de `<` con `.length` | 10 |
| El programa se congela y no termina | Bucle infinito: olvidaste el incremento. Corta con **Ctrl + C** | 11 |
| Tu función devuelve `undefined` | Usaste `console.log` donde iba `return` | 12 |

---

## Recomendaciones para trabajar

- **Escribe el código, no lo copies y pegues.** Equivocarte al escribir y
  corregirlo es parte de aprender a programar.
- **Lee los mensajes de error completos.** Dicen el archivo, la línea y el tipo
  de error. Casi siempre te están diciendo exactamente qué pasa.
- **Usa `console.log()` para investigar.** Cuando algo no funciona, imprime las
  variables involucradas y mira qué contienen de verdad.
- **Nombra bien tus variables.** `precioTotal` le sirve a quien lea tu código;
  `x` no le sirve ni a ti mismo la semana siguiente.

---

## Documentación de referencia

Cuando necesites consultar un método o quieras ir más allá:

- **MDN Web Docs** (en español): <https://developer.mozilla.org/es/docs/Web/JavaScript>
  Es la referencia oficial y la que se usa en la industria.
- **JavaScript.info**: <https://es.javascript.info/>
  Tutorial completo, muy bien explicado y gratuito.
