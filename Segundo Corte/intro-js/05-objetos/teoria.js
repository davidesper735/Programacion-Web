/* ==========================================================================
   TEMA 5 · OBJETOS EN JAVASCRIPT
   --------------------------------------------------------------------------
   Objetivos:
     - Crear objetos con notación literal.
     - Acceder a propiedades por punto y por corchetes.
     - Trabajar con objetos anidados.
     - Entender qué es "this" dentro de un método.

   Cómo ejecutar:  node teoria.js
   ========================================================================== */


// --------------------------------------------------------------------------
// 1. ¿QUÉ ES UN OBJETO?
// --------------------------------------------------------------------------
// Un objeto agrupa datos relacionados en una sola estructura, en forma de
// pares CLAVE: VALOR.
//
// Sin objeto (datos sueltos, difícil de manejar):
//      let nombreEstudiante = "Ana";
//      let edadEstudiante = 20;
//      let carreraEstudiante = "Sistemas";
//
// Con objeto (todo junto y con sentido):

console.log("=== 1. Notación literal ===");

const estudiante = {
  nombre: "Ana Pérez",      // propiedad: clave "nombre", valor "Ana Pérez"
  edad: 20,
  carrera: "Ingeniería de Sistemas",
  activo: true,
  promedio: 4.3,
};

console.log(estudiante);

// Vocabulario:
//   { }          -> notación literal de objeto
//   nombre: ...  -> PROPIEDAD (clave + valor)
//   si el valor es una función, la propiedad se llama MÉTODO


// --------------------------------------------------------------------------
// 2. ACCESO POR PUNTO Y POR CORCHETES
// --------------------------------------------------------------------------
console.log("\n=== 2. Acceso a propiedades ===");

// (a) Notación de PUNTO: la más usada. Requiere saber el nombre al escribir.
console.log("Por punto:", estudiante.nombre);

// (b) Notación de CORCHETES: la clave va como STRING.
console.log("Por corchetes:", estudiante["carrera"]);

// ¿Cuándo son obligatorios los corchetes?
//   1. Cuando la clave tiene espacios o caracteres raros.
//   2. Cuando la clave está guardada en una variable (clave dinámica).

const producto = {
  "nombre del producto": "Mouse gamer",   // clave con espacios
  precio: 90000,
};
console.log("Clave con espacios:", producto["nombre del producto"]);
// console.log(producto.nombre del producto);   // SyntaxError

const clave = "precio";                    // clave dinámica
console.log("Clave dinámica:", producto[clave]);   // 90000
console.log("Con punto sería:", producto.clave);   // undefined: busca "clave"

// Propiedad inexistente -> undefined (NO error):
console.log("Propiedad que no existe:", estudiante.telefono);


// --------------------------------------------------------------------------
// 3. AGREGAR, MODIFICAR Y ELIMINAR PROPIEDADES
// --------------------------------------------------------------------------
console.log("\n=== 3. Modificar el objeto ===");

estudiante.semestre = 5;              // agregar
estudiante["telefono"] = "3001234567"; // agregar por corchetes
estudiante.edad = 21;                  // modificar
delete estudiante.activo;              // eliminar

console.log(estudiante);

// Comprobar si una propiedad existe:
console.log('"promedio" in estudiante ->', "promedio" in estudiante);
console.log('"activo" in estudiante   ->', "activo" in estudiante);


// --------------------------------------------------------------------------
// 4. OBJETOS ANIDADOS
// --------------------------------------------------------------------------
// El valor de una propiedad puede ser otro objeto o un arreglo.

console.log("\n=== 4. Objetos anidados ===");

const universidad = {
  nombre: "Universidad Central",
  direccion: {
    calle: "Carrera 5 #21-38",
    ciudad: "Bogotá",
    pais: "Colombia",
  },
  programas: ["Sistemas", "Industrial", "Civil"],
  decano: {
    nombre: "Dr. Gómez",
    contacto: {
      correo: "decano@ucentral.edu.co",
      extension: 1050,
    },
  },
};

console.log("Ciudad:", universidad.direccion.ciudad);
console.log("Primer programa:", universidad.programas[0]);
console.log("Correo del decano:", universidad.decano.contacto.correo);

