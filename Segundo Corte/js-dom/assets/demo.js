// Utilidad compartida por las demos: escribe en la consola de DevTools
// y también en el primer elemento .log de la página, para verla sin abrir DevTools.
function log(...valores) {
  console.log(...valores);
  const salida = document.querySelector(".log");
  if (!salida) return;
  const texto = valores
    .map((v) => (typeof v === "string" ? v : formatear(v)))
    .join(" ");
  salida.textContent += texto + "\n";
  salida.scrollTop = salida.scrollHeight;
}

function limpiarLog() {
  console.clear();
  const salida = document.querySelector(".log");
  if (salida) salida.textContent = "";
}

function formatear(valor) {
  if (valor === null || valor === undefined) return String(valor);
  if (valor instanceof Node) {
    if (valor.nodeType === Node.TEXT_NODE) return `#text ${JSON.stringify(valor.textContent)}`;
    if (valor.nodeType === Node.ELEMENT_NODE) {
      const id = valor.id ? `#${valor.id}` : "";
      const clases = valor.classList.length ? "." + [...valor.classList].join(".") : "";
      return `<${valor.tagName.toLowerCase()}${id}${clases}>`;
    }
    return valor.nodeName;
  }
  if (valor instanceof NodeList || valor instanceof HTMLCollection) {
    return `${valor.constructor.name}(${valor.length}) [${[...valor].map(formatear).join(", ")}]`;
  }
  try {
    return JSON.stringify(valor);
  } catch {
    return String(valor);
  }
}
