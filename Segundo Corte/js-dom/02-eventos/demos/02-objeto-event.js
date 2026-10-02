const tabla = document.getElementById("propiedades");

// Pinta en la tabla las propiedades pedidas del evento
function mostrar(event, propiedades) {
  const filas = propiedades.map((nombre) => {
    const tr = document.createElement("tr");
    const clave = document.createElement("td");
    const valor = document.createElement("td");
    clave.textContent = `event.${nombre}`;
    valor.textContent = formatear(event[nombre]);
    tr.append(clave, valor);
    return tr;
  });
  tabla.replaceChildren(...filas);
  console.log(event); // en DevTools se puede desplegar el objeto completo
}

// --- Ratón --------------------------------------------------------------------
const tarjeta = document.getElementById("tarjeta");
const PROPIEDADES_RATON = [
  "type", "target", "currentTarget", "isTrusted",
  "clientX", "clientY", "offsetX", "offsetY", "pageX", "pageY",
  "button", "ctrlKey", "shiftKey", "altKey", "pointerType", "timeStamp",
];

tarjeta.addEventListener("click", (event) => mostrar(event, PROPIEDADES_RATON));

tarjeta.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // evita el menú contextual para ver el evento (se explica en 2.3)
  mostrar(event, PROPIEDADES_RATON);
});

document.getElementById("btn-simular").addEventListener("click", () => {
  tarjeta.click(); // evento generado por código → isTrusted: false
});

// --- Teclado --------------------------------------------------------------------
const PROPIEDADES_TECLADO = [
  "type", "key", "code", "repeat", "ctrlKey", "shiftKey", "altKey", "metaKey",
  "target", "isTrusted", "keyCode",
];

document.getElementById("campo").addEventListener("keydown", (event) => {
  mostrar(event, PROPIEDADES_TECLADO);
});
