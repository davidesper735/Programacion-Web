// Este fichero se carga con "defer": cuando se ejecuta, el DOM ya está completo
const titulo = document.querySelector("h1");
registrar(`[defer]   document.querySelector("h1") → <h1> "${titulo.textContent}"`);
