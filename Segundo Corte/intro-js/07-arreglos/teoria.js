/* ==========================================================================
   TEMA 7 · ARREGLOS Y SUS MÉTODOS
   --------------------------------------------------------------------------
   Objetivos:
     - Crear y recorrer arreglos.
     - Usar push, pop, shift, unshift, splice, slice.
     - Usar forEach, map, filter y otros métodos modernos.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. CREAR UN ARREGLO
// --------------------------------------------------------------------------
// Un arreglo (array) es una lista ORDENADA de valores. El primer elemento
// ocupa la posición 0 (índice 0).

console.log("=== 1. Creación ===");

const frutas = ["manzana", "banano", "pera"];       // notación literal (usar esta)
const numeros = new Array(1, 2, 3);                  // con constructor (poco usada)
const vacio = [];
const mezclado = ["texto", 42, true, null, { a: 1 }, [1, 2]];  // admite cualquier tipo

console.log(frutas);
console.log("Longitud:", frutas.length);
console.log("Mezclado:", mezclado);

// Acceso por índice:
console.log("frutas[0] ->", frutas[0]);
console.log("frutas[2] ->", frutas[2]);
console.log("frutas[9] ->", frutas[9], "(no existe: undefined)");
console.log("Último    ->", frutas[frutas.length - 1]);
console.log("Último con at(-1) ->", frutas.at(-1));   // forma moderna

// Modificar por índice:
frutas[1] = "mango";
console.log("Modificado:", frutas);


// --------------------------------------------------------------------------
// 2. AGREGAR Y QUITAR: push, pop, shift, unshift
// --------------------------------------------------------------------------
// Estos métodos MUTAN (modifican) el arreglo original.
//
//        unshift ->  [  A , B , C  ]  <- push      (agregar)
//        shift   <-  [  A , B , C  ]  -> pop       (quitar)
//        (inicio)                        (final)

console.log("\n=== 2. push / pop / shift / unshift ===");

const pila = ["A", "B", "C"];

pila.push("D");                    // agrega al FINAL
console.log("push('D')    ->", pila);

const ultimo = pila.pop();         // quita del FINAL y lo devuelve
console.log("pop()        ->", pila, "| devolvió:", ultimo);

pila.unshift("Z");                 // agrega al INICIO
console.log("unshift('Z') ->", pila);

const primero = pila.shift();      // quita del INICIO y lo devuelve
console.log("shift()      ->", pila, "| devolvió:", primero);

// push devuelve la nueva longitud:
console.log("push devuelve:", pila.push("E"));


// --------------------------------------------------------------------------
// 3. splice y slice (se confunden mucho)
// --------------------------------------------------------------------------
// splice(inicio, cuántosBorrar, ...quéInsertar)  -> MUTA el original
// slice(inicio, fin)                             -> NO muta: devuelve copia

console.log("\n=== 3. splice vs slice ===");

const meses = ["ene", "feb", "mar", "abr", "may", "jun"];

// slice: copiar un trozo (el 'fin' NO se incluye)
console.log("slice(1, 3) ->", meses.slice(1, 3));   // ['feb','mar']
console.log("Original intacto:", meses);

// splice: borrar
const copia1 = [...meses];
const borrados = copia1.splice(1, 2);               // desde el índice 1, borra 2
console.log("splice(1,2) ->", copia1, "| borró:", borrados);

// splice: insertar sin borrar (segundo argumento en 0)
const copia2 = [...meses];
copia2.splice(2, 0, "MARZO-BIS");
console.log("Insertar    ->", copia2);

// splice: reemplazar
const copia3 = [...meses];
copia3.splice(0, 1, "ENERO");
console.log("Reemplazar  ->", copia3);


// --------------------------------------------------------------------------
// 4. BUSCAR DENTRO DE UN ARREGLO
// --------------------------------------------------------------------------
console.log("\n=== 4. Búsqueda ===");

const colores = ["rojo", "verde", "azul", "verde"];

console.log("indexOf('azul')     ->", colores.indexOf("azul"));       // 2
console.log("indexOf('negro')    ->", colores.indexOf("negro"));      // -1
console.log("lastIndexOf('verde')->", colores.lastIndexOf("verde"));  // 3
console.log("includes('rojo')    ->", colores.includes("rojo"));      // true

// En arreglos de objetos se usa find / findIndex:
const empleados = [
  { id: 1, nombre: "Ana", salario: 2500000 },
  { id: 2, nombre: "Luis", salario: 3200000 },
  { id: 3, nombre: "Sofía", salario: 4100000 },
];

console.log("find      ->", empleados.find((e) => e.id === 2));
console.log("findIndex ->", empleados.findIndex((e) => e.nombre === "Sofía"));
console.log("some (¿alguno gana más de 4M?) ->", empleados.some((e) => e.salario > 4000000));
console.log("every (¿todos ganan más de 2M?)->", empleados.every((e) => e.salario > 2000000));


// --------------------------------------------------------------------------
// 5. RECORRER UN ARREGLO
// --------------------------------------------------------------------------
console.log("\n=== 5. Formas de recorrer ===");

const notas = [4.5, 3.2, 5.0, 2.8];

// (a) for clásico: se usa cuando necesitamos el índice o saltar elementos
console.log("for clásico:");
for (let i = 0; i < notas.length; i++) {
  console.log(`  Nota ${i + 1}: ${notas[i]}`);
}

// (b) for...of: la forma más legible cuando solo importan los valores
console.log("for...of:");
for (const nota of notas) {
  console.log("  ", nota);
}

// (c) forEach: recibe una función y la ejecuta por cada elemento
console.log("forEach:");
notas.forEach(function (nota, indice) {
  console.log(`  [${indice}] ${nota}`);
});

// forEach con arrow function (lo habitual):
notas.forEach((nota, i) => console.log(`  arrow [${i}] ${nota}`));

// IMPORTANTE: forEach NO devuelve nada (undefined) y no se puede cortar
// con break. Si necesitas salir antes, usa for o for...of.


// --------------------------------------------------------------------------
// 6. map: TRANSFORMAR un arreglo (devuelve uno nuevo del mismo tamaño)
// --------------------------------------------------------------------------
console.log("\n=== 6. map ===");

const precios = [10000, 25000, 8000];

const conIva = precios.map((precio) => precio * 1.19);
console.log("Original:", precios);
console.log("Con IVA :", conIva);

const nombres = ["ana", "luis", "sofía"];
console.log("Mayúsculas:", nombres.map((n) => n.toUpperCase()));

// map sobre arreglos de objetos:
console.log("Solo nombres:", empleados.map((e) => e.nombre));
console.log("Objetos nuevos:", empleados.map((e) => ({ nombre: e.nombre, aumento: e.salario * 1.1 })));


// --------------------------------------------------------------------------
// 7. filter: FILTRAR (devuelve un arreglo con los que cumplen la condición)
// --------------------------------------------------------------------------
console.log("\n=== 7. filter ===");

const edades = [12, 25, 17, 40, 8, 33];

console.log("Mayores de edad:", edades.filter((e) => e >= 18));
console.log("Aprobados:", notas.filter((n) => n >= 3.0));
console.log("Empleados de más de 3M:", empleados.filter((e) => e.salario > 3000000));

// Diferencia clave:
//   map    -> mismo número de elementos, transformados
//   filter -> menos (o igual) elementos, sin transformar
//   find   -> UN solo elemento (el primero que cumple)


// --------------------------------------------------------------------------
// 8. OTROS MÉTODOS ÚTILES
// --------------------------------------------------------------------------
console.log("\n=== 8. Otros métodos ===");

console.log("join(' - ')  ->", frutas.join(" - "));         // arreglo -> string
console.log("split        ->", "a,b,c".split(","));          // string -> arreglo
console.log("concat       ->", [1, 2].concat([3, 4]));
console.log("spread       ->", [...[1, 2], ...[3, 4]]);      // forma moderna
console.log("reverse      ->", [1, 2, 3].reverse());
console.log("sort texto   ->", ["pera", "uva", "kiwi"].sort());

// CUIDADO con sort en números: por defecto ordena como TEXTO
console.log("sort números (mal) ->", [10, 9, 100, 1].sort());
console.log("sort números (bien)->", [10, 9, 100, 1].sort((a, b) => a - b));
console.log("sort descendente   ->", [10, 9, 100, 1].sort((a, b) => b - a));

// reduce: reducir todo el arreglo a UN solo valor (sumas, totales)
const total = precios.reduce((acumulado, actual) => acumulado + actual, 0);
console.log("reduce (suma):", total);

// Encadenamiento: la forma profesional de trabajar con datos
const nominaAlta = empleados
  .filter((e) => e.salario > 3000000)
  .map((e) => `${e.nombre}: $${e.salario.toLocaleString("es-CO")}`)
  .join(" | ");
console.log("Encadenado:", nominaAlta);


// --------------------------------------------------------------------------
// 9. ARREGLOS DE OBJETOS: el caso real más común
// --------------------------------------------------------------------------
console.log("\n=== 9. Caso práctico ===");

const inventario = [
  { producto: "Laptop", precio: 3500000, stock: 4 },
  { producto: "Mouse", precio: 90000, stock: 0 },
  { producto: "Monitor", precio: 850000, stock: 12 },
  { producto: "Teclado", precio: 180000, stock: 0 },
];

const disponibles = inventario.filter((i) => i.stock > 0);
console.log("Disponibles:", disponibles.map((i) => i.producto));

const valorInventario = inventario.reduce((suma, i) => suma + i.precio * i.stock, 0);
console.log("Valor total del inventario: $" + valorInventario.toLocaleString("es-CO"));

console.table(inventario);

console.log("\n=== Fin del tema 7 ===");