// PELIGRO: si un nivel intermedio no existe, se lanza un error.
// console.log(universidad.rector.nombre);
//   -> TypeError: Cannot read properties of undefined (reading 'nombre')

// Solución moderna: encadenamiento opcional  ?.
console.log("Con ?. no truena:", universidad.rector?.nombre);   // undefined


// --------------------------------------------------------------------------
// 5. MÉTODOS: funciones dentro de un objeto
// --------------------------------------------------------------------------
console.log("\n=== 5. Métodos ===");

const cuenta = {
  titular: "Carlos Ruiz",
  saldo: 500000,

  // Forma corta de ES6 para declarar un método:
  consultar() {
    return `Saldo de ${this.titular}: $${this.saldo}`;
  },

  depositar(monto) {
    this.saldo = this.saldo + monto;
    return this.saldo;
  },

  retirar(monto) {
    if (monto > this.saldo) {
      return "Fondos insuficientes";
    }
    this.saldo -= monto;
    return this.saldo;
  },
};

console.log(cuenta.consultar());
console.log("Después de depositar 100000:", cuenta.depositar(100000));
console.log("Después de retirar 50000:", cuenta.retirar(50000));
console.log("Retiro imposible:", cuenta.retirar(9999999));


// --------------------------------------------------------------------------
// 6. this (nivel básico)
// --------------------------------------------------------------------------
// Dentro de un método, "this" es EL OBJETO QUE ESTÁ A LA IZQUIERDA DEL PUNTO
// cuando se llama al método.
//
//      cuenta.consultar()
//      ^^^^^^ este es el "this" de adentro

console.log("\n=== 6. this ===");

const persona = {
  nombre: "Ana",
  saludarBien() {
    return `Hola, soy ${this.nombre}`;     // this -> persona
  },
  saludarMal: () => {
    // Las ARROW FUNCTIONS no tienen su propio "this": toman el de afuera.
    // Por eso NO se usan como métodos cuando se necesita this.
    return `Hola, soy ${this?.nombre}`;    // undefined
  },
};

console.log("Método normal :", persona.saludarBien());
console.log("Arrow function:", persona.saludarMal(), "<-- this se pierde");

// Regla práctica:
//   método de un objeto  -> function() { } o la forma corta nombre() { }
//   callback corto       -> arrow function


// --------------------------------------------------------------------------
// 7. RECORRER UN OBJETO
// --------------------------------------------------------------------------
console.log("\n=== 7. Recorrer un objeto ===");

const libro = { titulo: "Cien años de soledad", autor: "García Márquez", anio: 1967 };

// for...in recorre las CLAVES:
for (const propiedad in libro) {
  console.log(`  ${propiedad}: ${libro[propiedad]}`);
  //                            ^ aquí los corchetes son obligatorios:
  //                              la clave está en una variable
}

// Métodos auxiliares del objeto Object:
console.log("Object.keys   ->", Object.keys(libro));
console.log("Object.values ->", Object.values(libro));
console.log("Object.entries->", Object.entries(libro));


// --------------------------------------------------------------------------
// 8. LOS OBJETOS SE COPIAN POR REFERENCIA
// --------------------------------------------------------------------------
// Un primitivo se copia por VALOR; un objeto guarda una REFERENCIA (dirección
// de memoria). Es una fuente clásica de errores.

console.log("\n=== 8. Valor vs referencia ===");

let a = 10;
let b = a;          // copia del valor
b = 20;
console.log("Primitivos -> a:", a, "| b:", b);     // a sigue en 10

const obj1 = { valor: 10 };
const obj2 = obj1;  // NO es una copia: ambas apuntan al mismo objeto
obj2.valor = 20;
console.log("Objetos    -> obj1.valor:", obj1.valor, "| obj2.valor:", obj2.valor); // 20 y 20

// Para copiar de verdad (copia superficial):
const obj3 = { ...obj1 };      // operador spread
obj3.valor = 99;
console.log("Con spread -> obj1.valor:", obj1.valor, "| obj3.valor:", obj3.valor);

console.log("\n=== Fin del tema 5 ===");
