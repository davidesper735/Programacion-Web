// Este archivo se carga con: <script src="demo-defer.js" defer></script>
//
// defer  =  "descárgalo mientras lees el HTML, pero ejecútalo AL FINAL".
// Por eso este mensaje aparece DESPUÉS del script que está al final del body.
console.log("3) Script con DEFER: se ejecuta cuando el HTML está completo.");
console.log("   ¿Existe el <h1>?", document.querySelector("h1").textContent);
