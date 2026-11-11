import express from "express";

const app = express();
app.set("json spaces", 2);
app.use(express.json());

let productos = [
    { id: 1, nombre: "Teclado", precio: 80000, stock: 10 },
    { id: 2, nombre: "Mouse", precio: 35000, stock: 25 }
];
let siguienteId = 3;

// GET /productos (con filtro del reto: ?max=50000)
app.get("/productos", (req, res) => {
    const { max } = req.query;
    if (max === undefined) {
        return res.status(200).json(productos);
    }
    if (isNaN(Number(max))) {
        return res.status(400).json({ error: "max debe ser un número" });
    }
    const filtrados = productos.filter((p) => p.precio <= Number(max));
    res.status(200).json(filtrados);
});

// GET /productos/:id
app.get("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) {
        return res.status(404).json({ error: "No existe" });
    }
    res.status(200).json(productos[i]);
});

// POST /productos
app.post("/productos", (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || typeof precio !== "number" || precio < 0) {
        return res.status(400).json({ error: "Faltan datos o no son válidos" });
    }
    const nuevo = { id: siguienteId++, nombre, precio, stock: 0 };
    productos.push(nuevo);
    res.status(201).json(nuevo);
});

// PUT /productos/:id (exige todos los campos)
app.put("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) {
        return res.status(404).json({ error: "No existe" });
    }
    const { nombre, precio, stock } = req.body;
    if (!nombre || typeof precio !== "number" || precio < 0 || typeof stock !== "number" || stock < 0) {
        return res.status(400).json({ error: "Faltan datos o no son válidos" });
    }
    productos[i] = { id, nombre, precio, stock };
    res.status(200).json(productos[i]);
});

// PATCH /productos/:id (solo algunos campos)
app.patch("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) {
        return res.status(404).json({ error: "No existe" });
    }
    const { nombre, precio, stock } = req.body;
    if (nombre === undefined && precio === undefined && stock === undefined) {
        return res.status(400).json({ error: "No enviaste ningún campo" });
    }
    if (nombre !== undefined && !nombre) {
        return res.status(400).json({ error: "Nombre no válido" });
    }
    if (precio !== undefined && (typeof precio !== "number" || precio < 0)) {
        return res.status(400).json({ error: "Precio no válido" });
    }
    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
        return res.status(400).json({ error: "Stock no válido" });
    }
    if (nombre !== undefined) productos[i].nombre = nombre;
    if (precio !== undefined) productos[i].precio = precio;
    if (stock !== undefined) productos[i].stock = stock;
    res.status(200).json(productos[i]);
});

// DELETE /productos/:id
app.delete("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) {
        return res.status(404).json({ error: "No existe" });
    }
    productos.splice(i, 1);
    res.status(204).end();
});

app.listen(3000, () => console.log("Servidor listo"));