const form = document.getElementById("registro");
const { nombre, clave, repetir, bio, nivel, pais } = form.elements;

// --- 1. input frente a change -------------------------------------------------
nombre.addEventListener("input", () => log(`input   nombre = "${nombre.value}"`));
nombre.addEventListener("change", () => log(`change  nombre = "${nombre.value}"  (al salir del campo)`));
pais.addEventListener("change", () => log(`change  pais = "${pais.value}"  (inmediato en <select>)`));

nivel.addEventListener("input", () => {
  document.getElementById("nivel-valor").textContent = nivel.value;
});
nivel.addEventListener("change", () => {
  log(`change  nivel.value = "${nivel.value}" (${typeof nivel.value}) · valueAsNumber = ${nivel.valueAsNumber}`);
});

// --- 2. Contador de caracteres --------------------------------------------------
const contador = document.getElementById("contador");
bio.addEventListener("input", () => {
  contador.textContent = `${bio.value.length} / ${bio.maxLength}`;
});

// --- 3. Validación personalizada: contraseñas iguales ---------------------------
function comprobarClaves() {
  repetir.setCustomValidity(repetir.value === clave.value ? "" : "Las contraseñas no coinciden");
}
clave.addEventListener("input", comprobarClaves);
repetir.addEventListener("input", comprobarClaves);

// --- 4. Mensajes de error propios ------------------------------------------------
function mostrarError(campo) {
  const error = document.getElementById(`error-${campo.name}`);
  if (error) error.textContent = campo.validationMessage;
}

// Delegación: al salir de cualquier campo (focusout sube; blur no)
form.addEventListener("focusout", (event) => {
  if (event.target.willValidate) mostrarError(event.target);
});

// Mientras se escribe, solo se BORRA el error cuando el campo ya es válido
form.addEventListener("input", (event) => {
  if (event.target.validity?.valid) mostrarError(event.target);
});

// --- 5. Envío --------------------------------------------------------------------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarLog();

  if (!form.checkValidity()) {
    log("❌ Formulario inválido. validity de cada campo con error:");
    for (const campo of form.elements) {
      if (!campo.willValidate) continue;
      mostrarError(campo);
      if (!campo.validity.valid) {
        const fallos = Object.keys(ValidityState.prototype).filter((k) => k !== "valid" && campo.validity[k]);
        log(`  ${campo.name}: ${fallos.join(", ")} → "${campo.validationMessage}"`);
      }
    }
    form.querySelector(":invalid")?.focus();
    return;
  }

  const datos = new FormData(form);
  log("✅ Enviado sin recargar la página");
  log("Object.fromEntries(new FormData(form)) →");
  log(JSON.stringify(Object.fromEntries(datos), null, 2));
  log(`datos.getAll("intereses") → ${JSON.stringify(datos.getAll("intereses"))}`);
});

form.addEventListener("reset", () => {
  form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  repetir.setCustomValidity("");
  // El reset ocurre después del evento: actualizamos en la siguiente vuelta
  setTimeout(() => {
    contador.textContent = `0 / ${bio.maxLength}`;
    document.getElementById("nivel-valor").textContent = nivel.value;
  });
  log("reset");
});

document.getElementById("btn-limpiar").addEventListener("click", limpiarLog);
