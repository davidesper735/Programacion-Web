const muestra = document.getElementById("muestra");

const TIPOS = {
  [Node.ELEMENT_NODE]: "ELEMENTO",
  [Node.TEXT_NODE]: "TEXTO",
  [Node.COMMENT_NODE]: "COMENTARIO",
};

function describir(nodo) {
  const tipo = TIPOS[nodo.nodeType] ?? nodo.nodeType;
  if (nodo.nodeType === Node.ELEMENT_NODE) {
    return `<${nodo.nodeName.toLowerCase()}>  (nodeType ${nodo.nodeType} · ${tipo})`;
  }
  // JSON.stringify deja ver los saltos de línea y espacios: "\n    "
  return `${nodo.nodeName} ${JSON.stringify(nodo.nodeValue)}  (nodeType ${nodo.nodeType} · ${tipo})`;
}

// Recorre el árbol recursivamente y lo dibuja con sangría
function dibujar(nodo, soloElementos, prefijo = "", esUltimo = true, esRaiz = true) {
  const conector = esRaiz ? "" : esUltimo ? "└── " : "├── ";
  log(prefijo + conector + describir(nodo));

  const hijos = soloElementos ? nodo.children : nodo.childNodes;
  const prefijoHijos = esRaiz ? "" : prefijo + (esUltimo ? "    " : "│   ");

  [...hijos].forEach((hijo, i) => {
    dibujar(hijo, soloElementos, prefijoHijos, i === hijos.length - 1, false);
  });
}

document.getElementById("btn-completo").addEventListener("click", () => {
  limpiarLog();
  dibujar(muestra, false);
  log(`\nchildNodes del recuadro: ${muestra.childNodes.length}`);
});

document.getElementById("btn-elementos").addEventListener("click", () => {
  limpiarLog();
  dibujar(muestra, true);
  log(`\nchildren del recuadro: ${muestra.children.length}`);
});

document.getElementById("btn-limpiar").addEventListener("click", limpiarLog);
